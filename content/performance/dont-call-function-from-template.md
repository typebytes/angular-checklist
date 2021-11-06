---
title: don't call functions from the template to get data
author:
  name: Maciej Wójcik
  url: https://twitter.com/maciej_wwojcik
---

# Problem

Templates render usually depends on dynamic data generated in component class (async service call, dynamic properties, etc.). Therefore, it's essential to process the data and provide values for the template using component property fields (both regular and Observable) and not use function calls for that purpose. 

Angular can't predict whether value return from the function could change or not, so by default it will perform it once again on every Change Detection check. Potentially in complex components, such functions could be called many times per second, resulting in poor performance.

Here is a couple of examples:

```typescript
@Component({
  template: `
    <div>{{ getName() }}</div>
  `
})
export class MyComponent {
  id;

  getName() {
    return this.service.getName(this.id);
  }
}
```

```typescript
@Component({
  template: `
    <button [disabled]="isDisabled()"></button>
  `
})
export class MyComponent {
  isDisabled() {
    return Math.random() > 0.5
  }
}
```

```typescript
@Component({
  template: `
    <li *ngFor="let item of getItems()"></div>
  `
})
export class MyComponent {
  getItems() {
    return this.service.getBooks();
  }
}
```


# Solution

We can help Angular with deciding whether value could change or not in a few ways:

- assign values to component properties
- use OnPush strategy
- use custom pipes

## Assigning values to component properties
Instead of calling a function from the template, we can call it in the component class when needed, and use the value to populate the component property:

```typescript
@Component({
  template: `
    <div>{{ name }}</div>
  `
})
export class MyComponent {
  name;
  private id;

  ngOnInit() {
    this.name = this.getName();
  }

  getName() {
    return this.service.getName(this.id);
  }
}
```

That's why Angular will know the exact value of the property all the time, without any cost of checking that on every Change Detection!

## Using OnPush Change Detection strategy
Change Detection strategy describes how Angular should handle Change Detection and DOM rendering. When using OnPush strategy, the function will be called again only if `@Input` properties changes, or if `@Output` emiters are fired or an `Observable` emits new values.

```typescript
@Component({
  template: `
    <div>{{ getName() }}</div>
  `
})
export class MyComponent {
  @Input() id;

  getName() {
    return this.service.getName(this.id);
  }
}
```

## Using custom pipes
Pipes by default are pure, which means Angular will execute its `transform` method only on change to the input value.
Given that example:

```typescript
@Component({
  template: `
    <div>{{ id | getName }}</div>
  `
})
export class MyComponent {
  id;
}
```

As long as the `id` property will stay the same, the pipe won't execute its code again and perform a possibly expensive task.


# Resources

- ["OnPush strategy"](https://blog.angular-university.io/onpush-change-detection-how-it-works/) - Article about OnPush Change Detection strategys
- ["Pure pipes"](https://indepth.dev/posts/1061/the-essential-difference-between-pure-and-impure-pipes-in-angular-and-why-that-matters) - Article about pure pipes