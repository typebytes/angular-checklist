---
title: use type inference
---

# Problem

Typescript is really good at inferring the types in our code. Whenever it can do that, we don't have to add the types ourselves.

If we do add them everywhere, it doesn't only take a lot of time, but it also means that we have to update them everywhere whenever anything changes.

# Solution

In TypeScript, we want to take advantage of type inference as much as possible. TypeScript uses this to to provide type information when there is no explicit type annotation.

Here's an example:

```ts
const x: number = 3;
const y: string = 'typescript will automatically infer the string type';
```

In both cases, the type is inferred when initializing the variables.

To keep this code clean, we can omit the type information and use the type inference to automatically provide type information.

```ts
const x = 3;
const y = 'typescript will automatically infer the string type';
```

Type inference does not only take place when initializing variables but also when initializing class members, setting parameter default values, and determining function return types.
