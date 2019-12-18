---
title: use modules to define features
author:
  name: Billy Lando
  url: https://github.com/billyjov
---

# Problem

As an app scales, the root module starts growing and declaring a vast number of components increases the start time as well as affects the application's performance. Additionally, the more components we add to the root module, the harder it gets to understand the application's structure, and therefore making it hard to maintain.

# Solution

Using an `NgModule` to define features in Angular allows lazy loading, isolation and portability of this features. The purpose of feature modules is to organize relevant code into cohesive blocks. This helps to apply clear boundaries between features or application domains.

Another benefit of `NgModules` is that they allow us to lazy load each feature module in order to boost the performance of our app, especially time to **first meaningful paint** (FMP). Furthermore, feature encapsulation using modules allow us to replace each module without (or with small changes) affecting other modules.

Here's an example:

```ts

@Component({ ... })
export class AddPeopleComponent implements OnInit {
  ...
}

@Component({...})
export class ListPeopleComponent implements OnInit {
  ...
}

@NgModule({
  ...
  imports: []
  declarations: [
    AddPeopleComponent,
    ListPeopleComponent
    // other components
  ],
  ...
})
export class AppModule {}
```

The above can be refactored to:

```ts

@Component({ ... })
export class AddPeopleComponent implements OnInit {
  ...
}

@Component({ ... })
export class ListPeopleComponent implements OnInit {
  ...
}

// introduce a new feature module
@NgModule({
  imports: [
    CommonModule
  ]
  declarations: [
    AddPeopleComponent,
    ListPeopleComponent
  ]
})
export class PeopleModule {}


@NgModule({
  ...
  imports: [
    // import our new feature module
    PeopleModule
  ]
  declarations: [
    // other components
  ],
  ...
})
export class AppModule {}
```

Alternatively, we can use lazy loading as described [here](/default/checklist/router/Z165VzV).

## What if something needs to be reused elsewhere?

In this case, using a `SharedModule` helps to organize reusable parts into its own module. We can put commonly used directives, pipes, and components into one module and then import the `SharedModule` wherever we need it in other parts of our application.
But we aware of possibly multiple service instances. For more information check [this item](/default/checklist/architecture/Z1ohpIo).

# Resources

- [Avoiding common confusions with modules in Angular](https://blog.angularindepth.com/avoiding-common-confusions-with-modules-in-angular-ada070e6891f) by Max Koretskyi
- [Module vs Module](https://www.youtube.com/watch?v=ntJ-P-Cvo7o) by Deborah Kurata
- [Angular documentation for Feature Modules](https://angular.io/guide/feature-modules)
