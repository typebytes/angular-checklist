---
title: never mutate objects, work immutable
---
# Problem

Performing a deep comparison of objects in javascript is a quite costly operation. Reference checks however, are extremely fast and easy. For that reason, Angular and lots of other libraries depend on reference check comparisons instead of doing a deep comparison. If you mutate objects, you are bound to see some weird and unexpected behavior.

Some examples of things that don't work properly when mutating objects are:
- onPush strategy in Angular
- NgRx selectors 
- RxJS operators such as `distinct`, `distinctUntilChanged`, `tap`, ...

# Solution

Instead of mutating objects, we need to work immutable. Immutability means that we will never mutate objects. Instead, when we want to change something, we can a copy of the objects with our changes. 

Next, we have an example using the object spread operator:

```ts
const state = {
  users: [
    {id: 1, name: "Dominic Elm"},
    {id: 2, name: "Kwinten Pisman"},
  ],
  selectedUserId = 1;
}  

const newState = {...state, selectedUserId: 2};
```

We have a state object with some data. We want to update the `selectedUserId` property, without mutating the original object. Using the object spread operator, we create a new object, keeping the same reference to the `users` array, but changing the `selectedUserId` to 2.

**Note:** This is just one of the ways we can work immutable. The spread operator is available in the latest versions of javascript. There are also libraries that can help us to work immutable that will be more performant for big collections. The point here however is to work immutable and never mutate any object. Regardless of how you accomplish this.