---
title: Remove Template Whitespace
source: https://github.com/mgechev/angular-performance-checklist
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---
### Remove Template Whitespace

Although we don't see the whitespace character (a character matching the `\s` regex) it is still represented by bytes which are transfered over the network. If we reduce the whitespace from our templates to minimum we will be respectively able to drop the bundle size of the AoT code even further.

Thankfully, we don't have to do this manually. The `ComponentMetadata` interface provides the property `preserveWhitespaces` which by default has value `true`, because removing the whitespace always may influence the DOM layout. In case we set the property to `false` Angular will trim the unnecessary whitespace which will lead to further reduction of the bundle size.

- [preserveWhitespaces in the Angular docs](https://angular.io/api/core/Component#preserveWhitespaces)