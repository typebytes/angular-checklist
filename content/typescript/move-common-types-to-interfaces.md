---
title: move common types to interfaces
---

# Problem

With Typescript, we can easily add types to our code like this:

```ts
let user: { userName: string; password: string };
```

In this case, we defined the type of our user _inline_. While this is a valid option, it also means that it's not reusable. We could define it in multiple places. The downside here is that, when it is updated, we have to update multiple places.

# Solution

Whenever a type is reused in multiple places, it is recommended to move it into a separate interface.

For example, we could define an interface `User`:

```ts
export interface User {
  userName: string;
  password: string;
}
```
