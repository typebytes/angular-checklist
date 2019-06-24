---
title: use ngIfAs to subscribe only once
---

# Problem

An Observable is lazy and unicast by default. This means that for every subscription, the Observable is executed. If the Observable is triggering a backend call when subscribed to, the following code will trigger two backend calls.

```ts
@Component({
  <some-component data="data$ | async"></some-component>
  <some-other-component data="data$ | async"></some-component>
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  ...
}
```

This is not the intended behavior. We want to fetch the data only once.

# Solution

We can fix this problem in multiple ways, either with the `ngIfAs` syntax, or by making our Observable hot.

## ngIfAs syntax

We can use an `*ngIf` to hide an element. We can also leverage it to _unpack_ an observable and bind the value to a variable. We can then use that variable inside of the template.

```ts
@Component({
  <div *ngIf="data$ | async as data">
    <some-component data="data"></some-component>
    <some-other-component data="data"></some-component>
  </div>
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  ...
}
```

By wrapping the components with a div that hides the element if no data is present, we were able to reduce the number of subscriptions from 2 to 1. This means that we only have a single subscription. Using the `as` syntax, we can also _catch_ the event from that observable and bind it to a variable and use that variable to pass it to our components.

Better yet, if we don't want to introduce another level of nesting, we can use the `<ng-container>` element. This elements lets us group sibling elements under an invisible container element that is not rendered.

Here's what the code from above looks like using `<ng-container>`:

```ts
@Component({
  <ng-container *ngIf="data$ | async as data">
    <some-component data="data"></some-component>
    <some-other-component data="data"></some-component>
  </ng-container>
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  ...
}
```

Now, the template will be rendered as:

```html
<some-component data="data"></some-component>
<some-other-component data="data"></some-component>
```

## Make the Observable hot

We can also make our Observable hot so that the Observable will no longer trigger a backend call with every subscription. A hot Observable will share the underlying subscription so the source Observable is only executed once.

This fixes our problem because it means it doesn't matter anymore if we have multiple subscriptions.

To do this, we can use for example the `shareReplay` operator.

```ts
@Component({
  <some-component data="sharedData$ | async"></some-component>
  <some-other-component data="sharedData$ | async"></some-component>
})
export class SomeComponent implements OnInit, OnDestroy {
  sharedData$ = data$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
  ...
}
```

> Note: we should specify `refCount: true` to prevent possible memory leaks.

# Resources

- [Multicasting operators in RxJS](https://blog.strongbrew.io/multicasting-operators-in-rxjs/) by Kwinten Pisman
