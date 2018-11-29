import { createSelector } from "@ngrx/store";
import { extractRouteParams } from "../../shared/router.utils";
import { computeScore } from "../../state/app-state.utils";
import { AppSelectors } from "../../state/app.selectors";
import { Project } from "../models/projects.model";

export namespace ProjectsSelectors {
  export const getProjectEntities = createSelector(
    AppSelectors.getProjectsState,
    projects => projects.entities
  );

  export const getSelectedProjectId = createSelector(
    AppSelectors.getRouterState,
    (routerState): string => {
      const { project } = extractRouteParams(routerState.root, 1);

      return project;
    }
  );

  export const getSelectedProject = createSelector(
    getProjectEntities,
    getSelectedProjectId,
    (projectEntities, projectId): Project => {
      const emptyProject = {} as Project;

      if (!projectEntities) {
        return emptyProject;
      }

      return projectEntities[projectId] || emptyProject;
    }
  );

  export const getProjectItems = createSelector(
    getSelectedProject,
    project => {
      return project.items || {};
    }
  );

  export const getDisabledCategories = createSelector(
    getSelectedProject,
    project => {
      return project.disabledCategories || {};
    }
  );

  export const getFavoriteEntities = createSelector(
    getSelectedProject,
    project => {
      return project.favorites || {};
    }
  );

  export const getProjectsScores = createSelector(
    getProjectEntities,
    AppSelectors.getCategoryEntities,
    (projectEntities, categoryEntities) => {
      return Object.keys(projectEntities).reduce((scores, projectId) => {
        const categoryScore = Object.keys(categoryEntities).reduce(
          (score, categoryId) => {
            return (
              score +
              computeScore(
                categoryEntities[categoryId].items,
                projectEntities[projectId].items
              )
            );
          },
          0
        );

        scores[projectId] = (
          categoryScore / Object.keys(categoryEntities).length
        ).toFixed(2);

        return scores;
      }, {});
    }
  );

  export const getProjects = createSelector(
    getProjectEntities,
    getProjectsScores,
    (projectEntities, projectScores) => {
      const addScore = (project): Project => {
        return {
          ...project,
          score: projectScores[project.id]
        };
      };

      return Object.values(projectEntities)
        .map(addScore)
        .sort((a: Project, b: Project) => b.creationTime - a.creationTime);
    }
  );

  export const getProjectById = (id: string) => {
    return createSelector(
      getProjectEntities,
      projectEntities => projectEntities[id]
    );
  };
}
