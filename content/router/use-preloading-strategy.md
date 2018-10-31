---
title: use preloading strategy
---

# Problem

When we use lazy loading, we are only loading the code that is needed for the first page render. Modules that are not yet needed are not loaded.

By default, the next modules will be loaded whenever the user requests them. This is not ideal in every scenario because it means that whenever a user requests a url, they have to wait until the module is loaded and parsed.

# Solution

Depending on the application you are building and whether you have to deal with low bandwidth, it might be better to use a different strategy other than loading modules on request.

When working on an application that will be used only on a steady WiFi connection, it makes sense to preload all of the modules when the CPU is idle. If our application will be used mainly on a slow 3G connection, we should only load the modules that are most likely used.

## Load all modules after first page render

One strategy provided by the Angular team is to preload all modules when the CPU becomes idle. This means that, after the first page render, the modules will all be loaded in the background.

```ts
@NgModule({
  imports: [
    ...modules,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  ...
})
export class AppModule {}
```

## Defining a custom preloading strategy

If our users can be both on mobile and on WiFi, it might make sense to only preload the modules if they are on WiFi. To do this, we can implement a custom preloading strategy.

A custom preloading strategy is implemented as a class and implements the `PreloadingStrategy` interface.

```ts
// custom.preloading-strategy.ts
export class MyCustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    // Implement your strategy here
  }
}

// app.module.ts
@NgModule({
  imports: [
    ...modules,
    // Custom Preloading Strategy
    RouterModule.forRoot(routes, { preloadingStrategy: MyCustomPreloadingStrategy });
  ],
  ...
})
export class AppModule {}
```

## Data-driven bundling

Another way is to use [Guess.js](https://github.com/guess-js/guess), a data-driven bundling approach. The goal with Guess.js is to minimize the bundle layout configuration, make it data-driven, and much more accurate. Guess.js will will figure out which bundles to be combined together and what pre-fetching mechanism to be used.

Guess.js can also be used with the Angular CLI. Here's an [example](https://github.com/mgechev/guess-js-angular-demo).

# Resources

- [Angular Router: Preloading Modules](https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb) by Victor Savkin
- [Introducing Guess.js - a toolkit for enabling data-driven user-experiences on the Web](https://blog.mgechev.com/2018/05/09/introducing-guess-js-data-driven-user-experiences-web/) by Minko Gechev
