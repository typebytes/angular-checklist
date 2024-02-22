---
title: define enums for variables with already known multiple possible values
---

# Problem

When we're working with variables, sometimes you'd need to have variables with already known multiple possible values, that will always be the same in your application (think about having a ticket status variable, `CLOSED`, `OPEN`, `WAITING RESPONSE`)

# Solution

Typescript allows us to define enumerators, which are variables with multiple defined possible values. By using enumerables TS will be able to infer and autocomplete the possible values of a variable inside your code.

We can create different enumerables as follows:
```ts
export enum TicketStatus {
  CLOSED: 'closed',
  OPEN: 'open',
  WAITING_RESPONSE: 'waiting response',
}
```

We can assign any value to our enumerable properties, in this previous example, if you had numeric values for your variable then it'd look like this:
```ts
export enum TicketStatus {
  CLOSED: 0,
  OPEN:1,
  WAITING_RESPONSE: 2,
}
```

So when you or someone else is working later on the code they can use the enum like this:
```ts
if(ticket.status === TicketStatus.OPEN){
  // do something
}
```
or
```ts
switch(ticket.status){
  case TicketStatus.OPEN:
    break;
  case TicketStatus.CLOSED:
    break;
  case TicketStatus.WAITING_RESPONSE:
    break;
}
```
