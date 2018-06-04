---
title: AOT Compilation
source: https://github.com/mgechev/angular-performance-checklist
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---
# Use Ahead-of-Time Compilation

AoT can be helpful not only for achieving more efficient bundling by performing tree-shaking, but also for improving the runtime performance of our applications. The alternative of AoT is Just-in-Time compilation (JiT) which is performed runtime, therefore we can reduce the amount of computations required for rendering of our application by performing the compilation as part of our build process.

# Tooling

* [@angular/compiler-cli](https://github.com/angular/angular/tree/master/packages/compiler-cli) - a drop-in replacement for [tsc](https://www.npmjs.com/package/typescript) which statically analyzes our application and emits TypeScript/JavaScript for the component's templates.
* [angular2-seed](https://github.com/mgechev/angular-seed) - a starter project which includes support for AoT compilation.
* [Angular CLI](https://cli.angular.io/) Using the ng serve --prod

# Resources

* [Ahead-of-Time Compilation in Angular](http://blog.mgechev.com/2016/08/14/ahead-of-time-compilation-angular-offline-precompilation/) by Minko Gechev