---
title: feature modules are lazy loaded
---
# Problem

When working with SPAs, we need to ship an entire applicaton to the client. The more bytes we need to ship, the slower it will be to load but also to parse. This will greatly influence the TTI (Time to interactive) of our application. 

We are shipping way too much javascript to the client.

# Solution

Angular provides us with a module system. When we break up our application in feature modules, we can leverage this to only load the modules that are needed for the first page render. The other modules can be loaded only when they are needed. We can do this, when the user requests them or via a more sophisticated preloading strategy. 

The following module is **not** using lazy loading to load the `UsersModule`.

```ts
// app.routing.ts
const routes: Routes = [
  ...
  {path: 'users', component: UsersComponent}
  ...
];

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    UsersModule, 
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

This means that the `UsersModule` will be bundled in the main bundle. The main bundle contains all the code that is needed for the first page load. As the `UsersModule` is only needed when the users specifically goes to the `/users` page, it doesn't make sense to load it at the first page load. We can leverage lazy loading to fix this.


```ts
// app.routing.ts
const routes: Routes = [
  ...
  {path: 'users', loadChildren: '../users/usersModule#UserModule'}
  ...
];

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    UsersModule, 
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

We updated the `/users` route to leverage the `loadChildren` property. This points to the module file of the `UsersModule` and always has a fixed format: `${pathToModule}${nameOfTheModule}`. 

By changing this, the `UsersModule` will be packaged in its own bundle and will only be loaded when the users navigates to the `/users` endpoint.


# Resources

[The cost of javascript](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) by Addy Osmani.

