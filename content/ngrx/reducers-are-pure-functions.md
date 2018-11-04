---
title: reducers are pure functions
---

# Problem

Reducers are responsible for updating the state in our application based on actions. It is extremely important that these are pure making them deterministic, so that every action, given the same input, will always have the same result. If they are not pure, we can no longer trust them to manage our state.

# Solution

By writing our reducers as pure functions, we are 100% sure that the reducer is deterministic and can be used to manage our state. A pure function has the following properties:

* it does not depend on external state
* it does not produce any side-effects
* it does not mutate any of its inputs
* if you call it over and over again, with the same arguments, you always get back the same results

These properties are exactly what we need for our reducers to be deterministic and to comply with the key concepts of Redux.

In addition, pure functions are very easy to test.

Example of an **impure** function:

```ts
const state = 1;

function impureFunction(value: number) {
  return value + state;
}

// Returns 2
impureFunction(1);
```

The `impureFunction` relies on external state making it non-deterministic. We have no control of the state defined outside of the function as it is visible to many other functions.

Instead, we can make this function **pure** by passing in the data it needs:

```ts
const state = 1;

function pureFunction(value: number, otherValue: number) {
  return value + otherValue;
}

// Returns 2
pureFunction(1, state);
```

Now, `pureFunction` only relies on its parameters, does not mutate its arguments and has no side-effects.

The same is true for reducers. They have the following signature `(state, action) => state`. They do not rely on external state and shouldn't update its inputs.
