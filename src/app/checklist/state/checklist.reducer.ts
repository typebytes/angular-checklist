import { createSelector } from '@ngrx/store';

import {
  BreadcrumbItem,
  Category,
  CategoryEntity,
  CategoryMap,
  Checklist,
  ChecklistItem,
  Favorite,
  FavoriteEntity,
  Filter,
  ItemMap
} from '../models/checklist';

import {
  calculatePercentage,
  computeScore,
  filterItems,
  mergeDeep,
  setCheckedState,
  updateFavorites
} from '../utils/checklist';

import { extractRouteParams } from '../utils/router';
import { ChecklistActionTypes, ChecklistActions } from './checklist.actions';
import { ApplicationState } from './index';

const CHECKLIST: Checklist = require('../../../assets/content.json');

export interface ChecklistState {
  categories: CategoryMap;
  items: ItemMap;
  filter: Filter;
  favorites: FavoriteEntity;
}

export const INITIAL_STATE: ChecklistState = {
  ...CHECKLIST,
  filter: {
    categories: 'ALL',
    favorites: 'ALL'
  },
  favorites: {}
};

export function checklistReducer(state = INITIAL_STATE, action: ChecklistActions) {
  switch (action.type) {
    case ChecklistActionTypes.INIT:
      return mergeDeep(state, CHECKLIST);
    case ChecklistActionTypes.SET_CATEGORIES_FILTER:
    case ChecklistActionTypes.SET_FAVORITES_FILTER:
      return {
        ...state,
        filter: filterReducer(state.filter, action)
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

export const filterReducer = (state: Filter, action: ChecklistActions) => {
  switch (action.type) {
    case ChecklistActionTypes.SET_CATEGORIES_FILTER:
      return {
        ...state,
        categories: action.payload
      };
    case ChecklistActionTypes.SET_FAVORITES_FILTER:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};

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
      const updatedFavorites = updateFavorites(state[categoryId], action.payload.id);
      const updateState = { ...state };

      if (updatedFavorites.length) {
        updateState[categoryId] = updatedFavorites;
      } else {
        delete updateState[categoryId];
      }

      return updateState;
    default:
      return state;
  }
};

export namespace ChecklistQueries {
  export const getCategoriesEntity = (state: ApplicationState) => state.checklist.categories;
  export const getItemsEntity = (state: ApplicationState) => state.checklist.items;
  export const getRouterState = (state: ApplicationState) => state.router.state;
  export const getCategroriesFilter = (state: ApplicationState) => state.checklist.filter.categories;
  export const getFavroitesFilter = (state: ApplicationState) => state.checklist.filter.favorites;
  export const getFavoriteEntity = (state: ApplicationState) => state.checklist.favorites;

  export const getScores = createSelector(getCategoriesEntity, getItemsEntity, (categories, items) => {
    return Object.keys(categories).reduce((acc, categoryId) => {
      acc[categoryId] = computeScore(categories[categoryId].items, items);
      return acc;
    }, {});
  });

  export const getCategories = createSelector(
    getCategoriesEntity,
    getItemsEntity,
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
    getCategoriesEntity,
    getScores,
    (routerState, categories, scores): CategoryEntity => {
      const { category } = extractRouteParams(routerState.root, 4);
      return category ? { ...categories[category], score: scores[category] } : null;
    }
  );

  export const getItemsFromSelectedCategory = createSelector(
    getCategoriesEntity,
    getItemsEntity,
    getSelectedCategory,
    getCategroriesFilter,
    (categories, items, selectedCategory, filter): Array<ChecklistItem> => {
      if (selectedCategory) {
        return filterItems(
          selectedCategory.items.map(id => ({ ...items[id], category: selectedCategory.slug })),
          filter
        );
      }

      return null;
    }
  );

  export const getSelectedItem = createSelector(
    getSelectedCategory,
    getItemsEntity,
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
    getCategoriesEntity,
    getItemsEntity,
    getFavroitesFilter,
    (favorites, categories, items, filter): Array<Favorite> => {
      return Object.keys(favorites).reduce((acc, categoryId) => {
        acc.push({
          category: categories[categoryId],
          items: favorites[categoryId].map(itemId => ({ ...items[itemId], category: categoryId }))
        });

        return acc;
      }, []);
    }
  );

  export const getFilteredFavorites = createSelector(getFavorites, getFavroitesFilter, (favorites, filter) => {
    favorites.forEach(favorite => {
      favorite.items = filterItems(favorite.items, filter);
    });

    return favorites;
  });

  export const getFavoritesScore = createSelector(getFavorites, favorites => {
    if (favorites.length) {
      const score = favorites.reduce(
        (acc, favorite) => {
          acc.checkedItems += favorite.items.filter(item => item.checked).length;
          acc.totalItems += favorite.items.length;
          return acc;
        },
        { checkedItems: 0, totalItems: 0 }
      );

      return calculatePercentage(score.checkedItems, score.totalItems);
    }

    return 0;
  });

  export const getFavoritesCount = createSelector(getFavorites, favorites => {
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
