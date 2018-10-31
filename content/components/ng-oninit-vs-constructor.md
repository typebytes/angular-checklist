---
title: put init logic in the ngOnInit lifecycle hook
---

# Problem

The constructor is a function of a class that is being called during the construction of an instance of that component. Angular leverages the constructor to provide us with the dependencies we requested. It doesn't mean however, that Angular is fully finished with the creation of this component. The `@Input` bindings for example will not be initialised yet. Angular will call the `ngOnInit` lifecycle hook when it's ready.

If we put logic inside the constructor, especially data-fetching logic, we are doing things before Angular has finished creating the component. It also has an impact on how we test our code. In a unit test, we will probably instantiate an instance of a component in a `beforeEach` block. If this already initialises some logic or fetches data, it will impact every other test and make it harder to test this particular logic.

# Solution

To fix this, we need to move all initialization logic that needs to be tested and that uses `@Input` bindings to the `ngOnInit` lifecycle hook.

The constructor should only be used for injecting dependencies.

Here's a concrete example.

```ts
@Component({
  template: `...`
})
export class SomeComponent {
  users$: Observable<User>;

  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getUsers();
  }
}
```

We refactor this by moving the code from the constructor into the `ngOnInit` lifecycle hook.

```ts
@Component({
  template: `...`
})
export class SomeComponent implements OnInit {
  users$: Observable<User>;
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }
}
```

# Resources

- [The essential difference between Constructor and ngOnInit in Angular](https://blog.angularindepth.com/the-essential-difference-between-constructor-and-ngoninit-in-angular-c9930c209a42) by Maxim Koretskyi
