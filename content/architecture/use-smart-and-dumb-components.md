---
title: use smart and dumb components
---

# Problem

Every major frontend framework is moving towards a component-based architecture. Components are a combination of HTML, JavaScript and CSS. If we start injecting services in every component, tightly couple them by letting it fetch its own data, we are not leveraging the power of a component-based architecture.

# Solution

The most advocated way to lay out your components is to use smart and dumb components (there is a variety of other names for this principle but the general idea is the same).

## Component Types

### Dumb Component

* Receives data through `@Input`s and communicates only with it's direct parent through `@Output`s.
* Dumb components should not receive `Observables` as inputs.
* It does not know about the rest of the application and hence does not know where it is being used.
* Can contain business logic, but only logic that belongs to the scope of this component. For example, a pagination component can contain logic to calculate the number of 'boxes' to show. It does not know what happens when a user clicks a page number. In that case, it would emit a custom event to notify its parent that something has happened. The parent component then decides what to do and takes action.
* It can use other dumb components as children.
* It can inject services that are related to the view layer of your application (think `TranslateService`, `Router`, ...) but never services that handle business logic such as fetching data.

### Smart Component

* Smart components are application-level components.
* It knows how to fetch data and persist changes.
* It passes data down to dumb components as much as possible and mostly only contains business logic to fetch data.
* It composes several other dumb components in its template.
* It listens for events emitted by dumb components and performs the required action.

## Benefits

* Dumb components are completely reusable since they have a defined API and are independet of any buiness logic.
* Dumb components are easy to test as they are completely isolated.
* The entire architecture of your components becomes easier to reason about. If there is problem with business logic or if the data is not correctly fetched, you know that you need to start searching in your smart components since this is their only responsability.

# Resources

* [Presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov
* [Smart components vs presentational components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/) by Angular University
* [The smart vs dumb component quiz](https://blog.strongbrew.io/the-smart-vs-dumb-components-quiz/) by Kwinten Pisman
