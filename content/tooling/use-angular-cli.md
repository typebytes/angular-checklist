---
title: use @angular/cli
optional: true
---

# Problem

When we ship our code to the browsers, our code needs to be optimised, bundled, minified, uglified and much more. There are also other steps involved in a proper build process. This can be quite a difficult and cumbersome task to do and especially to maintain.

# Solution

To fix this, we should use the `@angular/cli` to take over the build process. The Angular CLI simplifies the development of your Angular applications drastically. Aside from the build process, the CLI also provides you with code scaffolding which you can use to easily generate entire projects, components and much more.

The CLI abstracts everything for us. This also means that when there are better solutions available to for example perform the build process, and if they integrate this, we get this update without putting any effort in. Since version 6, it also possible to hook into the entire build process via builders.

# Resources

- [Angular CLI](https://cli.angular.io/)
- [Angular CLI under the hood - builders demystified](https://medium.com/dailyjs/angular-cli-6-under-the-hood-builders-demystified-f0690ebcf01) by Evgeny Barabanov
