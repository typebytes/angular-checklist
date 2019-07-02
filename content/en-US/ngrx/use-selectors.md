---
title: use selectors to select data from the store
---

# Problem

When we want to fetch data from the store, we can use queries to get the data out. These queries are functions that have the following signature `(state: T) => K`.

While retrieving state from the store, we can execute some pretty complex and potentially inefficient or blocking logic. Every time the state changes, this logic will be re-executed.

Also, the plain queries we define cannot be used to compose new ones. This means that we have to define the same queries in multiple locations violating the DRY principle.

# Solution

`@ngrx/store` provides us with the concept of selectors. A selector helps us to build up queries that have a type signature of `(state: T): K`. The great benefit of these selectors is that they are composable.

`@ngrx/store` exposes a `createSelector` function that accepts other selectors to create new ones based on these. This means that we only have to define every selector just once and reuse them in multiple places.

Let's look at a simple example:

```ts
// Plain Selector
export const selectFeature = (state: AppState) => state.feature;

// Composed Selector
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: FeatureState) => state.counter
);
```

Another benefit of composed selectors is that they use an optimization technique called memoization. This means that the selector logic will **not** be re-executed if the source selectors did not update. As a result, the complex logic we might execute to get data from the store is only executed when it is actually needed.

# Resources

* [Selectors in Ngrx](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md)
* [NgRx: Parameterized selectors](https://blog.angularindepth.com/ngrx-parameterized-selector-e3f610529f8) by Tim Deschryver
* [Memoization](https://en.wikipedia.org/wiki/Memoization)
