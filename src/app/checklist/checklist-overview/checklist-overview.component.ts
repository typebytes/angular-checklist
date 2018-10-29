import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ChecklistItem, Category } from '../models/checklist';
import { ApplicationState } from '../state';
import { ChecklistQueries } from '../state/checklist.reducer';
import { extractRouteParams, getActivatedChild } from '../utils/router';
import { trigger, transition, query, stagger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-checklist-overview',
  templateUrl: './checklist-overview.component.html',
  styleUrls: ['./checklist-overview.component.scss'],
  animations: [
    trigger('breadcrumb', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0, position: 'fixed' }), { optional: true }),
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
            style({ position: '*', transform: 'translateX(-10px)', opacity: 0 }),
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
    this.breadcrumb$ = this.store.pipe(select(ChecklistQueries.getBreadcrumb));

    zip(
      this.store.pipe(select(ChecklistQueries.getActiveCategoryEntities)),
      this.store.pipe(select(ChecklistQueries.getActiveCategories))
    )
      .pipe(
        filter(([, categories]) => !!categories.length),
        take(1),
        tap(([entities, categories]) => {
          const { category } = extractRouteParams(this.route.snapshot, 1);

          if (!category || !entities[category]) {
            this.router.navigate([categories[0].slug], { relativeTo: this.route });
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

  trackByTitle(index, item: Category | ChecklistItem) {
    return item.title;
  }
}
