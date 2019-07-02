---
title: make sure default route is defined
---

# Problem

When users type in the url for your application, they do not know all the routes of our application. We need to make sure that we always have a landing page or a redirect set up.

# Solution

Every application should define a default route. This is the route that will be used whenever the user goes to `/`.

```ts
[
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  ...
]
```

Note that `pathMatch: full` should be used to make sure that this route definitions is only triggered when the user is going to `/`.
