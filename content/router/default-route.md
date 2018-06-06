---
title: Default route
---
# Defining a default route

Every application should define a default route. This is the route that will be used whenever the user goes to '/'.

```ts
[
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  ...
]
```
 Note that `pathMatch: full` should be used to make sure that this route definitions is only triggered when the user is going to '/'.
