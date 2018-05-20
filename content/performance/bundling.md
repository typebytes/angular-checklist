---
title: Bundling
source: https://github.com/mgechev/angular-performance-checklist
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---
### Bundling

Bundling is a standard practice aiming to reduce the number of requests that the browser needs to perform in order to deliver the application requested by the user. In essence, the bundler receives as an input a list of entry points and produces one or more bundles. This way, the browser can get the entire application by performing only a few requests, instead of requesting each individual resource separately.

As your application grows bundling everything into a single large bundle would again be counter productive. Explore Code Splitting techniques using Webpack.

**Additional http requests will not be a concern with HTTP/2 because of the server push feature.**

#### Tooling

Tools which allows us to bundle our applications efficiently are:

- [Angular CLI](https://github.com/angular/angular-cli) - A command line interface for Angular which makes it easy to create an application that already works, right out of the box. It already follows many best practices and focuses on performance.
- [Webpack](https://webpack.js.org) - provides efficient bundling by performing [tree-shaking](#tree-shaking).
- [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/) - Techniques to split your code.
- [Webpack & http2](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6#.46idrz8kb) - Need for splitting with http2.
- [Rollup](https://github.com/rollup/rollup) - provides bundling by performing efficient tree-shaking, taking advantage of the static nature of the ES2015 modules.
- [Google Closure Compiler](https://github.com/google/closure-compiler) - performs plenty of optimizations and provides bundling support. Originally written in Java, since recently it also has a [JavaScript version](https://www.npmjs.com/package/google-closure-compiler-js) which can be [found here](https://www.npmjs.com/package/google-closure-compiler-js).
- [SystemJS Builder](https://github.com/systemjs/builder) - provides a single-file build for SystemJS of mixed-dependency module trees.
- [Browserify](http://browserify.org/).