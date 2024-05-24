import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import * as fuzzysort from 'fuzzysort';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { CategoryEntity, ChecklistItem } from '../models/checklist.model';
import { IndexEntry, SearchResult } from '../search/search.models';
import { SearchService } from '../search/search.service';
import { MatOption } from '@angular/material/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ac-checklist-search',
  templateUrl: './checklist-search.component.html',
  styleUrls: ['./checklist-search.component.scss'],
  imports: [ReactiveFormsModule, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatOption, NgIf, AsyncPipe]
})
export class ChecklistSearchComponent implements OnInit {
  results$: Observable<any>;
  searchField = new FormControl<string>('');

  focus$ = new BehaviorSubject<string>('INIT');

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    const search$ = this.searchField.valueChanges.pipe(debounceTime(150));

    this.results$ = combineLatest([this.focus$, search$]).pipe(
      map(([, term]) => term),
      switchMap(term => this.searchService.search(term)),
      map(results => results.map(this.mapToSearchResult))
    );
  }

  getOptionText(value: SearchResult) {
    if (!value) {
      return '';
    }

    return value.document.title;
  }

  optionSelected({ option }: MatAutocompleteSelectedEvent) {
    this.searchField.setValue('');
    this.router.navigate([option.value.link]);
  }

  private mapToSearchResult(result: Fuzzysort.KeyResult<IndexEntry<CategoryEntity | ChecklistItem>>) {
    return {
      text: fuzzysort.highlight(result, '<b>', '</b>'),
      document: result.obj.value,
      link: result.obj.link
    } as SearchResult;
  }
}
