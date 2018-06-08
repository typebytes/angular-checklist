---
title: Define types at the non typed boundaries
---
# Define types at the non typed boundaries of your app

All our Javascript code is written in Typescript. This means that we can leverage types. This code however interacts with different non typed boundaries such as the html layer (think of events) and backend requests. On the boundaries of these interactions, we must always define types to leverage the full power of Typescript.

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
