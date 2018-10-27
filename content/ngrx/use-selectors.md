---
title: use selectors to select data from the store
---

# Problem

When we want to fetch data from the store, we can use querries to get the data out. These querries are functions that take have the following signature `(state: T) => K`. While getting state from the store, we can execute some pretty complex and potentially ineffecient logic. Every time the state changes, this logic will be reexecuted.

These querries we define can also not be reused to create new ones. This means that we have to define the same querries in multiple location violating the DRY principle.

# Solution

`@ngrx/store` provides us with the concept of selectors. A selector helps us to build up querries that have a type signature of `(state: T): K`. The great benefit of these selectors is that they are composable. `@ngrx` exposes a `createSelector` function that accepts other selectors to create new ones based on these. This means that we only have to define every selector just once and reuse them in multiple places.

```ts
export const selectFeature = (state: AppState) => state.feature;
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter
);
```

Another benefit of these selectors is that they use memoization. This means that the selector logic will **not** be reexecuted if the source selectors did not update. This means that the complex logic we might execute to get data from the store is only executed when it is actually needed.

# Resources

* [Selectors in Ngrx](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md)
