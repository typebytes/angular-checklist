import { EntityState } from '../../shared/models';

export interface Project {
  id: string;
  name: string;
  disabledCategories: EntityState<boolean>;
  favorites: FavoriteEntities;
  items: EntityState<boolean>;
  creationTime: number;
  score?: number;
}

export type ProjectEntities = EntityState<Project>;
export type FavoriteEntities = EntityState<boolean>;

export interface ProjectsState {
  selectedProjectId: string;
  entities: ProjectEntities;
}
