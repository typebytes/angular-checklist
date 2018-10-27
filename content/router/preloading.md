---
title: Preloading Strategy
---
# Problem

When we leverage lazy loading, we are only loading the code that is needed for the first page render. Modules that are not yet needed are not loaded. 

By default, the next modules will be loaded whenever the user requests them. This is not ideal in every scenario as it means that whenever the user requests a url, he has to start a new waiting period for the module to be loaded and parsed.

# Solution

Depending on the application you are building and whether you have to deal with low bandwidth, it might be better to use a different strategy than only loading when the user requests it. 

When working on an application that will be used only on a steady WiFi connection, it makes sense to preload all of the modules. When your application will be used mainly on slow 3G connections, you should only load the modules that are most likely used.

## Load all modules after first page render

One strategy provided by the Angular team is to preload all the modules. This means that, after the first page render, the modules will all be loaded in the background.

```ts
@NgModule({
  imports: [
    ...modules,
    // Existing Preloading Strategy
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  ...
})
export class AppModule {}
```

## Defining a custom preloading strategy 

If our users can both be on mobile and on wifi, it might make sense to only preload the modules if they are on wifi. To do this, we can implement a custom preloading strategy and use it.

To do this, we need to implement the `PreloadingStrategy` interface.

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
