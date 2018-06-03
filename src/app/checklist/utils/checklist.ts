import { CategoryMap, ChecklistFilter, ChecklistItem, ItemMap } from '../models/checklist';

export const computeScore = (categoryItems: Array<string>, items: ItemMap) => {
  const score = categoryItems.reduce((acc, id) => {
    return items[id].checked ? acc + 1 : acc;
  }, 0);

  return calculatePercentage(score, categoryItems.length);
};

export const calculatePercentage = (value: number, max: number) => {
  return value * 1.0 / max;
};

export const setCheckedState = (selectedCategory: string, categories: CategoryMap, items: ItemMap, value: boolean) => {
  const updatedItems = categories[selectedCategory].items.map(id => items[id]).reduce((acc, item) => {
    acc[item.id] = { ...item, checked: value };
    return acc;
  }, {});

  return {
    ...items,
    ...updatedItems
  };
};

export const filterItems = (items: Array<ChecklistItem>, filter: ChecklistFilter) => {
  let filteredItems = items;

  if (filter === 'DONE') {
    filteredItems = items.filter(item => item.checked);
  } else if (filter === 'TODO') {
    filteredItems = items.filter(item => !item.checked);
  }

  return filteredItems;
};

export const updateFavorites = (favorites: Array<string>, itemId: string) => {
  let updatedFavorites = [];

  if (!favorites || !favorites.length) {
    updatedFavorites = [itemId];
  } else if (favorites.includes(itemId)) {
    updatedFavorites = favorites.filter(id => id !== itemId);
  } else {
    updatedFavorites = [...favorites, itemId];
  }

  return updatedFavorites;
};

export const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
};

export function mergeDeep<T>(target: T, source: Object): T {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return target;
}
