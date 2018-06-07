---
title: Lazy Loading
---
# Lazy load feature modules

Angular is using a modular architecture. This allows us to split the application into different modules. When using the Angular CLI, it becomes really easy to lazy load these modules via our route definitions.

```ts
[
  { path: '/heroes', loadChildren: 'app/heroes/heroes.module#HeroesModule' },
  ...
]
```

Lazy loading will make the initial page load faster and makes sure only code that is actually needed is loaded up front. Everything else is loaded when it's needed.
