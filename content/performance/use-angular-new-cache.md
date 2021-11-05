---
title: use Angular new cache
---

**This only applies to Angular v13**

From [Angular v13 is now available](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296) official Angular Blog post:
> The valuable feedback from [[RFC] Persistent build cache by default](https://github.com/angular/angular-cli/issues/21545) led to this tooling update that results in up to 68% improvement in build speed and more ergonomic options.

New projects using Angular CLI v13 have cache already enabled by default but, if you're updating your app from previous versions, you need to add the following to you `angular.json` file:

```json
{
    "$schema": "...",
    "cli": {
        "cache": {
            "enabled": true,
            "path": ".cache",
            "environment": "all"
        }
    }
    ...
}
```

# Resources

- [Angular Cache](https://angular.io/cli/cache) - Official documentation for `Angular Cache`
