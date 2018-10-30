---
title: use trackBy option on *ngFor
source: https://github.com/mgechev/angular-performance-checklist#use-trackby-option-for-ngfor-directive
author:
  name: Minko Gechev
  url: https://twitter.com/mgechev
---

# Problem

The `*ngFor` directive is used for rendering a collection. By default `*ngFor` identifies object uniqueness by reference.

Which means when developer breaks reference to object during updating item's content Angular treats it as removal of the old object and addition of the new object. This effects in destroying old DOM node in the list and adding new DOM node on its place.

# Solution

We can provide a hint for angular how to identify object uniqueness: custom tracking function as the `trackBy` option for the `*ngFor` directive. Tracking function takes two arguments: index and item. Angular uses the value returned from tracking function to track items identity. It is very common to use ID of the particular record as the unique key.

```ts
@Component({
  selector: 'yt-feed',
  template: `
    <h1>Your video feed</h1>
    <yt-player *ngFor="let video of feed; trackBy: trackById" [video]="video"></yt-player>
  `
})
export class YtFeedComponent {
  feed = [
    {
      id: 3849, // note "id" field, we refer to it in "trackById" function
      title: 'Angular in 60 minutes',
      url: 'http://youtube.com/ng2-in-60-min',
      likes: '29345'
    }
    // ...
  ];

  trackById(index, item) {
    return item.id;
  }
}
```

# Resources

- ["NgFor directive"](https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html) - Official documentation for `*ngFor`
- ["Angular  —  Improve performance with trackBy"](https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5) - By Netanel Basal
