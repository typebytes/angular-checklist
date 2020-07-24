---
title: add 404 fallback route
---

# Problem

There are multiple reasons why we need to make sure that we have a fallback for when a page is not found.

- Our users are humans. Humans are quite error-prone. This means that they are likely to mistype a url at some point.
- Over time, our applications will change. Users might bookmark urls for pages which are not supported anymore.

# Solution

Every application should define a 404 route. This is a route to be shown whenever the user tries to go to a non existing route.

```ts
[
  ...,
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
]
```

The last route definition uses a wildcard as a path. Since the Angular router will render the first definitions that matches, be sure to always put this route definition last!
