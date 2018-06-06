---
title: Preloading strategy
---
# Define a preloading strategy

When using lazy loading, it is interesting to define a preloading strategy. This strategy will define when modules, that are not yet requested, should be loaded. 

Depending on the application you are building and with what type of internet connection it will be used, a different strategy should be used. 
When working on an application that will be used only on a steady wifi connection, it makes sense to preload all of the modules. When your application will be used mainly on slow 3G connections, you should only load the most likely to be used modules.

#### Defining a custom preload strategy

```ts
export class AppPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
       // implement your strategy here
    } 
}
```

#### Define the strategy to be used

```ts
// Existing 
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
// Custom
RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy })
```
 
