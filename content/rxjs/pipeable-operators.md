---
title: use pipeable operators
---

# Problem

Since the release of RxJS 6, patch operators have been removed. This means that we can no longer use them.

This means the following is no longer possible:

```ts
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

Observable.interval(1000)
  .filter(x => x % 2 === 0)
  .map(x => x*2)
  .switchMap(x => mapToObservable(x))
```

# Solution

Instead, we should be using pipeable operators.

```ts
import { interval } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

Observable.interval(1000)
  .pipe(
    filter(x => x % 2 === 0),
    map(x => x*2),
    switchMap(x => mapToObservable(x)),
  );
```

Even if you are using the older versions of RxJS, all new code should be written using pipeable operators.

## Upgrading

If you have a lot of code written using patch operators, you can use a script released written by Google engineers to do this upgrade automatically for you. You can find the script and how to use it in the [rxjs-tslint](https://github.com/ReactiveX/rxjs-tslint#migration-to-rxjs-6) package.
