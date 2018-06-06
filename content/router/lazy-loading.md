---
title: Lazy loading
---
# Lazy loading modules

Angular is using a modular architecture. This allows us to split the application into different modules. When using the Angular CLI, it becomes really easy to lazy load these modules via our route definitions.

```ts
[
  { path: '/heroes', loadChildren: 'app/heroes/heroes.module#HeroesModule' },
  ...
]
```
 
Using lazy loading will make the initial load of our applications faster and will make sure only code that is actually needed is loaded.
