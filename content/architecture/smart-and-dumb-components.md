---
title: Use smart and dumb components
---

# Problem

Every major frontend framework is moving towards a component based architecture. Components are a combination of a little bit of HTML, JavaScript and CSS. If we start injecting services in every component, tightly couple it by letting it fetch its own data, we are not leveraging the power of a component based architecture.

# Solution

The most advocated way to arrang your is to use smart and dumb components (there is a variety of other names for this principle but the general principle is the same).

## Component Types

### Dumb Components

* Receives data through `@Input`s and communicates only with it's direct parent through `@Output`s.
* Dumb components should not receive `Observables` as inputs
* It does not know about the rest of the application. It is dumb and does not know where it is being used.
* Can contain business logic, but only logic that belongs to the scope of this component. For example, a pagination component can contain logic to calculate the number of 'boxes' to show. It does not know what happens when a user clicks a page number. In that case, it throws a custom event to notify its parent the that something has happened. The parent component then decides what happens.
* It can use other dumb components as children.
* It can inject services that are related to the view layer of your application (think `TranslateService`, `Router`, ...) but never services to fetch its own data.

## Smart Component

* Knows about the application and will fetch data.
* It passes data down to dumb components as much as possible and mostly only contains the business logic to fetch the data.
* It is build up out of several dumb components.
* It listen for events thrown by the dumb components and performs the required action for them.

## Benefits

* Dumb components are completely reusable since they have a defined API and are independet of any buiness logic.
* Dumb components are easy to test as they are completely isolated.
* The entire architecture of your components becomes easier to reason about. If there is a business logic or data fetching problem, you know that you need to start searching in your smart components since this is the responsability of that component.

# Resources

* [Presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov.
* [Smart components vs Presentational components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/) by Angular University.
* [The smart vs dumb component quiz](https://blog.strongbrew.io/the-smart-vs-dumb-components-quiz/) by Kwinten Pisman.
