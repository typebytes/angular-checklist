---
title: use onPush CD strategy on dumb components
---

# Problem 

Change detection (CD) in Angular is performed from top to bottom. This means that everything is only checked once. This is a huge difference compared to angular.js where change detection was performend in cycles till everything was considered stable. 

But, it still means that everything is checked everytime CD is triggered, even things that we know for sure have not changed.

# Solution

Angular components can use different strategies for change detection. They can either use 'default' or 'onPush'. 

The default strategy means that the component will be checked during every CD cycle. 

With the 'onPush' strategy, the component (and all of its children!) will only be checked if the `@Input`s of that component have changed reference. This means that we can easily tell Angular to not run CD for huge parts of our component tree, speeding up CD a lot!

We can enable the 'onPush' strategy like this:

```ts
@Component({
  ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

**Note:** This also implies that we should always try to work immutable. Let's say that we add an element to an array by mutating the array and we pass the array to a component to visualise it. If we apply the 'onPush' strategy for this component, we wouldn't see the changes. Angular will not check if the array's content has changed. It will only check the reference. As the reference has not changed, it means that CD will not run for that component and the view will not be updated!

**Note2:** This also means that, every component we apply this strategy to, has to be dumb. If the component fetches its own data, we cannot have the 'onPush' strategy. Because in that case, the `@Input`s changing wouldn't be the only reason to run CD, but also data being fetched.


# Resources 

* [Angular change detection explained](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html) by Pascal Precht
