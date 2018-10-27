---
title: Not everything is in the store
---
# Problem

NgRx/Store (or Redux in general) provides us with a lot of great features and can be used in a lot of use cases. In some cases however, this pattern can be overkill. Implementing it means that we get the downsides without the benefits.

# Solution

The NgRx team created a principle called 'SHARI' that can be used as a rule of thumb on what data needs to be added to the store.

Shared - State that is shared between many components and services
Hydrated - State that is persisted and hydrated from 
Availabe - State that needs to be available when re-entering routes
Retrieved - State that needs to be retrieved with a side effect
Impacted - State that is impacted by actions from other sources

# Resources

* [Reducing the Boilerplate with NgRx](https://www.youtube.com/watch?v=t3jx0EC-Y3c) by Mike Ryan and Brandon Roberts
* [Do we really need @ngrx/store](https://blog.strongbrew.io/do-we-really-need-redux/) by Brecht Billiet
