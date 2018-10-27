---
title: Use the @angular/cli 
optional: true
---
# Problem

When we ship our code to the browsers, it first needs to be bundled, it needs to be minified, it needs to be uglified, ... This is a hard and cumbersome task to do and especially maintain. 

# Solution

Using the `@angular/cli` to take over the build process simplifies the development of your angular applications drastically. Aside from the build process, the CLI also provides you with code scaffolding which you can use to easily generate entire projects, components and much more.

The CLI abstracts everything for us. This also means that when there are better solutions avaiable to perform for example the build process, if they integrate this, we get this update for free. Since version 6, it also possible to hook into the entire build process.

# Resources

* [Angular CLI](https://cli.angular.io/) by the Angular team
* [Angular CLI under the hood - builders demistified](https://medium.com/dailyjs/angular-cli-6-under-the-hood-builders-demystified-f0690ebcf01) by Evgeny Barabanov
