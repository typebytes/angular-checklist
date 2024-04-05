---
title: Do not mix Angular Forms API
---

# Problem

Angular provides two APIs for building forms: the `Template-driven` and the `Reactive` forms API.  
Both APIs can be used to build forms in Angular, but they are not meant to be mixed.  
Mixing these APIs can lead to confusion and make the code harder to maintain.

Here is an example of mixing the two APIs:

```ts
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="name" [(ngModel)]="name" name="name" required>
      <button type="submit">Submit</button>
    </form>
  `
})
export class SomeComponent {
  name: string = 'Gerome';

  form = new FormGroup({
    name: new FormControl('Gerome', {Validators.required})
  });
}
```

In this example, we are using both `formControl` and `ngModel` to bind the input field to the `name` property.

# Solution

Choose one API and stick to it. If you are using the `Reactive` forms API, then use it consistently throughout your application.

Here is the same example using the `Reactive` forms API:

```ts
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="name">
      <button type="submit">Submit</button>
    </form>
  `
})
export class SomeComponent {
  form = new FormGroup({
    name: new FormControl('Gerome', {Validators.required})
  });
}
```
