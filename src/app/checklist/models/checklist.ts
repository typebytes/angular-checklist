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

export interface Checklist {
  categories: CategoryMap;
  items: ItemMap;
}

export interface FavoriteEntity {
  [category: string]: Array<string>;
}

export interface Favorite {
  title: string;
  items: Array<ChecklistItem>;
}

export type ChecklistFilter = 'ALL' | 'DONE' | 'TODO';
