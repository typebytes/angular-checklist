import { Action, ActionReducer } from '@ngrx/store';
import { Project, ProjectEntities, ProjectsState, FavoriteEntities } from '../models/projects.model';
import { createNewProject, toggleEntity, toggleManny } from './project-state.utils';
import { ProjectsActions, ProjectsActionTypes } from './projects.actions';

const DEFAULT_PROJECT: ProjectEntities = {
  default: createNewProject('default')
};

function projectsStateReducer(state: ProjectsState, action: ProjectsActions) {
  switch (action.type) {
    case ProjectsActionTypes.TOGGLE_FAVORITE:
    case ProjectsActionTypes.TOGGLE_CATEGORY:
    case ProjectsActionTypes.ADD_PROJECT:
    case ProjectsActionTypes.DELETE_PROJECT:
    case ProjectsActionTypes.EDIT_PROJECT:
    case ProjectsActionTypes.TOGGLE_ITEM:
    case ProjectsActionTypes.CHECK_ALL:
    case ProjectsActionTypes.UNCHECK_ALL:
    case ProjectsActionTypes.TOGGLE_ALL_FAVORITES:
      return {
        ...state,
        entities: projectEntitiesReducer(state, action)
      };
    case ProjectsActionTypes.SELECT_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload
      };
    default:
      return state;
  }
}

export const projectEntitiesReducer = (state: ProjectsState, action: ProjectsActions): ProjectEntities => {
  const selectedProject = state.selectedProjectId;
  const entities = state.entities;

  switch (action.type) {
    case ProjectsActionTypes.EDIT_PROJECT:
      const { current, updated } = action.payload;
      const { [current.id]: currentProject, ...projects } = state.entities;

      const updatedProject = {
        ...current,
        ...updated
      };

      return {
        ...projects,
        [updatedProject.id]: updatedProject
      };
    case ProjectsActionTypes.ADD_PROJECT:
      const project = action.payload;

      return {
        ...state.entities,
        [project.id]: createNewProject(project.id, project.name)
      };
    case ProjectsActionTypes.DELETE_PROJECT:
      const { [action.payload]: deletedProject, ...updatedEntities } = state.entities;

      return {
        ...updatedEntities
      };
    case ProjectsActionTypes.CHECK_ALL:
    case ProjectsActionTypes.UNCHECK_ALL:
    case ProjectsActionTypes.TOGGLE_ITEM:
    case ProjectsActionTypes.TOGGLE_CATEGORY:
    case ProjectsActionTypes.TOGGLE_FAVORITE:
    case ProjectsActionTypes.TOGGLE_ALL_FAVORITES:
      return {
        ...entities,
        [selectedProject]: projectReducer(entities[selectedProject], action)
      };
    default:
      return entities;
  }
};

export const projectReducer = (project: Project, action: ProjectsActions): Project => {
  switch (action.type) {
    case ProjectsActionTypes.TOGGLE_FAVORITE:
    case ProjectsActionTypes.TOGGLE_ALL_FAVORITES:
      return {
        ...project,
        favorites: favoritesReducer(project.favorites, action)
      };
    case ProjectsActionTypes.UNCHECK_ALL:
      return {
        ...project,
        items: toggleManny(action.payload.items, item => item, { initialValue: project.items, value: false })
      };
    case ProjectsActionTypes.CHECK_ALL:
      return {
        ...project,
        items: toggleManny(action.payload.items, item => item, { initialValue: project.items, value: true })
      };
    case ProjectsActionTypes.TOGGLE_ITEM:
      return {
        ...project,
        items: toggleEntity(project.items, action.payload.id)
      };
    case ProjectsActionTypes.TOGGLE_CATEGORY:
      return {
        ...project,
        disabledCategories: toggleEntity(project.disabledCategories, action.payload)
      };
    default:
      return project;
  }
};

export const favoritesReducer = (favoriteEntities: FavoriteEntities, action: ProjectsActions) => {
  switch (action.type) {
    case ProjectsActionTypes.TOGGLE_ALL_FAVORITES:
      const updatedFavorites = { ...favoriteEntities };

      action.payload.forEach(item => {
        delete updatedFavorites[item.id];
      });

      return updatedFavorites;
    case ProjectsActionTypes.TOGGLE_FAVORITE:
      const { id: itemId } = action.payload;
      return toggleEntity(favoriteEntities, itemId);
    default:
      return favoriteEntities;
  }
};

export const projectsInitReducer = (stateReducer: ActionReducer<any>) => {
  return (state: ProjectsState, action: Action): ProjectsState => {
    let newState: ProjectsState = state;

    if (!state || !Object.keys(state).length) {
      newState = {
        entities: DEFAULT_PROJECT,
        selectedProjectId: null
      };
    }

    const nextState = stateReducer(newState, action);

    return nextState;
  };
};

export function projectsReducer(state: ProjectsState, action: ProjectsActions) {
  const rootReducer = projectsInitReducer(projectsStateReducer);
  return rootReducer(state, action);
}
