---
title: 404 Route
---
# Defining a 404 route

Every application should define a 404 route. This is a route to be shown whenever the user tries to go to an non existing route.

```ts
[
  ...,
  { path: '**', redirectTo: '/not-found', component: 'NotFoundComponent' },
]
```

 This route definition uses a wildcard as a path. Since the Angular router will render the first definitions that matches, be sure to always put this route definition last!
