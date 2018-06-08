---
title: clean up resources in ngOnDestroy
---
# Clean up the resource in `ngOnDestroy`

The `onDestroy` lifecycle hook gets called whenever the component gets destroyed. This makes it the ideal place to clean up resources.

For example:
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
