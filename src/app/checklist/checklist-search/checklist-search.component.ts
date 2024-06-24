import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import * as fuzzysort from 'fuzzysort';
import { debounceTime } from 'rxjs/operators';
import { CategoryEntity, ChecklistItem } from '../models/checklist.model';
import { IndexEntry, SearchResult } from '../search/search.models';
import { SearchService } from '../search/search.service';
import { MatOption } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'ac-checklist-search',
  templateUrl: './checklist-search.component.html',
  styleUrls: ['./checklist-search.component.scss'],
  imports: [ReactiveFormsModule, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatOption, NgIf]
})
export class ChecklistSearchComponent {
  private searchService = inject(SearchService);
  private router = inject(Router);
  searchField = new FormControl<string>('');
  search = toSignal(this.searchField.valueChanges.pipe(debounceTime(150)));

  results = computed<any>(() => {
    const search = this.search();
    const results = this.searchService.search(search);
    return results.map(this.mapToSearchResult);
  });

  getOptionText(value: SearchResult) {
    return value?.document?.title || '';
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
