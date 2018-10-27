---
title: don't store state that can be derived
---

# Problem

We can use `@ngrx/store` to store data. When we store duplicate data, we are making our reducer logic way more difficult. Take a look at the following type definiton for a potential state object:

```ts
export interface ApplicationState {
  users: Array<User>;
  selectedUserId: number;
  selectedUser: User;
}
```

In this scenario, we are both storing the id of the `selectedUser` and the object of the `selectedUser`. This poses a lot of problems. First of all, when we change the selected user, we need to remember to update both references. But even worse, what if we update the user that is currently selected. Then we need to update both the reference in the `users` array and the `selectedUser`. This will make it really easy to make mistakes.

# Solution

To fix this, we **shouldn't store state that can be derived**. If we store the `users` and the `selectedUserId`, we can easily derive which user is selected. This is logic that we can put in a selector. The state object's type would look like this.

```ts
export interface ApplicationState {
  users: Array<User>;
  selectedUserId: number;
}
```

In this scenario, when we update a user, we only need to update the reference in the `users` array.