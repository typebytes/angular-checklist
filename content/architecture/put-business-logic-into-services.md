---
title: put business logic into services
---

# Problem

With Angular we are creating applications using a layered architecture. Every layer in our application should have its own responsibility. This means we have decoupled layers and each with its own concern.
Business logic in our application does not belong in the component layer. The component layer is purely meant to be used for visualization, displaying user interface and handling user input. Therefore, business logic should be extracted into the service layer.

# Solution

In the following example, we are using the `HttpClient` to fetch data from a backend. This should not be done from the component layer but instead we move the logic into a dedicated service.

```ts
@Component({
  ...
})
export class SomeComponent implements OnInit {
  data$;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.data$ = this.http.get('http://some-api.com/');
  }
}
```

We can refactor this and move the logic into a `PeopleService`.

```ts
@Component({
  ...
})
export class SomeComponent implements OnInit, OnDestroy {
  data$;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.data$ = this.peopleService.getPeople();
  }
}
```
