---
title: use persistent disk cache
---

## Problem

The build process for large Angular applications can take some time to complete, and having to rebuild the application frequently will increase the time you spend waiting for it to finish.

## Solution

**This only applies to Angular v13+**

Use the new persistent build cache. This results in up to 68% improvement in build speed and more ergonomic options.

New projects using Angular CLI v13+ have the persistent disk cache already enabled by default but, if you're updating your app from previous versions, you need to add the following to you `angular.json` file:

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

- [Official documentation for Angular's persistent disk cache](https://angular.io/cli/cache)
- [Angular v13 is now Available](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296)
