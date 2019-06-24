---
title: protect restricted pages with guards
---

# Problem

Users should not be able to access pages that they don't have access to. We could hide the menu item so they could not navigate to it by clicking on that menu item but this means they can still manually type in the url to go to that page. We need some way to protect certain routes.

# Solution

We can use guards to allow or deny route changes. Every part of your application that should be limited to users with certain roles should be protected with guards.

We can create a guard by creating a service that implements the `CanActivate` interface to avoid users going to a certain component or a `canLoad` interface to avoid entire modules to be loaded.

The following example shows how to use a `canActivate` guard.

```ts
@Injectable()
export class UserHasRoleGuard implements CanActivate {
  constructor(private activatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return an Observable<boolean> | Promise<boolean> | boolean;
  }
}
```

We can now use it in our route definitions:

```ts
[
  ...,
  { path: 'users', component: UsersComponent, canActivate: [UserHasRoleGuard] },
]
```

You can see that the `canActivate` property on the route definition takes an array. This means we can add multiple guards which will be called chronologically in the order they are defined.
