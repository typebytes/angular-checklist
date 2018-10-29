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

export interface CategoryEntity extends BaseCategory {
  items: Array<string>;
}

export interface CategoryMap {
  [key: string]: CategoryEntity;
}

export interface ItemMap {
  [key: string]: ChecklistItem;
}

export interface Filter {
  categories: ChecklistFilter;
  favorites: ChecklistFilter;
}

export interface Checklist {
  categories: CategoryMap;
  items: ItemMap;
}

export interface FavoriteEntity {
  [category: string]: Array<string>;
}

export interface Favorite {
  category: Category;
  items: Array<ChecklistItem>;
}

export type ChecklistFilter = 'ALL' | 'DONE' | 'TODO';

export interface IndexEntry<T> {
  value: T;
  link: string;
}

export interface SearchResult {
  text: string;
  document: CategoryEntity | ChecklistItem;
  link: string;
}
