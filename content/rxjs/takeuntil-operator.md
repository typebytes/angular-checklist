---
title: don't manage subscriptions imperatively
---

# Problem

When we subscribe to an Observable, we also need to unsubscribe to clean op it's resources. Unsubscribing can be done like this:

```ts
// hold a reference to the subscription object
const subscription = interval(1000).subscribe(console.log);

// use this subscription object to kill the subscription
subscription.unsubscribe();
```

But if we have multiple subscriptions, we need to manage all of them. We could do this in an array but this is getting extremely verbose. We want to avoid having to do this.

# Solution

RxJS provides us with the `takeUntil` operator. This operator will mirror the source observable 'till a certain event happens'. In most cases, we want to stop listening to Observables when the component gets destroyed. This allows us to write something like this:

```ts
@Component({...})
export class SomeComponent implements OnInit, OnDestroy {
  private stop$ = new Subject();
  users;
  
  constructor(private usersService: UsersService) {
  }
	
  ngOnInit() {
    this.usersService.getUsers()
     .pipe(
       takeUntil(this.stop$)
     )
     .subscribe(
       users => this.users = users;
     );
   }
   
   ngOnDestroy() {
     this.stop$.next();
   }   
}
```

We create a Subject called `stop$` and when the `ngOnDestroy` hook is called, we `next` a value onto the Subject. 

The manual subscribe we defined in the `ngOnInit` hook uses the `takeUntil` operator in combination with the `this.stop$`. This means that the subscription will remain active **until** the `stop$` gets a value. After that, it will unsubscribe the source stream and complete it.

This is way better than imperatively handling the subscriptions.

**Note:** Using the async pipe is even better as we don't have to think about this at all. It will hook into the destroy lifecycle hook and unsubscribe for us.

# Resources

* [RxJS: don't unsubscribe](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87) by Ben Lesh
* [RxJS: Avoiding takeUntil leaks](https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef) by Nicholas Jamieson
