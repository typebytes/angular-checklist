import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { selectOnce } from '../../shared/operators';
import { extractRouteParams, getActivatedChild } from '../../shared/router.utils';
import { ApplicationState } from '../../state/app.state';
import { Category, ChecklistItem } from '../models/checklist.model';
import { ChecklistSelectors } from '../state/checklist.selectors';

@Component({
  selector: 'ac-checklist-overview',
  templateUrl: './checklist-overview.component.html',
  styleUrls: ['./checklist-overview.component.scss'],
  animations: [
    trigger('breadcrumb', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0, position: 'fixed' }), {
          optional: true
        }),
        query(
          ':leave',
          stagger(-100, [
            animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ transform: 'translateX(-10px)', opacity: 0 }))
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
export class ChecklistOverviewComponent implements OnInit {
  breadcrumb$: Observable<any>;

  constructor(private store: Store<ApplicationState>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.breadcrumb$ = this.store.pipe(select(ChecklistSelectors.getBreadcrumb));

    this.route.params
      .pipe(
        switchMap(_ =>
          zip(
            this.store.pipe(selectOnce(ChecklistSelectors.getActiveCategoryEntities)),
            this.store.pipe(selectOnce(ChecklistSelectors.getActiveCategories)),
            this.store.pipe(selectOnce(ChecklistSelectors.getEditMode))
          )
        ),
        filter(([, categories]) => !!categories.length),
        tap(([entities, categories, editMode]) => {
          const { category } = extractRouteParams(this.route.snapshot, 1);
          const categoryDisabled = !category || !entities[category];

          if (categoryDisabled && !editMode) {
            this.router.navigate([categories[0].slug], {
              relativeTo: this.route
            });
          }
        })
      )
      .subscribe();
  }

  goBack(last: boolean) {
    if (!last) {
      const currentActivatedChild = getActivatedChild(this.route);
      this.router.navigate(['../'], { relativeTo: currentActivatedChild });
    }
  }

  trackByTitle(_, item: Category | ChecklistItem) {
    return item.title;
  }
}
