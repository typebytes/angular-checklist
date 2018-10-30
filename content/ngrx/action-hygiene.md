---
title: capture events with actions, not commands
---

# Problem

When using NgRx, we are constantly dispatching actions to the store. These can be dispatched from different places such as components and effects. It can get really hard to see where all these actions originated from, why they were send and how they are impacting the state.

# Solution

By changing the way we name our actions, we can more easily see where actions are being dispatched from. It allows us, by just looking at the action history, what the user was doing and the order he was doing it in. So instead of having something like this as action log:

- [Users] Add User
- [Users] Remove User
- [Users] Update User

We can have something like:

- [Users Overview Page] Add User
- [Users Overview Page] Remove User
- [Users Detail Page] Update User

This is considered good _action hygiene_. The format for action names should be `[${source}] ${event}`.

# Resources

- [Good action hygiene](https://www.youtube.com/watch?v=JmnsEvoy-gY) by Mike Ryan
