---
title: capture events with actions, not commands
---

# Problem

When using NgRx, we are constantly dispatching actions to the store. These can be dispatched from different places such as components and effects. It can get really hard to see where all these actions originated from, why they were send and how they are impacting the state.

# Solution

By changing the way we name our actions, we can &

# Resources

* [Good action hygiene](https://www.youtube.com/watch?v=JmnsEvoy-gY)
