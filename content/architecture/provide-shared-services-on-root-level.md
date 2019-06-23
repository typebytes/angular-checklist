---
title: provide shared services only on root level
---

# Problem

Due to the way DI (Dependency Injection) in Angular is implemented, with an injector tree, we can provide instances of our service on multiple levels, e.g. component, directive or module. While this is a useful feature, this is not always what we want.

Working with a shared module is quite common and recommended. This module can be used to share services, components, directives, pipes, etc. between different feature modules. If we import our shared module in multiple modules, we will provide the service multiple times and multiple instances will be created. Our services are no longer singletons.

# Solution

When creating a `SharedModule`, we want to import the components in all feature modules but only provide the services in our root module, for instance `AppModule`. We can accomplish this by leveraging the `forRoot` convention. Here's what our `SharedModule` would look like this:

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

Note that the actual module definition **does not** contain any providers.

In our `AppModule`, we could use this module as follows:

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

By calling the static `forRoot` method on the `SharedModule` we import the entire module **including** its providers.

In a feature module we would simply import the `SharedModule` **without** calling `forRoot`:

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

The fact that each component has its own injector that inherits from its parent injector, allows us to ask for services provided on a root level. Therefore, we have access to all components, pipes, etc. provided by the `SharedModule` without creating multiple instances of its services.

# Additional Resources

- [Dependency Injection in Angular](https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html) by Pascal Precht
- [Bypassing Providers in Angular](https://blog.thoughtram.io/angular/2016/09/14/bypassing-providers-in-angular-2.html) by Pascal Precht
- [Avoiding common confusions with modules in Angular](https://blog.angularindepth.com/avoiding-common-confusions-with-modules-in-angular-ada070e6891f) by Maxim Koretskyi
