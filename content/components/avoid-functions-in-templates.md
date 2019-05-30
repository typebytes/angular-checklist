---
title: avoid functions in templates
---

# Problem

Since angular can not know if result of the function (or a getter) has changed, in default ChangeDetection mode the component will continuously execute template bound function to keep up-to-date with underlying data flow. 

This can cause performance issues and hide template complexity.

# Solution #1

Functions that will always result the same value during the lifetime of the component execute on `ngOnInit` or even earlier in `constructor` and assign to component public property which will then be used in its template.


```ts
@Component({
  template: `<div *ngIf="shouldShowContent()">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;

  constructor(private userService: UserService, private deviceService: DeviceService){
  }

  shouldShowContent(): boolean {
    return this.userService.isUserAmazing() && this.deviceService.isUsingModernBrowser()
  }

}
```

## Becomes: 

```ts
@Component({
  template: `<div *ngIf="shouldShowContent">content to show</div>`
})
export class SomeComponent {
  users: User[];
  visible: boolean;
  shouldShowContent: boolean;

  constructor(private userService: UserService, private deviceService: DeviceService){
    this.shouldShowContent = this.getShouldShowContent();
  }

  private getShouldShowContent(): boolean {
    return this.userService.isUserAmazing() && this.deviceService.isUsingModernBrowser();
  }

}
```


# Solution #2

Functions that will change their result depending on external factor is best to refactor into observables and then bind to the template using `async` pipe.


```ts
@Component({
  template: `<div *ngIf="didTaskExpire()">Show Warning</div>`
})
export class SomeComponent {

  constructor(private taskService: UserService){
  }

  didTaskExpire(): boolean {
    return this.taskService.validUntil >= + new Date;
  }

}
```

## Becomes: 

```ts
@Component({
  template: `<div *ngIf="didTaskExpire$ | async">Show Warning</div>`
})
export class SomeComponent {

  didTaskExpire$: Observable<boolean>;
  checkInterval$: Observable<number> = Interval(15000);

  constructor(private taskService: UserService){
    this.didTaskExpire$ = this.didTaskExpire();
  }

  didTaskExpire(): Observable<boolean> {
    return checkInterval$.pipe(map(() => {
      return this.taskService.validUntil >= + new Date;
    })) 
  }

}
```

