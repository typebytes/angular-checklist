---
title: Provide shared services only at root module
---
# Problem

Due to the way DI in Angular is implemented, with an injector tree, we can provide instances of our service at multiple levels, e.g. component, directive or module. While we can use this feature, it's not always what we want.

Working with a shared module is a common and recommended way of working. This module can be used to share services, components, directives, pipes, ... between different feature modules. If we import our shared module in multiple modules, we will provide the service multiple times and multiple instances will be generated, and we would like to avoid that here.

# Solution

When we are creating our `SharedModule`, we only want to use the components everywhere but only provide the services in our root module, e.g. `AppModule`. We can accomplish this by leveraging the `forRoot` convention. In that scenario, our `SharedModule` would look like this:

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