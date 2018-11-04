---
title: define actions as classes
---

# Problem

When we send an action to the store, we need to send an object that has a type property and optional metadata (often added as a payload property). We could recreate an object every time we want to send that but we would violate the DRY principle.

One of the promises in NgRx is that it provides extreme type safety. This is something that cannot be achieved with plain objects.

# Solution

We want to define our actions as classes. When we use classes to define our actions, we can define them once in a separate file and reuse them everywhere.

Here's an example on how to define an action.

```ts
import { Action } from '@ngrx/store';

export enum AppActionTypes {
  APP_PAGE_LOAD_USERS = '[App Page] Load Users'
}

export class AppPageLoadUsers implements Action {
  readonly type = AppActionTypes.APP_PAGE_LOAD_USERS;
}

export type AppActions = AppPageLoadUsers;
```

Now, we can use the `AppPageLoadUsers` class to send this action to the store which is then passed to our reducers.

**Note:** Because of the way the action is being defined, using features like string literals and union types, we can leverage discriminated unions in our reducers to have extreme type safety when it comes to typing the action's payload. See the additional resources for more info.

# Resources

- [Type safe actions in reducers](https://blog.strongbrew.io/type-safe-actions-in-reducers/) by Kwinten Pisman
