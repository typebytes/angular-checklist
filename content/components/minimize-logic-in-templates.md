---
title: minimize logic in templates
---

# Problem

When we put too much logic in our templates, we are making our applications more difficult to test. The fastest way to write and execute tests is to use simple unit tests. Of course we could also test a component's template with a unit test but that increases the complexity and introduces some challenges we have to deal with.

In addition, too much logic inside the template makes them less readable. We cannot take a quick glance at the template and quickly understand what's going on.

# Solution

Try to avoid putting too much logic in your templates.

For example here, we have have an `*ngIf` that has too much logic.

```ts
@Component({
  template: `<div *ngIf="users && users.length > 1 && visible">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;
}
```

We can refactor this by extracting the logic into the component's class. This will make the template more readable and the logic easier to test.

```ts
@Component({
  template: `<div *ngIf="usersExistsAndVisible()">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;

  usersExistsAndVisible() {
    return this.users && this.users.length > 1 && this.visible;
  }
}
```
