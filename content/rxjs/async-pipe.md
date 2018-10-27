---
title: Async pipe
---
# Problem

In Angular, everything async is handled by Observables. An Observable can be triggered by subscribing. Whenever we do so, it is very important to also unsubscribe. Unsubscribing will clean up the resources being used by this stream. Otherwise, this might introduce memory leaks.

If we manually subscribe, it also means that we manually have to unsubscribe. This is something that is easily forgotten.

# Solution

Instead of manually subscribing, we can use the async pipe provided by Angular.

The async pipe will: 
- subscribe to an Observable
- unsubscribe from the Observable when it is destroyed
- mark this component for the next change detection cycle

Using the async pipe as much as possible will make sure all the resources are cleaned up.

For example:

```ts
@Component({
  template: `{{data$ | async}}`,
  ...
})
export class SomeComponent {
  data$ = interval(1000);
}
```
# Resources

[Three things you didn't know about the async pipe](https://blog.thoughtram.io/angular/2017/02/27/three-things-you-didnt-know-about-the-async-pipe.html) by Christoph Burgdorf