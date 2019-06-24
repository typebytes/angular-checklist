---
title: release resources in ngOnDestroy
---

## Problem

When creating Angular components, we need to use resources to get user input, fetch data from the backend, create animations, etc. The way we do this varies. We could use Observables, browser APIs, event listeners or other means. When using resources, we also need to release those resources when they are no longer required. If we do **not** do this, we might introduce memory leaks which will make our application crash and introduce other unwanted behavior.

## Solution

For every component and directive, Angular offers lifecycle hooks that provide visibility into key life moments of a component, such as creation, rendering, or when data-bound properties have changed.

In order to release our resources, we can hook into the `ngOnDestroy` lifecyle of a component. This hook is called **before** a component is destroyed and removed from the DOM.

In the following example, we set up a function to be executed every 5000ms using the `setInterval` API. Inside `ngOnDestroy`, we clear the interval and release the resource.

```ts
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  intervalId;

  ngOnInit() {
    this.intervalId = setInterval(() => {...}, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
```
