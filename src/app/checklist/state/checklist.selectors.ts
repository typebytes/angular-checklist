import { createSelector } from '@ngrx/store';
import { ProjectsSelectors } from '../../projects/state/projects.selectors';
import { extractRouteParams } from '../../shared/router.utils';
import { calculatePercentage, computeScore, createChecklistItem, filterItems } from '../../state/app-state.utils';
import { AppSelectors } from '../../state/app.selectors';
import { BreadcrumbItem, Category, CategoryEntity, ChecklistItem } from '../models/checklist.model';

const _groupBy = require('lodash.groupby');

export namespace ChecklistSelectors {
  export const getFavroitesFilter = createSelector(
    AppSelectors.getChecklistState,
    checklist => checklist.filter.favorites
  );

  export const getCategroriesFilter = createSelector(
    AppSelectors.getChecklistState,
    checklist => checklist.filter.categories
  );

  export const getScores = createSelector(
    AppSelectors.getCategoryEntities,
    ProjectsSelectors.getProjectItems,
    (categories, items) => {
      return Object.keys(categories).reduce((acc, categoryId) => {
        acc[categoryId] = computeScore(categories[categoryId].items, items);
        return acc;
      }, {});
    }
  );

  export const getActiveCategoryEntities = createSelector(
    AppSelectors.getCategoryEntities,
    ProjectsSelectors.getDisabledCategories,
    (categoriyEntities, disabledCategories) => {
      return Object.keys(disabledCategories).reduce((acc, disabledCategory) => {
        const { [disabledCategory]: removedCategory, ...rest } = acc;
        return rest;
      }, categoriyEntities);
    }
  );

  export const getAllCategories = createSelector(
    AppSelectors.getCategoryEntities,
    AppSelectors.getItemEntities,
    ProjectsSelectors.getDisabledCategories,
    getScores,
    (categories, items, disabledCategories, scores): Array<Category> => {
      return Object.keys(categories).map(
        (categoryId): Category => {
          const category = categories[categoryId];
          const categoryItems = category.items.map(itemId => items[itemId]);

          return {
            ...category,
            score: scores[categoryId],
            enabled: !disabledCategories[category.slug],
            items: categoryItems
          };
        }
      );
    }
  );

  export const getActiveCategories = createSelector(
    getAllCategories,
    (categories): Array<Category> => {
      return categories.filter(category => category.enabled);
    }
  );

  export const getSelectedCategory = createSelector(
    AppSelectors.getRouterState,
    AppSelectors.getCategoryEntities,
    ProjectsSelectors.getDisabledCategories,
    getScores,
    (routerState, categoryEntities, disabledCategories, scores): CategoryEntity => {
      const { category } = extractRouteParams(routerState.root, 4);

      let selectedCategory = null;

      if (category) {
        selectedCategory = {
          ...categoryEntities[category],
          score: scores[category],
          enabled: !disabledCategories[category]
        };
      }

      return selectedCategory;
    }
  );

  export const getFavoritesFromSelectedCategory = createSelector(
    ProjectsSelectors.getSelectedProject,
    getSelectedCategory,
    (project, selectedCategory) => {
      if (selectedCategory) {
        return project.favorites;
      }

      return {};
    }
  );

  export const getItemsFromSelectedCategory = createSelector(
    AppSelectors.getItemEntities,
    getSelectedCategory,
    getCategroriesFilter,
    ProjectsSelectors.getProjectItems,
    getFavoritesFromSelectedCategory,
    (items, selectedCategory, filter, projectItems, favorites): Array<ChecklistItem> => {
      if (selectedCategory) {
        return filterItems(
          selectedCategory.items.map(id => createChecklistItem(id, items, projectItems, favorites)),
          filter
        );
      }

      return null;
    }
  );

  export const getSelectedItem = createSelector(
    getSelectedCategory,
    AppSelectors.getItemEntities,
    AppSelectors.getRouterState,
    ProjectsSelectors.getProjectItems,
    getFavoritesFromSelectedCategory,
    (selectedCategory, items, routerState, projectItems, favorites): ChecklistItem => {
      const { item: id } = extractRouteParams(routerState.root, 4);

      if (selectedCategory && id) {
        return createChecklistItem(id, items, projectItems, favorites);
      }

      return null;
    }
  );

  export const getFavoriteGroupedByCategory = createSelector(
    ProjectsSelectors.getFavoriteEntities,
    AppSelectors.getItemEntities,
    ProjectsSelectors.getProjectItems,
    (favorites, itemEntities, projectItems) => {
      const items = Object.keys(favorites).map(itemId =>
        createChecklistItem(itemId, itemEntities, projectItems, favorites)
      );

      return _groupBy(items, 'category');
    }
  );

  export const getFavorites = createSelector(
    getFavoriteGroupedByCategory,
    AppSelectors.getCategoryEntities,
    (favoriteGroups, categories) => {
      return Object.keys(favoriteGroups).reduce((acc, categoryId) => {
        acc.push({
          category: categories[categoryId],
          items: favoriteGroups[categoryId]
        });

        return acc;
      }, []);
    }
  );

  export const getFavoriteEntitiesByCategory = (id: string) => {
    return createSelector(
      getFavoriteGroupedByCategory,
      categories => categories[id] || {}
    );
  };

  export const getFilteredFavorites = createSelector(
    getFavorites,
    getFavroitesFilter,
    (favorites, filter) => {
      return favorites.map(favorite => ({
        ...favorite,
        items: filterItems(favorite.items, filter)
      }));
    }
  );

  export const getFavoritesScore = createSelector(
    getFavorites,
    favorites => {
      if (favorites.length) {
        const score = favorites.reduce(
          (acc, category) => {
            acc.checkedItems += category.items.filter((item: ChecklistItem) => item.checked).length;
            acc.totalItems += category.items.length;
            return acc;
          },
          { checkedItems: 0, totalItems: 0 }
        );

        return calculatePercentage(score.checkedItems, score.totalItems);
      }

      return 0;
    }
  );

  export const getFavoritesCount = createSelector(
    getFavorites,
    favorites => {
      return favorites.reduce((acc, category) => {
        return acc + category.items.length;
      }, 0);
    }
  );

  export const getBreadcrumb = createSelector(
    getSelectedCategory,
    getSelectedItem,
    (category, item) => {
      const breadcrumb: Array<BreadcrumbItem> = [];

      if (category) {
        breadcrumb.push(category);
      }

      if (item) {
        breadcrumb.push(item);
      }

      return breadcrumb;
    }
  );
}
