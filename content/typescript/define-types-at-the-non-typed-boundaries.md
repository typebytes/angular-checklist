---
title: Define types at the non typed boundaries
---

# Problem

All our Javascript code is written in Typescript. This means that we can leverage types. Our code however interacts with different non typed boundaries such as the html layer (think of events) and backend requests. Interacting with these boundaries influences the type safety of our code.

# Solution

When interacting with these boundaries, it is important to add the types so Typescript knows the structure of the object. By providing the type at the boundary, Typescript is able to infer it everywhere else that variable is being used.

For example when working with custom events:

```ts
@Component({
  template: `<some-other-component (someEvent)="someEventHandler($event)"></some-other-component>`
})
export class SomeComponent {
  someEventHandler(event: TypeForThisEvent) {
    // ...
  }
}
```

`TypeForThisEvent` will make sure that the non typed html event is typed inside of our Typescript code.
