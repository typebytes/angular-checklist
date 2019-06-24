---
title: use onPush CD strategy on dumb components
---

# Problem

Change detection (CD) in Angular is performed from top to bottom. This means that everything is only checked once. This is a huge difference compared to AngularJS where change detection was performed in cycles until everything was considered stable.

However, it still means that everything is checked every time CD is triggered, even things that we know for sure have not changed.

# Solution

Angular components can use different strategies for change detection. They can either use `Default` or `OnPush`.

The default strategy means that the component will be checked during every CD cycle.

With the `OnPush` strategy, the component (and all of its children!) will only be checked if one of its `@Input`s have changed (reference check) **or** if an event was triggered within the component.

This means that we can easily tell Angular to not run CD for huge parts of our component tree, speeding up CD a lot! We can enable the `OnPush` strategy like this:

```ts
@Component({
  ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

**Note 1:** This also implies that we should always try to work immutable. Let's say that we add an element to an array by mutating the array and we pass the array to a component to visualise it. If we apply the `OnPush` strategy for this component, we wouldn't see the changes in the UI. Angular will not check if the array's content has changed. It will only check the reference. As the reference has not changed, it means that CD will not run for that component and the view will not be updated.

**Note 2:** This also means that, every component we apply this strategy to, has to be dumb. If the component fetches its own data, we cannot have the `OnPush` strategy. Because in that case, the component's `@Input`s wouldn't be the only reason to run CD, but also data being fetched.

**Note 3:** When using the `async` pipe, it will automatically call `markForCheck` under the hood. This marks the path to that component as "to be checked". When the next CD cycle kicks in, the path to that component is not disabled and the view will be updated.

# Resources

- [Angular change detection explained](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html) by Pascal Precht
- [Everything you need to know about change detection in Angular](https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f) by Maxim Koretskyi
