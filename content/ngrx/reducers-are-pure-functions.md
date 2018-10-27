---
title: reducers are pure functions
---

# Problem

Reducers are responsible for updating the state in our application based on actions. It is extremely important that these are deterministic so that every action will always have the same result. If they are no longer deterministic, we can no longer trust them to manage our state.

# Solution

By writing our reducers as pure functions, we are 100% sure that the reducer is determinstic and can be used to manage our state. Properties of a pure function are:

* it does not depend on side effects
* it does not nutate any of its inputs
* if you call it over and over again, with the same arguments, you always get back the same results

These properties are exactly what we need for our reducers to be deterministic and to comply with the key concepts of Redux.
