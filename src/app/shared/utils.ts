import { EntityState } from './models';

export const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
};

export const hasEntities = (entityState: EntityState<any>) => {
  return Object.keys(entityState).length > 0;
};

export const convertToProjectId = (projectName: string) => {
  return projectName.toLowerCase().replace(/\s+/g, '-').trim();
};
