import { Component, Signal, computed, inject, signal } from '@angular/core';
import { MatSidenav, MatDrawerMode, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToggleAllFavorites, ToggleCategory } from '../projects/state/projects.actions';
import { ProjectsSelectors } from '../projects/state/projects.selectors';
import { BreakpointService } from '../shared/breakpoint.service';
import { hasEntities } from '../shared/utils';
import { ApplicationState } from '../state/app.state';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Category, ChecklistItem } from './models/checklist.model';
import { ToggleEditMode } from './state/checklist.actions';
import { ChecklistSelectors } from './state/checklist.selectors';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatBadge } from '@angular/material/badge';
import { ScoreChartComponent } from '../shared/score-chart/score-chart.component';
import { ChecklistSearchComponent } from './checklist-search/checklist-search.component';
import { NgIf, NgFor } from '@angular/common';
import {
  DropdownStaticOptionsComponent,
  DropdownStaticOptionComponent
} from '../shared/dropdown/dropdown-static-options.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { ToolbarLogoComponent } from '../shared/toolbar/toolbar-logo/toolbar-logo.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { SearchService } from './search/search.service';

enum CategoryListMode {
  List,
  Edit
}

@Component({
  standalone: true,
  selector: 'ac-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  imports: [
    ToolbarComponent,
    MatIconButton,
    MatIcon,
    ToolbarLogoComponent,
    DropdownComponent,
    DropdownStaticOptionsComponent,
    DropdownStaticOptionComponent,
    RouterLink,
    NgIf,
    ChecklistSearchComponent,
    MatSidenavContainer,
    MatSidenav,
    ScoreChartComponent,
    RouterLinkActive,
    MatBadge,
    MatSlideToggle,
    NgFor,
    MatCheckbox,
    MatSidenavContent,
    RouterOutlet,
    FooterComponent
  ],
  providers: [SearchService]
})
export class ChecklistComponent {
  private store = inject<Store<ApplicationState>>(Store);
  private breakpointService = inject(BreakpointService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  small = this.breakpointService.small;
  medium = this.breakpointService.medium;
  desktop = this.breakpointService.desktop;
  mediumUp = computed(() => this.medium() || this.desktop());

  projects = this.store.selectSignal(ProjectsSelectors.getProjects);
  selectedProjectId = this.store.selectSignal(ProjectsSelectors.getSelectedProjectId);
  favoritesCount = this.store.selectSignal(ChecklistSelectors.getFavoritesCount);
  favoritesScore = this.store.selectSignal(ChecklistSelectors.getFavoritesScore);
  private activeCategories = this.store.selectSignal(ChecklistSelectors.getActiveCategories);
  private allCategories = this.store.selectSignal(ChecklistSelectors.getAllCategories);

  categories = computed(() => {
    const mode = this.editMode() ? CategoryListMode.Edit : CategoryListMode.List;
    const categories = mode ? this.allCategories : this.activeCategories;
    return categories();
  });

  editMode = signal(false);

  sideNavMode = computed<MatDrawerMode>(() => (this.mediumUp() ? 'side' : 'over'));

  toggleCategory(category: Category): any {
    const selector = ChecklistSelectors.getFavoriteEntitiesByCategory(category.slug);
    const favorites = this.store.selectSignal(selector)() as ChecklistItem[];
    let observe = of(true);
    if (hasEntities(favorites) && category.enabled) {
      observe = this.openUserPrompt(favorites);
    }
    observe.subscribe(valid => valid && this.store.dispatch(new ToggleCategory(category.slug)));
  }

  toggleEditMode() {
    const editMode = !this.editMode();
    this.editMode.set(editMode);
    this.store.dispatch(new ToggleEditMode());
    if (!editMode) {
      const category = this.store.selectSignal(ChecklistSelectors.getSelectedCategory)();
      if (category && !category.enabled) {
        const categories = this.activeCategories();
        const projectId = this.selectedProjectId();
        this.router.navigate(['/', projectId, 'checklist', categories[0].slug]);
      }
    }
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

    return dialogRef.afterClosed().pipe(tap<boolean>(result => this.processDialogResult(result, favorites)));
  }

  private processDialogResult(result: boolean, favorites: Array<ChecklistItem>) {
    if (result) {
      this.store.dispatch(new ToggleAllFavorites(favorites));
    }
  }
}
