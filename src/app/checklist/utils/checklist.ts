import { CategoryEntity, CategoryMap, ChecklistFilter, ChecklistItem, ItemMap } from '../models/checklist';

export const computeScore = (category: CategoryEntity, items: ItemMap) => {
  const score = category.items.reduce((acc, id) => {
    return items[id].checked ? acc + 1 : acc;
  }, 0);

  return score * 1 / category.items.length;
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
