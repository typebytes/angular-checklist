import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';

export const extractRouteParams = (snapshot: ActivatedRouteSnapshot, levels = 0): Params => {
  if (levels === 0 || !snapshot.firstChild) {
    return snapshot.params;
  }

  return extractRouteParams(snapshot.firstChild, --levels);
};

export const getActivatedChild = (route: ActivatedRoute) => {
  if (!route.firstChild) {
    return route;
  }

  return getActivatedChild(route.firstChild);
};
