---
title: define actions as classes
---

# Problem

When we send an action to the store, we need to send an object that has a type property and an optional payload property. We could recreate an object every time we want to send that but that would break the DRY principle.

One of the promises in NgRx is that it provides extreme type safety. This is something that cannot be achieved with plain objects.

# Resources



* [Type safe actions in reducers](https://blog.strongbrew.io/type-safe-actions-in-reducers/) by Kwinten Pisman.