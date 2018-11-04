---
title: use the entity pattern for large collections
---

# Problem

In our applications, we use a lot of arrays to store our data. When we fetch a list of users and we want to show them in the view, we can loop over them really easily using the `*ngFor` directive. We can put that data in our store so that we, for example, don't have to fetch it again later, or if the list is impacted by other components.

But arrays are not the most performant solution when we want to update, delete, or get a single element out of the list. All these operations have a linear time complexity of O(n). For large collections, this can have a huge impact on the performance.

# Solution

To make the CRUD operations more efficient we can adopt the entity pattern. This means that we will no longer store the data as an array but transform it to an object where the key is the unique identifier of the element and the value is the actual element. This is also called state normalization.

Here's an example.

```ts
const contacts = [
  { id: 1, name: 'Dominic Elm' },
  { id: 2, name: 'Kwinten Pisman' }
];
```

We can normalize this into the following:

```ts
const entities = {
  1: { id: 1, name: 'Dominic Elm' },
  2: { id: 2, name: 'Kwinten Pisman' }
};
```

Now, finding, deleting, or updating an element all have a complexity of O(1).

**Note:** As this is a common pattern in NgRx, there is a separate package that will help us to implement the entity pattern called `@ngrx/entity`.

# Resources

- [@ngrx/entity](https://github.com/ngrx/platform/tree/master/docs/entity)
