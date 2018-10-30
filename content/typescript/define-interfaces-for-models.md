---
title: define interfaces for models
---

# Problem

TypeScript helps us to create type safe code. When working with REST APIs, we will get back data (a DTO) at runtime that has a specific format. In case we don't define types in our code for the objects we expect to get back, we lose the benefit of TypeScript.

# Solution

We should define our models or DTOs (Data Transfer Objects) as interfaces instead of classes. Interfaces are virtual structures that only exist within the context of TypeScript. This means an interface does not generate code whereas a class is primarily syntactical sugar over JavaScript's existing prototype-based inheritance. Consequently, a class generates code when it's compiled to JavaScript.

For example, if we make a backend request that will return an a user object with the properties `userName` and `password`, both strings, we can define an interface `User` that describes the shape of the response:

```ts
export interface User {
  userName: string;
  password: string;
}
```
