---
title: Define interfaces for models
---
# Define interfaces for models

When working with APIs, define a type for every call you can perform. This will provide type safety in your own code.

For example, if you know a backend request will return an object with the properties 'userName' and 'password', which both are strings. Define the type like this:

```ts
export interface User {
  userName: string;
  password: string;
}
```
