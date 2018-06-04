---
title: Pure Pipes
source: https://github.com/mgechev/angular-performance-checklist
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---
# Use pure Pipes

As argument the `@Pipe` decorator accepts an object literal with the following format:

```ts
interface PipeMetadata {
  name: string;
  pure: boolean;
}
```

The pure flag indicates that the pipe is not dependent on any global state and does not produce side-effects. This means that the pipe will return the same output when invoked with the same input. This way Angular can cache the outputs for all the input parameters the pipe has been invoked with, and reuse them in order to not have to recompute them on each evaluation.

The default value of the pure property is true.
