---
title: don't use property bindings to pass static strings to native attributes
---

# Problem

Property bindings in Angular allows us to bind to properties. During change detection, when a component is checked, all of the bindings for that component are being checked to see if the view needs to be updated. This means that the more bindings we create, the slower the CD cycle will be, as more bindings need to be checked.

If we have static strings that we want to pass to a native attribute (such as `id` and `title`) of an HTML element, it's not necessary to use a property binding as the value will never change. This seems to be a trivial thing to talk about, but it can have a great impact the performance of our application.

# Solution

Only use a property binding for dynamic values. Use attributes to pass static string values to native attributes.

In the following example, we bind a static string to the `id` property of an input field. This doesn't make much sense because this string is passed statically and will never change. So, why use a property binding for this?

```ts
<input [id]="'exampleId'" />
```

In order to fix this, we can remove the property binding and use the native `id` attribute instead.

```ts
<input id="exampleId" />
```
