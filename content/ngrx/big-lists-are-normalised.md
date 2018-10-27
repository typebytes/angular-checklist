---
title: use the entity pattern for big lists
---

# Problem

In our applications we use a lot of arrays to store our data. When we fetch a list of users and we want to show them in the view, we can loop over them really easily using the `*ngFor` directive. We can put that data in our store so that we, for example, don't have to fetch it again later. 

But arrays are not the most performant solution when we want to update, delete or get a single element out of the list. They all have a complexity of O(n). And this is not interesting for when we are taking data out of the store.

# Solution

To make getting data out of the store, we can adopt the entity pattern. This means that we will no longer store the data as an array but transform it to an object where the key is the unique identifier of the element and the value is the actual element. It means that we will transform this:

```ts
const contacts = [
  { id: 1, name: 'Dominic Elm' },
  { id: 2, name: 'Kwinten Pisman' }
]
```

into this:

```ts
const entities = {
  1: { id: 1, name: 'Dominic Elm' },
  2: { id: 2, name: 'Kwinten Pisman' },
}
```
Now, finding an element, deleting and updating all have a complexity of O(1). 

**Note:** As this is a common pattern in NgRx, there is a seperate package that will help us to implement the entity pattern called `@ngrx/entity`.

# Resources

* [@ngrx/entity](https://github.com/ngrx/platform/tree/master/docs/entity)
