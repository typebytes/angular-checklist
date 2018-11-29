import { EntityState } from "../../shared/models";
import { Project } from "../models/projects.model";

interface ToggleMannyOptions {
  initialValue: EntityState<boolean>;
  value?: boolean;
}

export const toggleEntity = (
  entities: EntityState<boolean>,
  entity: string,
  value?: boolean | undefined
) => {
  value = typeof value === "undefined" ? !entities[entity] : value;

  if (!value) {
    const { [entity]: removed, ...rest } = entities;
    return rest;
  }

  return {
    ...entities,
    [entity]: value
  };
};

export const toggleManny = <T>(
  items: Array<T>,
  projectionFn: (item: T) => string,
  { initialValue, value }: ToggleMannyOptions = { initialValue: {} }
) => {
  return items.reduce((selectedItems, item) => {
    return toggleEntity(selectedItems, projectionFn(item), value);
  }, initialValue);
};

export const createNewProject = (id: string, name?: string): Project => {
  return {
    id,
    name: name ? name : id,
    disabledCategories: {},
    items: {},
    favorites: {},
    creationTime: Date.now()
  };
};
