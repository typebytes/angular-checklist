---
title: Use prettier for code formatting
optional: true
---
# Use prettier for code formatting

Whenever we write code, we want this code to be formatted in a standardised way. This poses two problems. We need to align everyone in the team to agree with the same standards and we need to get all of their IDE's/editors aligned as well. This can be extremely difficult. 
Prettier is an opinionated code formatter that can fix both of these problems. It imposes a standard way of formatting and it has a CLI that makes sure the formatting happens the same way on all environments. Adding Prettier and running it as a pre-commit hook will make sure only formatted code can be checked in.
