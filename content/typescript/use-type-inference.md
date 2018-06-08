---
title: Use type inference
---
# Use type inference

Typescript is a typed language which supports type inference. This means that:
- you can define the type for a certain variable
- Typescript is smart enough to deduct the type based on its location

Leveraging the type inference will allow us to benefit from the power of Typescript without constantly having to define the types ourselves.

Type inference example:

```ts
const example = 'typescript will infer the string type by default';
```
