---
title: use latest version of everything
author: 
  name: Billy Lando
  url: https://github.com/billyjov
---

# Problem 

The Angular team and community are continually improving the ecosystem to make it easier to build applications. Both the performance and the compiler (e.g The Ivy Renderer) are constantly being improved for better web applications.   

Angular as a [release schedules](https://angular.io/guide/releases#schedule) major releases every six months. In most cases, this means that the code should be change within our application. The longer it takes to update, the more expensive will be a future update. Deprecations are available in the [Changelog](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# Solution

**Update your application a few weeks after the release**

You can follow this steps using Angular CLI:

- **Step 1:** Create a new feature branch  
- **Step 2:** Run `ng update @angular/core @angular/cli` inside your project directory
- **Step 3:** Run `ng serve`, `ng test`, `ng build --prod` and make sure your app works as expected 
- **Step 4:** Fix update deprecations, issues, styling issues in case of angular Material and run the previous step again
- **Step 5:** merge your changes into the main branch

Find in the [official update guide](https://update.angular.io/) more informations on how you can update differents versions.


# Resources

- [Angular Documentation for projects update](https://angular.io/guide/updating)
- [Don’t be afraid and just `ng update`!](https://itnext.io/dont-be-afraid-and-just-ng-update-1ad096147640) by Bram Borggreve 
