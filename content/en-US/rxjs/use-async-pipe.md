---
title: use the async pipe
---

# Problem

In Angular, everything async is handled by Observables and they are triggered by subscribing to them. Whenever we do so, it is very important to also unsubscribe. Unsubscribing will clean up the resources being used by this stream. If we neglect to do this, we might introduce memory leaks.

If we manually subscribe, it also means that we have to manually unsubscribe. This is something that is easily forgotten.

# Solution

Instead of manually subscribing, we can use the `async` pipe provided by Angular.

The async pipe will:

- subscribe to an Observable
- unsubscribe from the Observable when the component is destroyed by hooking into the `onDestroy` hook
- mark this component as "to be checked" for the next change detection cycle

Using the `async` pipe as much as possible will make sure all the resources are cleaned up properly and reduce the likelihood of memory leaks.

Here's an example:

```ts
@Component({
  template: `{{data$ | async}}`,
  ...
})
export class SomeComponent {
  data$ = interval(1000);
}
```

Here, we set up an `interval` that emits a value every second. This is a long-living Observable and because we are using the `async` pipe, the resource (subscription) is cleaned up when the component is destroyed.

# Resources

[Three things you didn't know about the async pipe](https://blog.thoughtram.io/angular/2017/02/27/three-things-you-didnt-know-about-the-async-pipe.html) by Christoph Burgdorf
