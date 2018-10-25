---
title: Business Logic in Services
---

# Problem

With Angular we are creating applications using a layered architecture. Every layer in our architecture should have it's own responsability. This means we have decoupled layers and separation of concerns. 
Business logic in our applications does not belong in the component layer. The component layer is purely meant to be used for visualisation and handling user input. Business logic should be moved to the service layer.

# Solution

In the following example, we are using the `HttpClient` to fetch data from the backend. This should not be done inside of the component layer but moved to a service.

```ts 
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  
  constructor(private http: HttpClient) {
  }
  
  ngOnInit() {
    this.data$ = this.http.get('http://some-api.com/');
  }
}
```
We move this into a `PeopleService`.

```ts 
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;
  
  constructor(private peopleService: PeopleService) {
  }
  
  ngOnInit() {
    this.data$ = this.peopleService.getPeople();
  }
}
```