---
title: Preloading Strategy
---
# Define a preloading strategy

When using lazy loading, it may be interesting to define a preloading strategy. This strategy will define when modules, that are not yet requested, should be loaded.

Depending on the application you are building and whether you have to deal with low bandwidth, a different strategy may be applied. When working on an application that will be used only on a steady WiFi connection, it makes sense to preload all of the modules. When your application will be used mainly on slow 3G connections, you should only load the modules that are most likely used.

# Defining a custom preload strategy

```ts
export class MyCustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    // Implement your strategy here
  }
}
```

# Use preloading strategy

```ts
@NgModule({
  imports: [
    ...modules,
    // Existing Preloading Strategy
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

    // Custom Preloading Strategy
    RouterModule.forRoot(routes, { preloadingStrategy: MyCustomPreloadingStrategy });
  ],
  ...
})
export class AppModule {}
```
