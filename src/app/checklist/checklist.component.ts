import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { asyncScheduler, BehaviorSubject, Observable, of } from 'rxjs';
import { filter, observeOn, switchMap, take, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Category, ChecklistItem } from './models/checklist';
import { ApplicationState } from './state';
import { ToggleCategory, ToggleFavorite } from './state/checklist.actions';
import { ChecklistQueries } from './state/checklist.reducer';
import { matches } from './utils/operators';

enum CategoryListMode {
  List,
  Edit
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  private editMode$ = new BehaviorSubject(CategoryListMode.List);

  categories$: Observable<Array<Category>>;
  favoritesCount$: Observable<number>;
  favoritesScore$: Observable<number>;
  overallScore$: Observable<number>;

  editMode = false;

  sideNavMode = 'side';

  @ViewChild(MatSidenav)
  sideNav: MatSidenav;

  constructor(
    private store: Store<ApplicationState>,
    private breakPointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories$ = this.editMode$.pipe(switchMap(mode => this.getCategories(mode)));
    this.favoritesCount$ = this.store.pipe(select(ChecklistQueries.getFavoritesCount));
    this.favoritesScore$ = this.store.pipe(select(ChecklistQueries.getFavoritesScore));
    this.overallScore$ = this.store.pipe(select(ChecklistQueries.getOverallScore));

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

  toggleCategory(category: Category) {
    this.store
      .pipe(
        select(ChecklistQueries.getFavoriteEntity),
        take(1),
        switchMap(entities => {
          const favoritesToBeRemoved = entities[category.slug];

          if (favoritesToBeRemoved && category.enabled) {
            return this.openUserPrompt(category, favoritesToBeRemoved);
          }

          return of(true);
        }),
        filter(remove => remove)
      )
      .subscribe(() => this.store.dispatch(new ToggleCategory(category)));
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editMode$.next(this.editMode ? CategoryListMode.Edit : CategoryListMode.List);

    of(this.editMode)
      .pipe(
        filter(editMode => !editMode),
        switchMap(_ => this.store.select(ChecklistQueries.getSelectedCategory).pipe(take(1))),
        filter(category => !!category),
        filter(category => !category.enabled),
        switchMap(_ => this.store.select(ChecklistQueries.getActiveCategories).pipe(take(1)))
      )
      .subscribe(categories => {
        this.router.navigate(['/checklist', categories[0].slug]);
      });
  }

  trackBySlug(index, category: Category) {
    return category.slug;
  }

  trackById(index, item: ChecklistItem) {
    return item.id;
  }

  private openUserPrompt(category: Category, favorites: Array<string>) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        category,
        title: 'Disable Category',
        text: `Wooops! The category you are trying to disable has favroites. Disabling it will remove the favorites from this category.`,
        buttonText: 'Disable Anyways'
      }
    });

    return dialogRef
      .afterClosed()
      .pipe(switchMap(result => this.processDialogResult(result, category.slug, favorites)));
  }

  private processDialogResult(result: boolean, categoryId: string, favorites: Array<string>) {
    if (result) {
      this.toggleAllFavorites(categoryId, favorites);
    }

    return of(result);
  }

  private toggleAllFavorites(category: string, favorites: Array<string>) {
    favorites.forEach(favoriteId => this.store.dispatch(new ToggleFavorite({ category, id: favoriteId })));
  }

  private toggleSidenavMode() {
    const states = {
      over: 'side',
      side: 'over'
    };

    this.sideNavMode = states[this.sideNavMode];
  }

  private getCategories(mode: CategoryListMode) {
    let categories$ = this.store.pipe(select(ChecklistQueries.getActiveCategories));

    if (mode === CategoryListMode.Edit) {
      categories$ = this.store.pipe(select(ChecklistQueries.getAllCategories));
    }

    return categories$;
  }

  private setSidenavMode(mode: 'side' | 'over') {
    this.sideNavMode = mode;
  }
}
