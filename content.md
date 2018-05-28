## Slogan


## Key selling points

The Angular checklist is a curated list of common mistakes made inside of Angular applications. Through our experience coaching Angular developers and auditing multiple Angular codebases, we found that we were often repeating the same points. The Angular checklist will hold these points and makes it possible to verify, and if good, check them off.

It will remember the checks you've made before which allows you to gruadually refactor parts of your application. Everytime new entries are made to the checklist, they will be visualised so you can use the Angular checklist as a way to stay up to date with future versions as well!

## Checklist points

### Architecture 




Architecture

Smart and Dumb Components
Do not reuse smart components (should be bound to a specific use case / route / page)
Dumb components are reusable and easy to test
Stream data to dumb components using the async pipe (avoid manual subscriptions as much as possible)
<dumb-comp [data]=“myData$ | async”></dumb-comp>
Smart component is responsible for managing the data, that is saving, updating, adding, removing etc. (CRUD operations)
Dumb components notify smart component by emitting events
In the case of dumb components, where some parts should be different based on the location the dumb component is being used, you can use content projection (optionally with different named slots).
Structure your app by feature not by type
app
app.module.ts
app.routing.module.ts
shell.component.ts
featureA (e.g. Policies)
container-components
presentation-components
pipes
services
state (if you use ngrx or redux)
feature-a.routing.module.ts
feature-a.module.ts
featureB
shared
services
components
dropdown
modal
Keep to try your directory structure as *flat* as possible
Try to avoid nested component structures
We recommend to refactor the directory structure. You don’t have to refactor to smart and dumb but you should really embrace this architectural pattern for new features.
Split your app into different layers
HTTP
State Management (Facades)
Don’t use http directly inside your components
State Management

Makes sense if you have the same piece of data in multiple formats on the same page and all places should be updated immediately when the data is changed (reactivity)
Do not use NgRx solely for caching purposes (use shareReplay(bufferSize))
If your application is mainly read-only, do not use something like redux
Make use of ngrx if you need to update a list (basic CRUD) without refetching the data every time. You can choose to either do this optimistically or pessimistically.
Performance

OnPush (requires immutable data structures)
If you don’t have immutable data structures keep in mind that the view of a component using OnPush is only updated when the Inputs have changed or if an event was triggered within the component.
Let Angular handle change detection and don’t use ChangeDetectorRef directly unless you have a specific use case where it makes sense. Normally Angular takes care of this and there’s no need to do this manually.
Don’t use property bindings for static data, e.g.:
<div [id]=“ ‘myId’ ”></div><—— DON’T DO THIS
<div id=“myId”></div><—— Do this instead
Be careful with your import statements
Don’t import everything from a library. Only import what you need.
Don’t use * imports because the module may not be modularised and tree-shakable
For lodash for instance use lodash-es instead
Inspect your bundles with source-map-explorer to find out if you import functions unnecessarily and also to keep and eye on your bundle-size.
Maybe even think about thresholds for your bundles.
With the Angular CLI you can define budgets (https://github.com/angular/angular-cli/wiki/stories-budgets)
This way the build process will error if you exceed that budget (limit) and will enforce to use modularized imports
Code Readability

Prettier (Code consistency)
One thing per file
Descriptive method names
Don’t comment what something does, comment why it does something
Break up large functions into smaller blocks (you want to be able to quickly understand what a function does)
This makes it much easier to test
RxJS

Get more acquainted with it!
Practice practice practice
If you need to manually subscribe to an observable in your component, a good approach to clean up your subscriptions when the component is destroyed is to use a Subject. Inside ngOnDestroy you can then call .next and complete (you want to complete the subject too, otherwise it will remain in memory). For your streams you can then use conditional operators like takeUntil to complete the stream when a value is emitted on the subject.
For example:
export class MyComponent implements OnInit, OnDestroy {

private destroy$ = new Subject<void>();

ngOnInit(): void {

myStream.pipe(takeUntil(this.destroy$)).subscribe(…);

}

ngOnDestroy(): void {

this.destroy$.next();

this.destroy$.complete();

}

}

Do coding dojos and focus on smaller problems to get more experienced and familiar with certain technologies.

Maybe 1 hour per week
Do this in pair programming and rotate. Every pair gets 5 minutes and then the next pair will take over
Try not to implement too complex applications
Max 10 people per dojo. You want everybody to be in the driver seat more than once.
General

Don’t use Angular Pipe Classes inside components. Extract the common functionality into a reusable utility function which is then used for instance inside the pipe and also in other places like a service.
Providers
Stick to forRoot and forChild convention when working with modules
If you import a module multiple times in your application (e.g. RouterModule) only import the service once with providers (forRoot) and for feature modules without providers (forChild)
This also applies to your own modules. If you have a shared module that comes with its own set of providers, you don’t want to provide the services multiple times which may result in multiple instances of the same services.
TypeScript

Don’t sprinkle the type annotations all over the place. Safe yourself some typing ;) and let TypeScript handle the rest.
Inside the tsconfig.json you can set a flag noImplicitAny: true which when set to true helps you during development because the compiler will complain when the type some property etc. cannot be inferred. Basically you only need to add type annotations for things where TypeScript is not smart enough.
This is discussable. Discuss this with the team. There’s no right or wrong. If you agree to add types to everything, then stay consistent.