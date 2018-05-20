import { createSelector } from '@ngrx/store';
import { computeScore, filterItems, setCheckedState, updateFavorites } from '../utils/checklist';
import { extractRouteParams } from '../utils/router';
import { ChecklistActionTypes, ChecklistActions } from './checklist.actions';
import { ApplicationState } from './index';

import {
  BreadcrumbItem,
  Category,
  CategoryEntity,
  CategoryMap,
  Checklist,
  ChecklistFilter,
  ChecklistItem,
  ItemMap,
  FavoriteEntity,
  Favorite
} from '../models/checklist';

const CHECKLIST: Checklist = require('../../../assets/content.json');

export interface ChecklistState {
  categories: CategoryMap;
  items: ItemMap;
  filter: ChecklistFilter;
  favorites: FavoriteEntity;
}

export const INITIAL_STATE: ChecklistState = {
  ...CHECKLIST,
  filter: 'ALL',
  favorites: {}
};

export function checklistReducer(state = INITIAL_STATE, action: ChecklistActions) {
  switch (action.type) {
    case ChecklistActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case ChecklistActionTypes.CHECK_ALL:
      return {
        ...state,
        items: setCheckedState(action.payload, state.categories, state.items, true)
      };
    case ChecklistActionTypes.UNCHECK_ALL:
      return {
        ...state,
        items: setCheckedState(action.payload, state.categories, state.items, false)
      };
    case ChecklistActionTypes.TOGGLE_FAVORITE:
      return {
        ...state,
        items: itemsReducer(state.items, action),
        favorites: favoritesReducer(state.favorites, action)
      };
    case ChecklistActionTypes.TOGGLE:
      return {
        ...state,
        items: itemsReducer(state.items, action)
      };
    default:
      return state;
  }
}

export const itemsReducer = (state: ItemMap, action: ChecklistActions) => {
  switch (action.type) {
    case ChecklistActionTypes.TOGGLE_FAVORITE:
      const id = action.payload.id;

      return {
        ...state,
        [id]: { ...state[id], favorite: !state[id].favorite }
      };
    case ChecklistActionTypes.TOGGLE:
      const item = state[action.payload.id];

      return {
        ...state,
        [action.payload.id]: { ...item, checked: !item.checked }
      };
    default:
      return state;
  }
};

export const favoritesReducer = (state: FavoriteEntity, action: ChecklistActions) => {
  switch (action.type) {
    case ChecklistActionTypes.TOGGLE_FAVORITE:
      const categoryId = action.payload.category;

      return {
        ...state,
        [categoryId]: updateFavorites(state[categoryId], action.payload.id)
      };
    default:
      return state;
  }
};

export namespace ChecklistQueries {
  export const getCategoryEntity = (state: ApplicationState) => state.checklist.categories;
  export const getItemEntity = (state: ApplicationState) => state.checklist.items;
  export const getRouterState = (state: ApplicationState) => state.router.state;
  export const getFilter = (state: ApplicationState) => state.checklist.filter;
  export const getFavoriteEntity = (state: ApplicationState) => state.checklist.favorites;

  export const getScores = createSelector(getCategoryEntity, getItemEntity, (categories, items) => {
    return Object.keys(categories).reduce((acc, categoryId) => {
      acc[categoryId] = computeScore(categories[categoryId], items);
      return acc;
    }, {});
  });

  export const getCategories = createSelector(
    getCategoryEntity,
    getItemEntity,
    getScores,
    (categories, items, scores): Array<Category> => {
      return Object.keys(categories).map(categoryId => {
        const category = categories[categoryId];
        const categoryItems = category.items.map(itemId => items[itemId]);
        return { ...category, score: scores[categoryId], items: categoryItems } as Category;
      });
    }
  );

  export const getSelectedCategory = createSelector(
    getRouterState,
    getCategoryEntity,
    getScores,
    (routerState, categories, scores): CategoryEntity => {
      const { category } = extractRouteParams(routerState.root, 4);
      return category ? { ...categories[category], score: scores[category] } : null;
    }
  );

  export const getItemsFromSelectedCategory = createSelector(
    getCategoryEntity,
    getItemEntity,
    getSelectedCategory,
    getFilter,
    (categories, items, selectedCategory, filter): Array<ChecklistItem> => {
      if (selectedCategory) {
        const category = categories[selectedCategory.slug];
        return filterItems(category.items.map(id => items[id]), filter);
      }

      return null;
    }
  );

  export const getSelectedItem = createSelector(
    getSelectedCategory,
    getItemEntity,
    getRouterState,
    (category, items, routerState): ChecklistItem => {
      if (category) {
        const { item: id } = extractRouteParams(routerState.root, 4);
        return items[id];
      }

      return null;
    }
  );

  export const getFavorites = createSelector(
    getFavoriteEntity,
    getCategoryEntity,
    getItemEntity,
    (favorites, categories, items): Array<Favorite> => {
      return Object.keys(favorites).reduce((acc, categoryId) => {
        acc.push({ title: categories[categoryId].title, items: favorites[categoryId].map(itemId => items[itemId]) });
        return acc;
      }, []);
    }
  );

  export const getFavoriteCount = createSelector(getFavorites, favorites => {
    return favorites.reduce((acc, category) => {
      return acc + category.items.length;
    }, 0);
  });

  export const getBreadcrumb = createSelector(getSelectedCategory, getSelectedItem, (category, item) => {
    const breadcrumb: Array<BreadcrumbItem> = [];

    if (category) {
      breadcrumb.push(category);
    }

    if (item) {
      breadcrumb.push(item);
    }

    return breadcrumb;
  });
}
