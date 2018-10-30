---
title: define types at the non-typed boundaries
---

# Problem

All our JavaScript code is written in TypeScript. This means that we can leverage types. However, our codes interacts with different non-typed boundaries such as the HTML layer (think of events) and backend requests. Interacting with these boundaries influences the type safety of our code.

# Solution

When interacting with these boundaries, it is important to add type information so TypeScript knows the structure of the objects we are dealing with. By providing the type right at the boundary, TypeScript is able to infer it everywhere else where that variable is being used.

For example when working with custom events:

```ts
@Component({
  template: `<some-other-component (someEvent)="someEventHandler($event)"></some-other-component>`
})
export class SomeComponent {
  someEventHandler(event: TypeForThisEvent) {
    ...
  }
}
```

`TypeForThisEvent` will make sure that the non-typed HTML event is typed inside of our TypeScript code.
