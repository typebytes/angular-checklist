---
title: don't use property bindings to pass static strings
---

# Problem

Property bindings in Angular allows us to bind to properties. During change detection, when a component is checked, all the bindings for that component are being checked to see if they are updated. This means that the more bindings, the slower the CD cycle will be.
If we have static strings that we want to pass to a native HTML element or a component, it's not necessary to use a property binding as the value will never change. But it will impact performance.

# Solution

Only use a property binding for dynamic values. Use attributes to pass a static string value.

In the following example, we pass a static string to the input. This doesn't make sense as this string is passed statically and will never change. 
```ts
<input [id]="'exampleId'" />
```
In order to fix this, we can remove the property binding.
```ts
<input id="exampleId" />
```
