---
title: use prettier for code formatting
---

# Problem

Whenever we write code, we want this code to be formatted in a standardised way. This poses two problems.

- We need to align everyone in the team to agree with the same standards.
- We need to get all of their IDE's/editors aligned as well. This can be extremely difficult.

# Solution

Prettier is an opinionated code formatter that can fix both of these problems. It imposes a standard way of formatting and it has a CLI that makes sure the formatting happens the same way on all environments. Adding Prettier and running it as a pre-commit hook will make sure only formatted code can be checked in.

# Resources

- [Prettier](https://prettier.io/)
- [Add prettier to Angular CLI schematic](https://github.com/schuchard/prettier-schematic)
