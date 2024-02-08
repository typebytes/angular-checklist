import { EntityState } from '../../shared/models';

export interface Author {
  name: string;
  link: string;
}

export interface ChecklistItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  checked: boolean;
  favorite: boolean;
  category: string;
  author: Author;
  rework: boolean;
}

export type BreadcrumbItem = CategoryEntity | ChecklistItem;

interface BaseCategory {
  title: string;
  summary: string;
  slug: string;
  source: string;
  author: Author;
  score: number;
  enabled: boolean;
}

export interface Category extends BaseCategory {
  items: Array<ChecklistItem>;
}

export type ChecklistFilter = 'ALL' | 'DONE' | 'TODO';

export interface Filter {
  categories: ChecklistFilter;
  favorites: ChecklistFilter;
}

export interface Favorite {
  category: Category;
  items: Array<ChecklistItem>;
}

export interface CategoryEntity extends BaseCategory {
  items: Array<string>;
}

export type CategoryEntities = EntityState<CategoryEntity>;
export type ItemEntities = EntityState<ChecklistItem>;
export type FavoriteEntity = EntityState<Array<string>>;
