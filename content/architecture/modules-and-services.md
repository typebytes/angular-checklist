---
title: Modules and Services
---
# Providing services only at the root level

In Angular we have the possibility to take advantage of the injector tree to provide different service instances on different levels, e.g. component, directive or module. Whilst this can be exactly what you want, in most cases it is not the expected behavior.

When you are creating a `SharedModule`, you want to use the components everywhere but only provide the services in your root module, e.g. `AppModule`. You can accomplish this by leveraging the `forRoot` convention. Your `SharedModule` would then like this:

```ts
@NgModule({
  imports: [...modules],
  declarations: [...declarations],
  exports: [...declarations]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...services]
    };
  }
}
```

Note that the actual module definion **does not** contain any providers.

In your `AppModule`, you could use this module as follows:

```ts
@NgModule({
  imports: [
    ...modules,
    SharedModule.forRoot()
  ],
  ...
})
export class AppModule {}
```

By calling the static `forRoot` method on the `SharedModule` you will import the entire module **including** its providers.

In a feature module you would simply import the `SharedModule` **without** calling `forRoot`:

```ts
@NgModule({
  imports: [
    ...modules,
    SharedModule
  ],
  ...
})
export class SomeFeature {}
```

The fact that each component has its own Injector that is inherited from its parent Injector, allows us to ask for services provided at a root level. Hence, we have access to all the components, pipes, etc. provided by the `SharedModule` without creating multiple instances of its services.

# Additional Resources

* [Dependency Injection in Angular](https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html) by Pascal Precht
* [Bypassing Providers in Angular](https://blog.thoughtram.io/angular/2016/09/14/bypassing-providers-in-angular-2.html) by Pascal Precht
* [Avoiding common confusions with modules in Angular](https://blog.angularindepth.com/avoiding-common-confusions-with-modules-in-angular-ada070e6891f) by Maxim Koretskyi