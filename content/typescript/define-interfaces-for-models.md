---
title: Define interfaces for models
---

# Problem

Typescript helps us to create type safe code. When we let our application interface with some REST apis, we will get back data at runtime that is in a specific format. When we don't define types in our code for the objects we expect to get back, we lose the benefit of typescript for data coming back from the client at compile time.

# Solution

Defining an interface for every API we will interface gives us all the benefits typescript brings.

For example, if you know a backend request will return an object with the properties 'userName' and 'password', which both are strings. Define the type like this:

```ts
export interface User {
  userName: string;
  password: string;
}
```
