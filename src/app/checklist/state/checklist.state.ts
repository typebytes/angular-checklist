import { CategoryEntities, Filter, ItemEntities } from '../models/checklist.model';

export interface ChecklistState {
  categories: CategoryEntities;
  items: ItemEntities;
  filter: Filter;
  editMode: boolean;
}
