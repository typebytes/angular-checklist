import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable, asyncScheduler } from 'rxjs';
import { tap, observeOn } from 'rxjs/operators';
import { Category, ChecklistItem } from './models/checklist';
import { ApplicationState } from './state';
import { ChecklistQueries } from './state/checklist.reducer';
import { matches } from './utils/operators';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('void', style({ height: '0px', display: 'none' })),
      state('*', style({ height: '*', display: 'block' })),
      transition('* <=> *', animate('300ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ]
})
export class ChecklistComponent implements OnInit {
  categories$: Observable<Array<Category>>;
  favoritesCount$: Observable<number>;
  favoritesScore$: Observable<number>;

  sideNavMode = 'side';

  @ViewChild(MatSidenav) sideNav: MatSidenav;

  constructor(private store: Store<ApplicationState>, private breakPointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.categories$ = this.store.pipe(select(ChecklistQueries.getCategories));
    this.favoritesCount$ = this.store.pipe(select(ChecklistQueries.getFavoritesCount));
    this.favoritesScore$ = this.store.pipe(select(ChecklistQueries.getFavoritesScore));

    this.breakPointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        matches,
        tap(() => this.sideNav.close()),
        observeOn(asyncScheduler)
      )
      .subscribe(() => this.toggleSidenavMode());

    this.breakPointObserver
      .observe([Breakpoints.Medium, Breakpoints.Web])
      .pipe(matches)
      .subscribe(() => {
        this.setSidenavMode('side');
        this.sideNav.open();
      });
  }

  trackBySlug(index, category: Category) {
    return category.slug;
  }

  trackById(index, item: ChecklistItem) {
    return item.id;
  }

  private toggleSidenavMode() {
    const states = {
      over: 'side',
      side: 'over'
    };

    this.sideNavMode = states[this.sideNavMode];
  }

  private setSidenavMode(mode: 'side' | 'over') {
    this.sideNavMode = mode;
  }
}
