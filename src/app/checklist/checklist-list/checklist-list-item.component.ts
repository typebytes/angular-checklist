import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChecklistItem, CheckList } from '../models/checklist.model';
import { ApplicationState } from 'src/app/state/app.state';
import { CheckListService } from 'src/app/services/checklist.service';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { switchMap, mergeMap, combineLatest, map, withLatestFrom } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { of, forkJoin } from 'rxjs';
import { ProjectsSelectors } from 'src/app/projects/state/projects.selectors';
import { GetCheckListSuccess } from '../state/checklist.actions';

@Component({
  selector: 'ac-checklist-list-item',
  templateUrl: './checklist-list-item.component.html',
  styleUrls: ['./checklist-list-item.component.scss']
})
export class ChecklistListItemComponent {
  @Input() item: ChecklistItem;
  @Output() toggleItem = new EventEmitter<ChecklistItem>();
  @Output() toggleFavorite = new EventEmitter<ChecklistItem>();

  constructor(private store: Store<ApplicationState>,
    private _checkListService: CheckListService,
    private dialog: MatDialog) { }

  deleteCheckListItem() {
    this.deleteConfirmation().pipe(
      withLatestFrom(this.store.pipe(select(ProjectsSelectors.getSelectedProjectId))),
      switchMap(([result, projectId]) => {
        return of({ result, projectId });
      })
    ).subscribe(({ result, projectId }) => {
      if (!result) {
        return;
      }
      this._checkListService.deleteCheckListItem(projectId, this.item).then((latestChecklist: CheckList) => {
        this.store.dispatch(new GetCheckListSuccess(latestChecklist));
      });
    });
  }

  private deleteConfirmation() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Check List Item',
        text: `Wooops! Would you like to remove this item from the list. `,
        buttonText: 'Delete'
      }
    });

    return dialogRef.afterClosed().pipe(switchMap(result => this.processDialogResult(result)));
  }

  private processDialogResult(result: boolean) {
    return of(result);
  }
}
