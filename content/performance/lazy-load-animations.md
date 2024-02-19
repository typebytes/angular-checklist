---
title: lazy load animation providers
---

# Problem

Angular uses the [animations package](https://angular.dev/guide/animations) to add motion to your application.
To enable animations, add the `provideAnimations()` call to your `app.config.ts` file:

```typescript
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
};
```

However, this will eagerly load the animations package with the main bundle, which can slow down the initial load time of your application.  
The unminified size of the animations package is around **65kb**, which is not a lot, but it can add up with other packages.

# Solution

Starting with Angular **17.0.0**, you can now lazy load the animation package. You can change the way you provide the animations package in favor of `provideAnimationsAsync()`:

```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync()
  ]
};
```

**Note:** This behavior will only work if you use the animations in lazy loaded components. Otherwise, the animations will be eagerly loaded with the main bundle.

# Resources

- [Lazy-loading Angular's animation module](https://riegler.fr/blog/2023-10-04-animations-async) by [Matthieu Riegler](https://twitter.com/Jean__Meche)
