---
title: put init logic in the ngOnInit lifecycle hook
---

# Problem

The constructor is a function of a class that is being called during the construction of an instance of that component. Angular leverages the constructor to provide us with the dependencies we requested.
It doesn't mean however, that Angular is fully finished with the creation of this component. The `@Input` bindings for exmaple will not be initialised yet. Angular will call the `ngOnInit` lifecycle hook when it is ready.

If we put logic inside the  constructor, we are doing things before Angular has finished creating the component. 
It also impacts the way we can test our code. In a unit test, we will probably instantiate an instance of a component in a `beforeEach` block. If this already initialises some logic, this will impact every separate test and makes it hard to test that logic.

# Solution

To fix this, we need to move all initialisation logic that needs to be tested and that uses `@Input` bindings to the `ngOnInit` lifecycle hook.

From: 

```ts
@Component({
  template: `...`
})
export class SomeComponent {
  users$: Observable<User>;
  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getUsers();
  }
  	
  ngOnInit() {
  }
}

```
To:

```ts
@Component({
  template: `...`
})
export class SomeComponent {
  users$: Observable<User>;
  constructor(private usersService: UsersService) {
  }
  	
  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }
}

```

# Resources

- [The essential difference between Constructor and ngOnInit in Angular](https://blog.angularindepth.com/the-essential-difference-between-constructor-and-ngoninit-in-angular-c9930c209a42) by Maxim Koretskyi.
