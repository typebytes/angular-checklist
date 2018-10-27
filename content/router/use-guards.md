---
title: restricted parts are protected by guards
---
# Problem

Users should not be able to access pages that they don't have access to. We could hide the menu item so they could not navigate to it by clicking on it but this means they can still manually type in the url to go to that page. We need some way to protect certain routes.

# Solution

We can use guards to allow or disallow route changes. Every part of your application that should be limited to users with certain roles should be protected with guards.

We can create a guard by creating a service that implements the `canActivate` interface to avoid users going to a certain component or a `canLoad` interface to avoid entire modules to be loaded.

In the next example, we use a `canActivate` guard.

```ts
@Injectable()
export class UserHasRoleGuard implements CanActivate {

  constructor(private activatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return an Observable<boolean> | Promise<boolean> | boolean;
  }
}

```

We can use it in our route definitions like this:

```ts
[
  ...,
  { path: 'users', component: 'NotFoundComponent', canActivate: [UserHasRoleGuard] },
]
```

You can see that the `canActivate` property takes an array. This means we can add multiple guards which will be called one after the other.
