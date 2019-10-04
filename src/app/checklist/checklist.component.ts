import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, zip } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Project } from '../projects/models/projects.model';
import { ToggleAllFavorites, ToggleCategory } from '../projects/state/projects.actions';
import { ProjectsSelectors } from '../projects/state/projects.selectors';
import { BreakpointService } from '../shared/breakpoint.service';
import { selectOnce } from '../shared/operators';
import { hasEntities } from '../shared/utils';
import { ApplicationState } from '../state/app.state';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Category, ChecklistItem, CategoryEntity, CheckList } from './models/checklist.model';
import { ToggleEditMode, GetCheckList, CleanCheckList, GetCheckListSuccess } from './state/checklist.actions';
import { ChecklistSelectors } from './state/checklist.selectors';
import { CheckListService } from '../services/checklist.service';

enum CategoryListMode {
  List,
  Edit
}

@Component({
  selector: 'ac-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, AfterViewInit, OnDestroy {
  private editMode$ = new BehaviorSubject(CategoryListMode.List);

  small$: Observable<boolean>;
  mediumUp$: Observable<boolean>;
  desktop$: Observable<boolean>;

  categories$: Observable<Array<Category>>;
  projects$: Observable<Array<Project>>;
  selectedProjectId$: Observable<string>;
  favoritesCount$: Observable<number>;
  favoritesScore$: Observable<number>;
  overallScore$: Observable<number>;

  editMode = false;

  sideNavMode = 'side';

  @ViewChild(MatSidenav, { static: false }) sideNav: MatSidenav;

  constructor(
    private store: Store<ApplicationState>,
    private breakpointService: BreakpointService,
    private dialog: MatDialog,
    private router: Router,
    private _checkListService: CheckListService
  ) { }

  ngOnInit() {
    this.categories$ = this.editMode$.pipe(switchMap(mode => this.getCategories(mode)));
    this.projects$ = this.store.pipe(select(ProjectsSelectors.getProjects));
    this.selectedProjectId$ = this.store.pipe(select(ProjectsSelectors.getSelectedProjectId));
    this.favoritesCount$ = this.store.pipe(select(ChecklistSelectors.getFavoritesCount));
    this.favoritesScore$ = this.store.pipe(select(ChecklistSelectors.getFavoritesScore));
    this.store.dispatch(new GetCheckList());

    const { small$, medium$, desktop$ } = this.breakpointService.getAllBreakpoints();

    this.small$ = small$;
    this.desktop$ = desktop$;
    this.mediumUp$ = combineLatest(medium$, desktop$).pipe(map(([medium, desktop]) => medium || desktop));
  }

  ngAfterViewInit(): void {
    this.desktop$.subscribe(matches => {
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
        selectOnce(ChecklistSelectors.getFavoriteEntitiesByCategory(category.slug)),
        switchMap((favorites: Array<ChecklistItem>) => {
          if (hasEntities(favorites) && category.enabled) {
            return this.openUserPrompt(favorites);
          }

          return of(true);
        }),
        filter(remove => remove)
      )
      .subscribe(() => this.store.dispatch(new ToggleCategory(category.slug)));
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.store.dispatch(new ToggleEditMode());
    this.editMode$.next(this.editMode ? CategoryListMode.Edit : CategoryListMode.List);

    of(this.editMode)
      .pipe(
        filter(editMode => !editMode),
        switchMap(_ => this.store.pipe(selectOnce(ChecklistSelectors.getSelectedCategory))),
        filter(category => !!category),
        filter(category => !category.enabled),
        switchMap(_ =>
          zip(
            this.store.pipe(selectOnce(ChecklistSelectors.getActiveCategories)),
            this.store.pipe(selectOnce(ProjectsSelectors.getSelectedProjectId))
          )
        )
      )
      .subscribe(([categories, projectId]) => {
        this.router.navigate(['/', projectId, 'checklist', categories[0].slug]);
      });
  }

  navigateToProject(project: string) {
    this.router.navigate([`/${project}/checklist`]);
  }

  trackBySlug(_, category: Category) {
    return category.slug;
  }

  trackById(_, item: ChecklistItem) {
    return item.id;
  }

  private openUserPrompt(favorites: Array<ChecklistItem>) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Disable Category',
        text: `Wooops! The category you are trying to disable has favorites. Disabling it will remove the favorites from this category.`,
        buttonText: 'Disable Anyways'
      }
    });

    return dialogRef.afterClosed().pipe(switchMap(result => this.processDialogResult(result, favorites)));
  }

  private processDialogResult(result: boolean, favorites: Array<ChecklistItem>) {
    if (result) {
      this.store.dispatch(new ToggleAllFavorites(favorites));
    }

    return of(result);
  }

  private getCategories(mode: CategoryListMode) {
    let categories$ = this.store.pipe(select(ChecklistSelectors.getActiveCategories));

    if (mode === CategoryListMode.Edit) {
      categories$ = this.store.pipe(select(ChecklistSelectors.getAllCategories));
    }

    return categories$;
  }

  private setSidenavMode(mode: 'side' | 'over') {
    this.sideNavMode = mode;
  }

  deleteCategory(category: Category):void {
    this.deleteCategoryConfirmation().pipe(
      withLatestFrom(this.store.pipe(select(ProjectsSelectors.getSelectedProjectId))),
      switchMap(([result, projectId]) => {
        return of({ result, projectId });
      })
    ).subscribe(({ result, projectId }) => {
      if (!result) {
        return;
      }
      this._checkListService.deleteCategory(projectId, category).then((latestChecklist: CheckList) => {
        this.store.dispatch(new GetCheckListSuccess(latestChecklist));
      });
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CleanCheckList());
  }

  private deleteCategoryConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Category',
        text: `Wooops! Would you like to remove this Category. All Items in this removed too `,
        buttonText: 'Delete'
      }
    });

    return dialogRef.afterClosed().pipe(switchMap(result => this.processDeleteCatDialogResult(result)));
  }

  private processDeleteCatDialogResult(result: boolean) {
    return of(result);
  }
}
