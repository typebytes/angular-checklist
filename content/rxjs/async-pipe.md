---
title: Async pipe
---
# Use the async pipe 

Observables are the async paradigm used in Angular applications. We can 'start' Observables by subscribing to them. Whenever we do so, it is very important to also unsubscribe. Unsubscribing will clean up the resources being used by this stream. Otherwise, this might introduce memory leaks. 

The async pipe will: 
- subscribe to an Observable
- unsubscribe from the Observable when it is destroyed
- mark this component for the next change detection cycle

Using the async pipe as much as possible will make sure all the resources are cleaned up.

#### Using the async pipe

```ts
@Component({
  template: `{{data$ | async}}`,
  ...
})
export class SomeComponent {
  data$ = interval(1000);
}
```
