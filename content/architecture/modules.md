---
title: Modules and Services
---
### Providing the services only at the root level

Every time a service is provided at a different level (component, module), an instance will be created when something inside that module or that component asks for an instance of it. Whilst this can be what you want, it is in most cases not the expected behaviour.

When you are creating a `SharedModule`, you want to use the components everywhere but only provide the services at the `AppModule` level. You can accomplish this by defining your `SharedModule` like this:

```ts
@NgModule({
  imports: [...modules],
  declarations: [...declarations],
  exports: [...declarations]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [...services]
    };
  }
```

In your `AppModule`, you could use this module like this:

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

Thus, also providing the `providers` section.

In a feature module where the services are not required, you could use the `SharedModule` like this:

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

Thus, having access to all the components, pipes, ... provided by the `SharedModule` without creating multiple instances of a service.
