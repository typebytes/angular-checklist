---
title: capture events with actions, not commands
---

# Problem

When using NgRx, we are constantly dispatching actions to the store. These can be dispatched from different places such as components and effects. It can become really hard to figure out where all these actions originated from, why they were sent and how they are impacting the state.

# Solution

By changing the way we name our actions, we can more easily see where actions are being dispatched from. It allows us, by just looking at the action history, what the user was doing and the order he was doing it in. So instead of having something like this as action log:

- [Users] Add User
- [Users] Remove User
- [Users] Update User

We can have something like:

- [Users Overview Page] Add User
- [Users Overview Page] Remove User
- [Users Detail Page] Update User

This also implies that actions should not be reused. This might seem like an overkill to create a second action that will have the same result. But we have to keep in mind that at some point in time, we might need to update this code later on. This explicitness will help us in the future. 

This is considered good _action hygiene_. The format for action names should be `[${source}] ${event}`.

# Resources

- [Good action hygiene](https://www.youtube.com/watch?v=JmnsEvoy-gY) by Mike Ryan
