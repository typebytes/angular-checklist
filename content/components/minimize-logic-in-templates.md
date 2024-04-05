---
title: minimize logic in templates
---

# Problem

When we put too much logic in our templates, we are making our applications more difficult to test. The fastest way to write and execute tests is to use simple unit tests. Of course we could also test a component's template with a unit test but that increases the complexity and introduces some challenges we have to deal with.

In addition, too much logic inside the template makes them less readable. We cannot take a quick glance at the template and quickly understand what's going on.

For example here, we have have an `@if` that has too much logic.

```ts
@Component({
  template: `
    @if(users().length && !users().some(user => user.criteriaMet)) {
      <p>No items meet the criteria.</p>
    }
  `,
})
export class SomeComponent {
  users: signal<User[]>([]);
}
```

# Solution

Let's refactor this by extracting the logic into the component's class. This will make the template more readable and the logic easier to test.  
To do so, we use `computed`, introduced in Angular 16, to create a computed property that will be used in the template.

```ts
@Component({
  template: `
    @if(noCriteriaMet()) {
      <p>No items meet the criteria.</p>
    }
  `,
})
export class SomeComponent {
  users: signal<User[]>([]);
  
  noCriteriaMet = computed(() => this.users().length && !this.users().some(user => user.criteriaMet));
}
```

### Best Practices

Be careful when the `ChangeDetectionStrategy` is set to `Default`, as it'd cause the functions bound in the template to be called each time the `Change Detection Cycle` runs.  
You can optimize this by turning on the `OnPush` change detection strategy and leverage the `async` pipe in combination with `Observables` that return the desired value.
