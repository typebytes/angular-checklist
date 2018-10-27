---
title: Use type inference
---
# Problem 

Typescript is really good at inferring the types in our code. Whenever it can do that, we don't have to add the type ourselves. 

If we do add them everywhere, it doesn't only take a lot of time, but it also means that we have to update them everywhere whenever anything changes.

# Solution

Instead of defining the types, we can let typescript infer the types. 

So instead of doing this:

```ts
const example: string = 'typescript will infer the string type by default';
```

We omit the type as typescript can infer that as we assign it a string property.
```ts
const example = 'typescript will infer the string type by default';
```