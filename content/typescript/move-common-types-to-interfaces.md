---
title: Define interfaces for models
---

# Problem

With typescript, we can easily add types to our code like this:

```ts
let user: {userName: string, password: string};
```

In this case, we defined the type of our user 'inline'. While this is a valid option, it also means that it's not reusable. We could define it in multiple places. The downside here is that, when it is updated, we have to update it everywhere.

# Solution

Whenever a type is used in multiple places, it is best to move it to a separate interface. 

Here is an example:

```ts
export interface User {
  userName: string;
  password: string;
}
```
