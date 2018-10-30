---
title: never mutate objects and embrace immutability
---

# Problem

Performing a deep comparison of objects in JavaScript is a quite costly operation. Reference checks however, are extremely fast and easy. For that reason, Angular and lots of other libraries depend on reference check comparisons instead of deeply comparing objects. If you mutate objects, you most likely experience weird and unexpected behavior when using any of these libs.

Here are some examples of things that don't work properly when mutating objects are:

- `OnPush` ChangeDetectionStrategy in Angular
- NgRx selectors
- RxJS operators such as `distinct`, `distinctUntilChanged`, `tap`, ...

# Solution

Instead of mutating objects, we need to work immutable. Immutability means that we will never mutate objects. Instead, if we need to update state or some object properties, we first copy the object and then make our changes.

This can easily be done with the object/array spread operator:

```ts
// Original State
const state = {
  users: [
    { id: 1, name: "Dominic Elm" },
    { id: 2, name: "Kwinten Pisman" },
  ],
  selectedUserId = 1
}

// New State
const newState = { ...state, selectedUserId: 2 };
```

In this example, we have a state object with some data. We want to update the `selectedUserId` property, without mutating the original object. Using the object spread operator, we create a new object, keeping the same reference to the `users` array but updating the `selectedUserId` to 2.

**Note:** This is just one of the ways we can work immutable. The spread operator is available in the latest versions of JavaScript. There are also libraries that can help us to work immutable that will be more performant for big collections, for example [Immutable.js](https://facebook.github.io/immutable-js/), [Immer](https://github.com/mweststrate/immer) or [Seamless Immutable](https://github.com/rtfeldman/seamless-immutable). The point here is that we should embrace immutability and try to avoid mutating objects, regardless of how you accomplish this.
