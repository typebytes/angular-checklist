---
title: don't use property bindings for attributes
---
# Don't use property bindings for attributes

When you are passing a static string to a component or an HTML tag, don't use a property binding. Every property binding is constantly checked during change detection.

For example, this:
```ts
<input [id]="'exampleId'" />
```

Should be:
```ts
<input id="exampleId" />
```
