---
title: only manipulate the DOM via the Renderer
author: 
  name: Billy Lando
  url: https://github.com/billyjov
---

# Problem 

According to the Angular documentation, relying on direct DOM access creates tight coupling between your application and rendering layers which will make it impossible to separate the two and deploy your application into a web worker. 

Consequently, using jQuery , `document` object, or `ElementRef.nativeElement` is not recommended as it's not available on other platforms such as server (for server-side rendering) or web worker.

In addition, permitting direct access to the DOM can make your application more vulnerable to **XSS** attacks.

# Solution 

Always try to prefer the `Renderer2` for DOM manipulations. It provides an API that can safely be used even when direct access to native elements is not supported.

- **Bad practice**
```ts
@Component({
  ...
  template: `
    <textarea></textarea>
    <my-child-component></my-child-component>
  `
})
export class SomeComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}
    
  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = '#fff';
    this.elementRef.nativeElement.style.display = 'inline';
    const textareaElement = document.querySelector('textarea');
    const myChildComponent = $('my-child-component');
  }
}
```

We can refactor this by using a combination of `ElementRef` and `Renderer2`.

- **Good practice**
```ts
import { MyChildComponent } from './my-child.component';

@Component({
  ...
  template: `
    <textarea #textareaRef></textarea>
    <my-child-component></my-child-component>
  `
})
export class SomeComponent implements OnInit {

  @ViewChild('textareaRef') myTextAreaRef: ElementRef;
  @ViewChild(MyChildComponent) myChildComponentRef: MyChildComponent;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
    
  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', '#fff');
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'inline');
    const textareaElement = this.myTextAreaRef.nativeElement;
    const myComponent = this.myChildComponent;
  }
}
```

# Resources

- [Angular Documentation for ElementRef](https://angular.io/api/core/ElementRef#description)
- [Exploring Angular DOM manipulation techniques using ViewContainerRef](https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02) by Max Koretskyi
