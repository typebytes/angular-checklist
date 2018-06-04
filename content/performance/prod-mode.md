---
title: Enable Production Mode
source: https://github.com/mgechev/angular-performance-checklist
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---
# Use `enableProdMode`

In development mode Angular performs some extra checks in order to verify that performing change detection does not result to any additional changes to any of the bindings. This way the frameworks assures that the unidirectional data flow has been followed.

In order to disable these changes for production to not forget to invoke enableProdMode:

```ts
import { enableProdMode } from '@angular/core';

if (ENV === 'production') {
  enableProdMode();
}
```
