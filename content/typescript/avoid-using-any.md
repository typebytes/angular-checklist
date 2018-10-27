---
title: Avoid using any
---

# Problem

Typescript allows us to write code that is type checked. This provides huge benefits. It helps us during development with auto completion, it simplifies working with third party libraries, helps us to refactor our code, and much more. And all of this by adding types to our codes. 

If we start using the `any` keyword, are basically telling Typescript to ignore the following section, thus loosing all benefits.  

# Solution

Instead of using the any type, we should define proper types in our code. In the next example, we define a type for our variable.

```ts
let user: {name: string, password: string};
```

If we are using this type in multiple places, we can also extract it to a separate interface.

```ts
interface User {
	name: string;
	password: string;
}
```

## 3th party libraries

When working with 3th party libraries that are writtin in javascript, we don't have types available. Luckily there is an initiative to create type definitions for those libraries. If it exists, you can find it by installing the type package via `yarn add --dev @types/${library-name}
`. 

If this does not exist yet, you can create one yourself. 
