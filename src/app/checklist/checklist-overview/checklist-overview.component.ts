import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { extractRouteParams, getActivatedChild } from '../../shared/router.utils';
import { ApplicationState } from '../../state/app.state';
import { BreadcrumbItem } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'ac-checklist-overview',
  templateUrl: './checklist-overview.component.html',
  styleUrls: ['./checklist-overview.component.scss'],
  imports: [NgIf, NgFor, MatIcon, RouterOutlet],
  animations: [
    trigger('breadcrumb', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0, position: 'fixed' }), {
          optional: true
        }),
        query(
          ':leave',
          stagger(0, [
            animate(
              '0ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ transform: 'translateX(-10px)', opacity: 0, position: 'fixed' })
            )
          ]),
          { optional: true }
        ),
        query(
          ':enter',
          stagger(100, [
            style({
              position: '*',
              transform: 'translateX(-10px)',
              opacity: 0
            }),
            animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class ChecklistOverviewComponent {
  private store = inject<Store<ApplicationState>>(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  breadcrumbs = this.store.selectSignal(ChecklistSelectors.getBreadcrumb);

  constructor() {
    const params = toSignal(this.route.params);
    const categories = this.store.selectSignal(ChecklistSelectors.getActiveCategories);
    const entities = this.store.selectSignal(ChecklistSelectors.getActiveCategoryEntities);
    const editMode = this.store.selectSignal(ChecklistSelectors.getEditMode);

    effect(() => {
      const _ = params();
      untracked(() => {
        if (categories().length) {
          const { category } = extractRouteParams(this.route.snapshot, 1);
          const categoryDisabled = !category || !entities()[category];

          if (categoryDisabled && !editMode()) {
            this.router.navigate([categories()[0].slug], {
              relativeTo: this.route
            });
          }
        }
      });
    });
  }

  goBack(last: boolean) {
    if (!last) {
      const currentActivatedChild = getActivatedChild(this.route);
      this.router.navigate(['../'], { relativeTo: currentActivatedChild });
    }
  }

  trackByTitle(_, item: BreadcrumbItem) {
    return item.title;
  }
}
