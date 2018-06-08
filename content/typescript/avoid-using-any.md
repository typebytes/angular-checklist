---
title: Avoid using any
---
# Avoid the using of the any type

Typescript allows us to write code that is type checked. This provides huge benefits. Whenever we use the `any` type, we are basically telling Typescript to ignore the following section, thus loosing all benefits. 

If you are using a library which was written in javascript, and thus doesn't have any types, you can probably find type definitions on npm for this when searching for '@types/${library-name}'.
If you can not find types, try to define a type yourself. Using `any` should be an exception.
