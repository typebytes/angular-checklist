---
title: avoid nested subscriptions
---

# Problem

Sometimes we need to aggregate values from multiple observables or deal with nested observables to perform an action. In that case, you could  subscribe to an observable in the subscribe block of another observable. This makes handling subscriptions way more difficult and feels like callback hell all over again.

# Solution

For aggregating values or dealing with nested observables we can use one of the combination or flattening operators.

Let's consider the following example: In an e-commerce system we are fetching a product and based on that product we want to fetch similar ones.

A naive solution could look like this:

```ts
fetchProduct(1).subscribe(product => {
  fetchSimilarProducts(product).subscribe(similarProducts => {
    ...
  });
});
```

We first fetch the product and once the request is resolved we fetch similar products inside the subscribe block of the first, most outer observable.

This is considered to be an anti-pattern or code smell.

Instead we can use one of the flattening operators to get rid of this code smell and solve it more elegantly:

```ts
fetchProduct(1).pipe(
  switchMap(product => fetchSimilarProducts(product))
).subscribe(...)
```

Here's another example: A simple list view where the user can filter and paginate the list. Whenever the user goes to the next page we also need to take into account the filter:

Naive solution:

```ts
nextPage$.subscribe(page => {
  filter$.pipe(take(1)).subscribe(filter => {
    fetchData(page, filter).subscribe(items => {
      this.items = items;
    });
  });
});
```

That's again not the most idiomatic solution because we have introduced several nested subscriptions.

Let's fix this with a combination and flattening operator:

```ts
nextPage$
  .pipe(
    withLatestFrom(filter$),
    switchMap(([page, filter]) => fetchData(page, filter))
  )
  .subscribe(items => {
    this.items = items;
  });
```

Or when we want to listen for changes in both the `nextPage$` and the `filter$` we could use `combineLatest`:

```ts
combineLatest(nextPage$, filter$)
  .pipe(switchMap(([page, filter]) => fetchData(page, filter)))
  .subscribe(items => {
    this.items = items;
  });
```

Both solutions are much more readable and they also reduces the complexity of our code.

Here are some very common combination and flattening operators:

**Combination Operators**:

- `combineLatest`
- `withLatestFrom`
- `merge`
- `concat`
- `zip`
- `forkJoin`
- `pairwise`
- `startWith`

**Flattening Operators**:

- `switchMap`
- `mergeMap`
- `concatMap`
- `exhaustMap`
