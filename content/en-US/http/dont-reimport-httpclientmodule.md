---
title: don't re-import HttpClientModule
---

# Problem

`HttpClientModule` is responsible for providing us with HTTP related functionality. One such functionality is the ability to specify interceptors that inspect and transform HTTP requests from your application to the server.
When re-importing `HttpClientModule` in a lazy-loaded module or a dependency of a lazy-loaded module, existing HTTP interceptors will be overridden for that module.

# Solution

Import `HttpClientModule` only once in the root module.

# Resources

- [HTTP_INTERCEPTORS are reset when re-importing HttpClientModule](https://github.com/angular/angular/issues/20575)