import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Category, ChecklistItem } from './models/checklist';
import { ApplicationState } from './state';
import { ToggleCategory, ToggleFavorite } from './state/checklist.actions';
import { ChecklistQueries } from './state/checklist.reducer';

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

  small$: Observable<boolean>;
  mediumUp$: Observable<boolean>;
  desktop$: Observable<boolean>;

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

    const { small$, medium$, desktop$ } = this.setupBreakpointObserver();

    this.small$ = small$;
    this.desktop$ = desktop$;
    this.mediumUp$ = combineLatest(medium$, desktop$).pipe(map(([medium, desktop]) => medium || desktop));

    desktop$.subscribe(matches => {
      if (!matches) {
        this.sideNav.close();
        this.setSidenavMode('over');
      } else {
        this.sideNav.open();
        this.setSidenavMode('side');
      }
    });
  }

  toggleCategory(category: Category) {
    this.store
      .pipe(
        select(ChecklistQueries.getFavoriteEntities),
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

  private setupBreakpointObserver() {
    const small$ = this.breakPointObserver.observe(['(max-width: 576px)']).pipe(
      pluck<BreakpointState, boolean>('matches'),
      shareReplay(1)
    );

    const medium$ = this.breakPointObserver.observe(['(min-width: 576px) and (max-width: 992px)']).pipe(
      pluck<BreakpointState, boolean>('matches'),
      shareReplay(1)
    );

    const desktop$ = this.breakPointObserver.observe(['(min-width: 992px)']).pipe(
      pluck<BreakpointState, boolean>('matches'),
      shareReplay(1)
    );

    return {
      small$,
      medium$,
      desktop$
    };
  }
}
