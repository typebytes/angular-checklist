---
title: Not everything is in the store
---
# Not everything is in the store

NgRx/Store (or Redux in general) provides us with a lot of great features and can be used in a lot of use cases. In some cases however, this pattern can be overkill and should be avoided. As a general rule of thumb, the following listing will help you to know when it helps to put data into the store.

- When data is shared between components that are in totally different places in the component tree. By putting this data into the store, it is easier to consume this data in those components.
- State that needs to be hydrated between page reloads. If you want your component to look the same way as it did before it was destroyed.
- State that can be updated from multiple places. Let's say you have a list of users which can be updated through crud operations. In that case it is easier to manage this by putting this data into the store.

This is a non exhausitve listing and there will always be exceptions to the rule. In most cases however, keeping to data that complies with one or more points in this list, is a good idea.

In the following cases, using Redux might NOT be the best idea.

- When caching data from a backend call. If you want to cache data coming from a backend call, you can easily accomplish this by keeping a reference to the `Observable` from the `HttpClient` and adding a `shareReplay(1)` operator to it. This operator will cache the underlying result of the backend call and return it to every subsequent subscriber without re-executing it.
- When state is only needed for the lifecyle of the component. In cases where the data is added to the store, just to be removed on the `ngOnDestroy` lifecycle hook, it doens't have any benefits.
