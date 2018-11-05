---
title: avoid using any
---

# Problem

TypeScript allows us to write code that is statically type checked. This provides huge benefits. It helps us during development with auto completion, it simplifies working with third party libraries, helps us to refactor our code, spots errors during development that would have otherwise been runtime errors and much more.

If we start using the `any` type, we lose all these benefits.

# Solution

The solution is to avoid the `any` type wherever possible in our code and we should define proper types instead.

Here's a classic example:

```ts
var x: number = 10;
var y: any = "a";
x = y;
```

See how we assign a string to `x` although `x` is defined as a `number`? That's a nightmare.

Let's look at another example:

```ts
const x: number = 10;
const y: any = 'a';
const z = x + y;

// Prints out 10a
console.log(z);
```

In the last example we add `x` and `y` together, and typing `y` as `any`, TypeScript cannot really help us and avoid this bug at development time. Basically, we end up with a concatenation and we’re essentially back in JavaScriptLand.

## Compiler Options

Set the compiler `–noImplicitAny` flag. With this flag enabled the compiler will complain if anything has an implicit type of `any`.

## 3rd party libraries

When working with 3rd party libraries that are written in vanilla JavaScript, we most likely don't have type information available. Luckily there is an initiative to create type definitions for those libraries. If it exists, you can find it by installing the type package via `yarn add --dev @types/${library-name}`.

If this does not exist yet, you can create one yourself. Contributions are always welcome and appreciated.
