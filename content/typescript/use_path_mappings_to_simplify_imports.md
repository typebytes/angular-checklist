---
title: use path mappings to simplify imports 
author:
  name: Bo Vandersteene
  url: https://medium.com/@bo.vandersteene
---

# Problem
An application, can have a lot of components, modules, ... . Everywhere we want to use a dependency, we need to import it.

If we take a look at our imports in a file, then you discover imports, that have long names and/or a lot of imports with the same functionality
```ts
import { AuthenticationModule }  '../.../../../../authentication/src/lib/authentication.module';
import { AuhtenticationAction }  '../.../../../../authentication/src/lib/store/authentication.actions';
import { AuhtenticationState }  '../.../../../../authentication/src/lib/store/authentication.state';
```
And finally if we want to refactor our authentication lib, we need to adjust all our imports.


# Solution

In TypeScript, we want to take advantage of module resolution. This is the process the compiler uses to figure out what an import refers to. 

Create a public_api.ts file that expose all options 

```ts
export * from './lib/authentication.module';
export * from './lib/store/authentication.actions';
export * from './lib/store/authentication.state';
```
This file should be linked in the tsconfig.json file
```ts
{
  ...
    "paths": { 
      "@my/authentication": ["projects/authentication/src/public_api.ts"], 
    }
  }
}

```
use the import 
```ts
import { AuthenticationModule } from '@my/authentication'
```

The import is now more readable.

Another advantage of this usage: when we refactor our authentication module, there is only the need to adjust our public_api.ts file
