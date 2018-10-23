---
title: minimum logic in templates
---

## Problem

When we put too much logic in our templates, we are making our applications more difficult to test. The fastest way to write and execute tests is by using simple unit tests. But, templates are not testable with plain unit tests.
It can also make our template less readable.

## Solution 	

Avoid putting to much logic in your templates.

For example here, we have have an `ngIf` that has too much logic.
```ts
@Component({
  template: `<div *ngIf="users && users.length > 1 && visible">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;
}
```

We can refactor this by putting the logic inside our component's class. This will make our template more readable and this logic easier to test.

```ts
@Component({
  template: `<div *ngIf="usersExistsAndVisible()">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;
  
  usersExistsAndVisible() {
    return users && users.length > 1 && visible;
  }
}
```

