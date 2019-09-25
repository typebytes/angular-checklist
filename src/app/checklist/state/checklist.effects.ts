import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { withLatestFrom, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetCheckList, ChecklistActionTypes, GetCheckListSuccess } from './checklist.actions';
import { CheckListService } from 'src/app/services/checklist.service';
import { ApplicationState } from 'src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { ProjectsSelectors } from 'src/app/projects/state/projects.selectors';
import { CheckList } from '../models/checklist.model';

@Injectable()
export class CheckListEffects {
  @Effect()
  $getCheckList = this._action$.pipe(
    ofType<GetCheckList>(ChecklistActionTypes.GET_CHECK_LIST),
    withLatestFrom(this.store.pipe(select(ProjectsSelectors.getSelectedProjectId))),
    switchMap(([type, selectedProjectId]) => {
      return this._checkListService.getCheckList(selectedProjectId);
    }),
    switchMap((data: any) => {
      const checklist = JSON.parse(data.Output.Body) as CheckList;
      return of(new GetCheckListSuccess(checklist));
    })
  );
  constructor(private _action$: Actions, private store: Store<ApplicationState>, private _checkListService: CheckListService) {

  }
}
