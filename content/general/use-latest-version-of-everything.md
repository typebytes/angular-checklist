---
title: use latest version of everything
author: 
  name: Billy Lando
  url: https://github.com/billyjov
---

# Problem 

The Angular team and community are continually improving the ecosystem to make it easier to build applications. Both the performance and the compiler (e.g., Ivy Renderer) are constantly being improved for better web applications.

Angular uses semantic versioning (semver), which means they use a regular schedule of releases. This includes a major release every six months, 1-3 minor releases for each major release, and a patch release almost every week. It’s important to keep up with major releases, as they contain significant new features. The longer we wait to update our application, the more expensive a future update can be. **Be aware** that major releases may contain breaking changes.

In addition, when APIs are deprecated, they remain present in the next two major releases until they are removed. Again, if we wait too long, it’s likely that an update will require much more work. You can read more about deprecations in the changelog.

**Note:** In the case of significant refactors, the Angular team may create schematics that can help update your app for you. At present, there are [schematics](https://angular.dev/reference/migrations) that convert to standalone components, the new control flow syntax, and more.

# Solution

You can follow this steps using Angular CLI:

- **Step 1:** Create a new feature branch  
- **Step 2:** Run `ng update @angular/core @angular/cli` inside your project directory
- **Step 3:** Run `ng serve`, `ng test`, `ng build --prod` and make sure your app works as expected 
- **Step 4:** Fix update deprecations, issues, styling issues in case of Angular Material and run the previous step again
- **Step 5:** merge or rebase your changes on top of the main branch

For more information, check out the [official update guide](https://update.angular.io/) on how to update from different versions.

# Resources

- [Keeping your Angular Projects Up-to-Date](https://angular.io/guide/updating)
- [Don’t be afraid and just `ng update`!](https://itnext.io/dont-be-afraid-and-just-ng-update-1ad096147640) by Bram Borggreve 
