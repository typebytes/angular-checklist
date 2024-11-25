---
title: use component state
---

# Problem

Sometimes you'll need to handle component state, but it shouldn't be added to the global state because:
1) It'd bloat the global state
2) Specific state or UI state should belong to the component (like showing a previously hidden form when editing an item, this is something that should belong to the component state and not the global one)

# Solution

You can use NgRx component store package [@ngrx/component-store](https://ngrx.io/guide/component-store) which allows to have a component store for all the state requirements of the specific component you have.

**Key Concepts from the NgRx docs:**

- Local state has to be initialized, but it can be done lazily.
- Local state is typically tied to the life-cycle of a particular component and is cleaned up when that component is destroyed.
- Users of ComponentStore can update the state through setState or updater, either imperatively or by providing an Observable.
- Users of ComponentStore can read the state through select or a top-level state$. Selectors are very performant.
- Users of ComponentStore may start side-effects with effect, both sync and async, and feed the data both imperatively or reactively.
