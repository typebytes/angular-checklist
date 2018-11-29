import { CategoryEntity, ChecklistItem } from "../models/checklist.model";

export interface IndexEntry<T> {
  value: T;
  link: string;
}

export interface SearchResult {
  text: string;
  document: CategoryEntity | ChecklistItem;
  link: string;
}
