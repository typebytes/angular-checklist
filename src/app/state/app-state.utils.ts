import { ChecklistFilter, ChecklistItem, ItemEntities } from '../checklist/models/checklist.model';
import { EntityState } from '../shared/models';

export const createChecklistItem = (
  id: string,
  itemEntities: ItemEntities,
  projectItems: EntityState<boolean>,
  favorites: EntityState<boolean>
): ChecklistItem => {
  return {
    ...itemEntities[id],
    checked: projectItems[id],
    favorite: favorites[id]
  };
};

export const calculatePercentage = (value: number, max: number) => {
  return (value * 1.0) / max;
};

export const computeScore = (categoryItems: Array<string>, items: EntityState<boolean>) => {
  const score = categoryItems.reduce((acc, id) => {
    return items[id] ? acc + 1 : acc;
  }, 0);

  return calculatePercentage(score, categoryItems.length);
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
