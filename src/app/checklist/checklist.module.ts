import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CHECKLIST_ROUTES } from './checklist.routes';
import { SearchService } from './search/search.service';
import { checklistReducer } from './state/checklist.reducer';

@NgModule({
  imports: [RouterModule.forChild(CHECKLIST_ROUTES), StoreModule.forFeature('checklist', checklistReducer)],
  providers: [SearchService]
})
export class ChecklistModule {}
