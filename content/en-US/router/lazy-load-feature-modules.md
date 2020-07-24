---
title: lazy load feature modules
---

# Problem

When working with SPAs, we need to ship an entire application to the client. The more bytes we need to ship, the slower it will be to load but also to parse. This will greatly influence the TTI (Time to Interactive) of our application.

We are shipping way too much JavaScript to the client.

# Solution

Angular provides us with a module system. When we break up our application in feature modules, we can leverage this to only load the modules that are needed for the first page render. The other modules can be lazily loaded only when they are needed. We can do this, when the user requests them or via a more sophisticated preloading strategy.

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

This means that the `UsersModule` will be added to the main bundle. The main bundle contains all the code that is needed for the first page load. As the `UsersModule` is only needed when the user specifically navigates to the `/users` page, it doesn't make sense to load it up front. Let's leverage lazy loading to fix this.

```ts
// app.routing.ts
const routes: Routes = [
  ...
  {
    path: 'users',
    loadChildren: () => import('../users/usersModule').then(m => m.UsersModule)
  }
  ...
];

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

We updated the `/users` route to use the `loadChildren` property. This uses the standard dynamic import syntax.
Called as a function, the import returns a promise which loads the module.

Also note that we no longer add the `UsersModule` to the imports of the `AppModule`. This is important because otherwise lazy loading wouldn't work as expected. If the `UsersModule` was referenced by the `AppModule` the code for that module would be added to the main bundle.

By using `loadChildren` and removing the module import from the `AppModule`, the `UsersModule` will be packaged in its own bundle and will only be loaded when the user navigates to `/users`.


# Resources

[The cost of JavaScript](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) by Addy Osmani
