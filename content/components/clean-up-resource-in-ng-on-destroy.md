---
title: release resources in ngOnDestroy
---
## Problem

When creating Angular components, we need to use resources to get user input, fetch data from the backend, create animations, ... The way we can do this can vary. We could use Observables, browser APIs, event listeners and much more. When using resources, we also need to release those resources when they are no longer required. 
If we do **not** do this, than we will introduce memory leaks which will make our application crash and introduce other unwanted behavior.

## Solution

We can hook into the lifecyle of our component to known when to release the resources that we used. Whenever Angular is going to destroy our component, it will call the `onDestroy` lifecycle hook. 

In the following example, we set up a function to be executed every 5000ms using the `setTimeout` API. In the `ngOnDestroy` hook, we unregister the interval and release the resources.

```ts 
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  timeoutId;
  
  ngOnInit() {
    this.intervalId = setTimeout(() => {...}, 5000); 
  }
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
```
