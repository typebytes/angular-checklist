---
title: use switchMap only when you need cancellation
---

# Problem

In certain scenarios, using the wrong flattening operators from RxJS can result in unwanted behavior and race conditions.

# Solution

For example, in an e-commerce application users can add and remove items from their shopping cart. The logic for removing an item could look like this:

```ts
removeItemButtonClick.pipe(
  switchMap(item => this.backend.removeFromCart(item.id))
)
```

Whenever the user clicks on the button to remove a certain item from the shopping cart, this action is forwarded to the application's backend. Most of the times this works as expected. However, the behavior depends on how rapidly items are removed from the cart. For example, either all items could be removed, or only some of them.

In this example, `switchMap` is not the right operator because for every new action it will abort / cancel the previous action. This behavior makes `switchMap` unsafe for create, update and delete actions.

There are several other flattening operators that may be more appropriate:

- `mergeMap`: concurrently handle all emissions
- `concatMap`: handle emissions one after the other
- `exhaustMap`: when you want to cancel new emissions while processing a previous emission

So we could fix the problem from above by `mergeMap`:

```ts
removeItemButtonClick.pipe(
  mergeMap(item => this.backend.removeFromCart(item.id))
)
```

If the order is important we could use `concatMap`.

For more information see the article from [Nicholas Jamieson](https://twitter.com/ncjamieson) listed below.

# Resources

- [RxJS: Avoiding switchMap-Related Bugs](https://blog.angularindepth.com/switchmap-bugs-b6de69155524) by Nicholas Jamieson
