---
title: Minimum logic in templates
---
# Minimise the logic in templates

Avoid putting to much logic in your templates. Code in your template cannot be easily tested with unit tests. Keep them as slim as possible.

Instead of:

```ts
@Component({
  template: `<div *ngIf="users && users.length > 1 && visible">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;
}
```

Try and write:

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

The `usersExistsAndVisible` is extremely easy to unit test.
