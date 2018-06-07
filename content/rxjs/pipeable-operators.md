---
title: Pipeable Operators
---
### Pipeable Operators

Since the release of RxJS 6, patch operators have been removed. 

You should not use patch operators anymore and avoid to write code like this:

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

Instead, you should write your code like this:

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


