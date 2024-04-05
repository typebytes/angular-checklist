---
title: put business logic into services
---

# Problem

With Angular we are creating applications using a layered architecture. Every layer in our application should have its own responsibility. This means we have decoupled layers and each with its own concern.
Business logic in our application does not belong in the component layer. The component layer is purely meant to be used for visualization, displaying user interface and handling user input. Therefore, business logic should be extracted into the service layer.

In the following example, we are using the `HttpClient` to fetch data from a backend. This should not be done from the component layer.

```ts
@Component({
  ...
})
export class PeopleComponent implements OnInit {
  #httpClient = inject(HttpClient);
  people$ = this.http.get('http://some-api.com/api/people');
}
```

# Solution

Let's move the logic into a dedicated `PeopleService` service instead!

```ts
@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  #http = inject(HttpClient);

  getPeople(): Observable<People[]> {
    return this.http.get<People[]>('http://some-api.com/api/people');
  }
}
```

Now we can inject the `PeopleService` into our component and use the `getPeople` method.

```ts
@Component({
  ...
})
export class PeopleComponent {
  #peopleService = inject(PeopleService);
  people$ = this.peopleService.getPeople();
}
```
