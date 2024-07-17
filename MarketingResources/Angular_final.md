

### Array.prototype.slice()

The **`slice()`** method returns **a shallow copy** of a portion of an array into a new array object selected from `start` to `end` (`end` not included) where `start` and `end` represent the index of items in that array. The original array will not be modified.

```typescript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]

```

### Array.prototype.splice()

The **`splice()`** method changes the contents of an array by removing or replacing existing elements and/or adding new elements

```typescript
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]

```

### Object, know the value, how to find the key

```js
  return Object.keys(object).find(key => object[key] === value);
```

### reusable component

Use @input to pass parameters and Use ngFor or NgSwitch 

**Get  the absolute difference of diagonal of N*N matrix**

![image-20210510140153770](/Users/hecate/Library/Application Support/typora-user-images/image-20210510140153770.png)



### Modules: core-share-feature

**What is Module?**

Modules are ways of ==bundling Angular building blocks together==, that would be components, directives, services, pipes. So Angular **analyzes these NgModules to understand your application and its features**

You can't use a certain feature or building block without including it in a module. How you include it?  **Add it to declarations or providers depends on the feature you are talking about**.

- Feature Modules
  - A feature module is a module in which all of the content is going to be **encapsulated** inside of a single area.
  - Think of a feature module as a mini stand alone application inside your full application.
  - ==saperate the code and implement lazy loading== --> increace perfomance efficiency

- Shared Modules
  - Use shared modules for pieces of your application that need to **be used across multiple m** (features) of your application.
  - If a component is going to be re-used in multiple features, declare it in a shared module. --> **Avoid code duplication.**
  - Services and Pipes are more commonly declared in shared modules.

- Core Module
  - I (and many others) prefer to use a core module as a way to **separate the configuration layer** of your application with the rest of your application.
  - To do so, you declare all of your feature and shared modules in your `CoreModule` and just provide your `CoreModule` to your `AppModule`
  - For anything that needs to be used across all feature modules, declare it in the `CoreModule.

[**Webpack**](https://webpack.github.io/) is a popular module bundler, a tool for bundling application source code in convenient ***chunks*** and for loading that code **from a server into a browser**.  A *bundle* is a JavaScript file that incorporates *assets* that *belong* together and should be served to the client in a response to a single file request. A bundle can include JavaScript, CSS styles, HTML, and almost any other kind of file.

==The **Angular** build process uses **webpack** behind the scenes to transpile TypeScript to JavaScript, transform Sass files to CSS, and many other tasks==. **Webpack** module loaders are able to parse different file types. This allows, for example, **Angular** TypeScript files to **use** the import statement to import stylesheet files.

Browsers have very limited support for JavaScript modules. In practice, any JavaScript application loaded into the browser should be contained in a single source file. On the other hand, it is good software development practice to separate out code into modules contained in separate files. **When deploying a JavaScript application for the browser, the modules must then be built into a single source file.** **Bundling multiple modules into a single file is the main purpose of webpack.**

### Reactive forms 

**GIVE you more control**

**Reactive forms** are more robust: they’re more scalable, reusable, and testable. If forms are a key part of your application, use reactive forms.

**Reactive Forms Features**

- More **flexible**

- Handles any **complex scenarios**

- No data binding is done (**immutable data model** preferred by most developers)

- By using reactive form, it is possible to

  - Handling a event based on a **debounce time**
  - Handling events when the components are **distinct until changed**
  - Adding elements **dynamically**

- Easier unit testing

- **Scalability**

  A **scalable web** application will be able to handle an increase in users and load, without disrupting the end users.

  ![image-20210428165308546](/Users/hecate/Library/Application Support/typora-user-images/image-20210428165308546.png)

### 

### ==Dependency injection==

The Inversion of Control (IoC) and Dependency Injection (DI) patterns are all about removing dependencies from your code.

What is Inversion of Control?

If you follow these simple two steps, you have done inversion of control:

1. ==Separate **what**-to-do part from **when**-to-do part==.
2. ==Ensure that **when** part knows as *little* as possible about **what** part; and vice versa==.

There are several techniques possible for each of these steps based on the technology/language you are using for your implementation.

The *inversion* part of the Inversion of Control (IoC) is the confusing thing; because *inversion* is the relative term. The best way to understand IoC is to forget about that word!

### Authentication flow

Yes, we have a login and a signup form. When the user enter their email and password to sign up, the server will generate a **JWT** and send it back to the client. The token will be stored in the local storage or cookies. When the user sends a new HTTP request, we use HTTP **interceptor** to inject the token into the header. Once the server receives the token, it will **decrypt** it to confirm it’s from an authorized user. We also use auth guard, the CanActivate() to prevent invaild user accessing some pages. That’s how we do user authentication. 

In one of my previous projects, the applications also support third-party login, like Google or Facebook login. Those third-party logins also use tokens. For example, for Google login, the server will check your **Google access token** instead of the user name and password. 

### JWT

JSON Web Token (JWT) is used for authentication and authorization. It just a way to let back-end know who are accessing the data. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. 

The token is mainly composed of **header, payload, signature**. These three parts are separated by dots(.)

A header in a JWT is mostly used to describe the cryptographic operations applied to the JWT like signing/decryption technique used on it. It can also contain the data about the media/content type of the information we are sending.This **information** is present as a JSON object then this JSON object is encoded to BASE64URL. The cryptographic operations in the header define whether the JWT is signed/unsigned or encrypted and are so then what algorithm techniques to use.

The payload is the part of the JWT **where all the user data is actually added**. This data is also referred to as the ‘claims’ of the JWT.This information is readable by anyone so it is always advised to not put any confidential information in here. This part generally contains user information. 

**Signature is used to verify the authenticity of token.** BASE64URL encoded header and payload are joined together with dot(.) and it is then hashed using the hashing algorithm defined in a header with a secret key. This signature is then appended to header and payload using dot(.) which forms our actual token *header.payload.signature*



back-end will validate the Signature and our fornt-end will also decode it

### Cookies

A cookie is just a string that contains some data which is **stored on your browser**. It gets sent to the server **with every http request**. Cookie is also **domain specific**. One website’s cookies cannot be accessed by other websites. There are usually three main use cases for cookies. First is for user authentication, we use cookies to store the token. Second is to store user preferences such as theme, font, etc. Third is to track user behaviors/path on a website.

Cookies are stored on the client-side and are transferred to the server on every request sent to the server. This makes cookies **less secure**

Is cookies secure --> not really 

Cookies have a storage limit. We can’t store more data into cookies after a certain limit
Cookies can be disabled by using some browser extension tools
Storing data in cookies required some extra code

How to make cookies security (http-only)

An **HttpOnly Cookie** is a tag added to a browser **cookie** that prevents **client-side scripts from accessing data**. It provides a gate that prevents the specialized **cookie** from being accessed by anything other than the server.



### Improve the performance

Slowness

check the chrome dev tool

usually it depends on what kind of problem it is.

check the performance tool, waterfall time

**Lazy loading** --> Rendering only those parts of the page that are visible to the user at the moment.

Lazy rendering is useful if your SPA spends a lot of time in the render phase. At this stage, the app creates the [DOM](https://www.w3schools.com/js/js_htmldom.asp) (the specification of how text, images, and other objects are represented on the page) for all the components on the page.

Physical network problem --> **CDN** Content Delivery Network

Using CDNs for Single Page Applications means faster loading of scripts and decreased time-to-interactive. Increased security is a nice bonus.

**Server side pagenation** --> for data that maybe increment a lot in the later or large dataset

**Client side pagenation** --> For someone who is interacting with the data frequently, the more the Client has to request the data from the server.

### First loading problem

**1.Lazy loading** **feature module** --> Optimizing the size of the main bundle

**Making the main bundle as small as possible**. Lazy loading helps with that as we can keep the visible parts, relevant to the initial route in the main bundle and **lazy load everything else in separate bundles**.

**2.Using optimized images and lazy loading images**

Using lazy laod on images greatly helps in improving page load speed. Lazy loaded images gets loaded only when image comes in user’s view area. So this reduces extra laoding time at the beginning. You can **put a dummy image of very small size at the place of real image until it gets lazy load.**

**3. AOT**

Angualr cli already provides production flag “ — prod” to **compile ahead of time** and **reduce the build size** .

Another thing you can do is to use **webpack bundle analyzer** to analyse which package causing too much increase in bundle size and replace that package with another package if you can.



### AOT

==Ahead-of-Time Compilation==. Usually in compile time, Angular will compile ts code and our templates and then use the logic to update the real DOM. By default, It happens all in our browser. AoT compilation means that process happens during development **as part of the build process**. **It is a new feature in Angular 9.** Before A9, we just use JOT.

It makes rendering faster. The browser loads executable code so it can render the application immediately, without waiting to compile the app first.

**Why AOT?**

- ==*Faster rendering* With AOT==, the browser downloads a pre-compiled version of the application. The browser loads executable code so it can render the application immediately, without waiting to compile the app first.
- *==Fewer asynchronous requests==* The compiler *inlines* external HTML templates and CSS style sheets within the application JavaScript, eliminating separate ajax requests for those source files.
- *==Smaller Angular framework download size==* There's no need to download the Angular compiler if the app is already compiled. The compiler is roughly half of Angular itself, so omitting it dramatically reduces the application payload.
- ==*Detect template errors earlier*== The AOT compiler detects and reports template binding errors during the build step before users can see them.
- *==Better security==* AOT compiles HTML templates and components into JavaScript files long before they are served to the client. With no templates to read and no risky client-side HTML or JavaScript evaluation, there are fewer opportunities for injection attacks.

### NG0100: Expression has changed after it was checked[*link*](https://angular.io/errors/NG0100#ng0100-expression-has-changed-after-it-was-checked)

Angular throws an `ExpressionChangedAfterItHasBeenCheckedError` **when an expression value has been changed after change detection has completed.** Angular only throws this error in development mode.

In dev mode, Angular **performs an additional check after each change detection run**, to ensure the bindings haven’t changed. This catches errors where the view is left in an inconsistent state. This can occur, for example, **if a method or getter returns a different value each time it is called**, **or if a child component changes values on its parent**. If either of these occur, this is a sign that **change detection is not stabilized**. Angular throws the error to ensure data is always reflected correctly in the view, which prevents erratic UI behavior or a possible infinite loop.

This error commonly occurs when **you’ve added template expressions to implement lifecycle hooks** like `ngAfterViewInit` or `ngOnChanges`. It is also common when dealing with loading status and asynchronous operations, or a child component changes its parent bindings.

**Debugging the error**

The [source maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) generated by the CLI are very useful when debugging. Navigate up the call stack until you find a template expression where the value displayed in the error has changed.

Ensure that there are no changes to the bindings in the template after change detection is run. This often means refactoring to use the correct [component lifecycle hook](https://angular.io/guide/lifecycle-hooks) for your use case. If the issue exists within `ngAfterViewInit`, the recommended solution is to use a constructor or `ngOnInit` to set initial values, or use `ngAfterContentInit` for other value bindings.

If you are binding to methods in the view, ensure that the invocation does not update any of the other bindings in the template.

### Angular6 to 8

**Angular 6** was released on May 4th, 2018.

Creating a widget or component that can be included in any existing web page was made possible with **Angular Elements.**

**ng-add** helps you install and download new packages in your angular apps.

How: Update to v7 of the core framework and CLI by running `ng update @angular/cli@7 @angular/core@7` in your terminal.

Angular7:

- **Virtual Scrolling:** Virtual scrolling enables loading and unloading elements from the DOM based on the visible parts.
- **Drag & Drop:** The **@angular/cdk/drag-drop** module provides a better way to easily create drag and drop interfaces.

Angular8:

- Angular 8 was released in May 2019.

- For lazy loading, import used to be a string, now it you need to import a callback function

- #### Ivy Engine

  Ivy is a major part of this release, and it took most of the effort from Angular 6 to release it. Ivy is a new rendering engine that will produce smaller bundle sizes. **AOT** 

### Drag & drop

The new drag-drop module basically provides a better way to easily create drag & drop interfaces, which is backed by sorting within a list, support for **free dragging, animations, custom drag handles, transferring items between lists,** previews, and placeholders. In simple terms, the Drag-and-Drop support has now been implemented in CDK and it also includes automatic rendering as the users relocates items.

### Virtual scrolling

Like mentioned earlier, the new Virtual Scrolling in Angular 7 basically **loads and unloads items from the DOM depending upon visible parts of lists**, **resulting into a much faster experiences for users having huge scrollable lists.**

This virtual scrolling package basically provides helpers, which react to all scroll events. Simply put, it activates a high-performant way by making the height of container element exactly same as the height of total number of remaining elements to be rendered. This, in turn, **then renders the only visible items in view, creating faster experiences for the end-users.**

### Angular4 to 5

**Angular4**

- Angular 4 was released in March 2017.
- Introduced HttpClient, a smaller, easier to use, and more powerful library for making HTTP Requests.
- No need to write a pattern for email validation in Angular 4.
- Using the **pipe** method to combine operators

### Anguler9

Ivy is a default compiler in Angular 9. It reduces the bundle size by 25-40 percent which enables better performance. This enables the developers to decrease the size of files making them user-friendly. 

- The AOT builds will be noticeably faster ensuring a significant change in the compiler's performance.

### Angular 11

- **Faster builds**- thru faster compilation w/  TS v4.0 & when installing dependencies, the ngcc update process is now 4x faster

- Experimental Webpack 5 support:  [module federation](https://webpack.js.org/concepts/module-federation/). 

  

### Lifecycle

**ngOnChanges** --> Called after a bound input changes.

**ngOnInit** --> Called once the component is initialized

**ngDoCheck** --> Called during every change detection run

**ngAfterContentInit** --> Called every time **the content(ng-content) has been projected into views**

**ngAfterContentChecked()**-->Called every time the projected content has been checked

**ngAfterViewInit()** -->Called once after the first ngAfterContentChecked()

**Means we have already generate template, like for angular pagination**

**ngAfterViewChecked()** -->Called after the ngAfterViewInit() and every  subsequent ngAfterContentChecked().

**ngOnDestroy()**-->Called immediately before Angular destroys the directive or component.

![image-20210510142248637](/Users/hecate/Library/Application Support/typora-user-images/image-20210510142248637.png)

<img src="/Users/hecate/Library/Application Support/typora-user-images/image-20210409105349459.png" alt="image-20210409105349459" style="zoom:50%;" />





### Communication between components

There are four ways to communicate between components:

1. **@viewchild**

   Parent can get the data in Child

2. Pass Data from URL

   There are two ways to pass the data through URLs in Angular:

   - Router Parameters
   - Query Params

   Router parameters are required parameters. If the parameter is mandatory for the component then we have to use **router parameter**. Otherwise, we can use **query params**. **We have to register the parameter with the URL in the router module**. Pass router param through routerLink directive or pass router param through Router Service. 

3. Pass Data through @Input and @Output

   If we want to pass data from a child to a parent or a parent to a child component we can use @Input and @Output.

   ```
   @Output() outputEvent = new EventEmitter<number>();
    click(value: number) {
       this.outputEvent.emit(value);
     }
   ```

4. Pass Data Through a Service Using Observables

   Service and use **behaviorsubject** to pass data

5. Ngrx

   It might be the overkill for small applications, although this is an easy way to create data streams across the app. The workflow of making changes to a state is pretty simple. First, you dispatch an action, which is an object with type and payload properties. Then you run a reducer function. The reducer is a simple function, which receives the current state and action, and returns a new state based on action type. Finally, all subscribers get notified by the new state.

### How to set logic for each HTTP request/How to handle API call

In my previous project, I create a service and use HTTPclient Module, the get, post, put, update and delete request to make different HTTP call.

And we use providedIn to provide the dependency to components.



### We have` <base href="/">`, how it works in angular?

The **HTML** **<base>** **element** specifies the base path to use for all *relative* URLs in a document. There can be only one <base> element in a document.

1. Set any URL you choose as the base for all relative URLs.

2. Set default link targets.

   Angular CLI 

   build

routerLink



### In the TS file how to navigate to the target page without routerLink , how to set parameters for it.

**Router Module**

this.router.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: '1' })

this.router.navigate(['edit'], { relativeTo: this.route });



### In the target component, how to get the parameter from the router?

**ActivatedRoute** Module

**Use Query params**
this.route.**queryParams**.subscribe(
(params: Params) => {
this.allowEdit = params['allowEdit'] === '1' ? true : false;
}
);



### How to handle the HTTP error.

The `HttpClient` captures the errors and wraps it in the generic `HttpErrorResponse`, before passing it to our app. The `error` property of the `HttpErrorResponse` contains the underlying `error` object. It also provides additional context about the state of the HTTP layer when the error occurred.

**handle general Http error**

the error will return the `error response` with the [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) such as 401 403 404

Http interceptor to listen to all the req

redirect user to the login page

The Error Interceptor **intercepts http responses from the api** to check if there were any errors. If there is a `401 Unauthorized` or `403 Forbidden` response the user is automatically logged out of the application



For the special errors

in component, In the subscirbe function, we can provide a second method

we have our own error state management, the error will trigger the notification service

popup the error message

### How to know if the user has permission to switch to the target page.

route guard 

it does this by implementing the `CanActivate` interface which allows the guard to decide if a route can be activated with the `canActivate()` method.

canActivate()

user state management 

role based permission, we have a role module

user can have multiple roles

### role based permission

In UserStatemanagement Service, we have the UserRoleInfo, like Canview, canEdit

we use route guard with canActivate to check the UserRoleInfo, if no authenticated, we should not let user see the page, so we can redirect it.

I will redirect the user to the login page or 404 pages. 

How to redirect ?

route has history, which can access your previous url



### Are you familiar with typescript?

type safety -> reduce runtime error

It has declaration file .d.ts → better coding and better understand 

### Can the browser accept the typescript? What does angular do？

Webpack compiles a TypeScript file using `ts-loader` package which asks Typescript Compiler to do the compilation. 



## 🌶libuv

## 🌶Proxy



# Build a dynamic form by myself

Q6 give a Json data and convert it into a form which has two formControl

One is name control one is title control

Time --> dropdown

https://stackblitz.com/fork/angular-ivy?file=src%2Fapp%2Fapp.component.ts

![image-20210506193800688](/Users/hecate/Library/Application Support/typora-user-images/image-20210506193800688.png)

```typescript
  myForm: FormGroup;
this.myForm = new FormGroup({
      name: new FormControl('Sammy'),
      email: new FormControl(''),
      message: new FormControl('')
    });
```



### Get value and make http call

![image-20210506194457603](/Users/hecate/Library/Application Support/typora-user-images/image-20210506194457603.png)

![image-20210506194510356](/Users/hecate/Library/Application Support/typora-user-images/image-20210506194510356.png)



### How to handle login error

We can use a middleware. We used to set the logger inside of the httpError Intercepter

### If the error not from an API call, how to catch these errors

In subscribe function, we can catch in the error function, the second parameters, the seconde callback in the subscribe.

### How do you protect a route?

Route Guard

**canActive, canDeactive, canActiveChildren**

### We need to build a platform, you build web sets with multiple sub modules, you use multiple angular projects. How can build it?

Micro-front-end

modul federation provide by webpack5 

First we need to create a container app and create different page as feature app that we be inside of the container app. 

They can be developed indenpendently

### When you build this single page project, these components have their own host? How does this happen? How do these separate hosts work together?

it will not host the app, it will host the js resource. The container app will import the feature app js resource using **remoteEntry** from webpack

Set up webpack, with the config, 

### If you want to build features as a package, how do you do this? How to share these features, how to share the services between packages.

feature app as a package

For SAP, it will be just js code, and js will generate the page

Angular package is more for the library , you can export it to other project

### Using media queries

**Media queries** are useful when you want to **modify your site or app depending on a device's general type** (such as print vs. screen) or specific characteristics and parameters (such as screen resolution or browser [viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport) width).

@media screen and (max-width: 600px) {
 .column {
  width: 100%;
 }
}

### Share service between packages and app?

If you want to share something between multiple Angular projects that was pretty tricky. 

- Create a package contains shared code and publish it to private or public NPM registry
- create global object, a window object 

Customize event

### How to reduce the bundle size

render.js is so big, how to reduce its size

AOT compiler

Lazy loading

It will not load the whole js file at first

webpack will separate into small chunks

it will be chunk.js for feature modules



### How to manage the JWT expire time in your project, how to renew the JWT?







https://angular.io/guide/build

https://owasp.org/www-community/attacks/xss/

https://gist.github.com/soulmachine/b368ce7292ddd7f91c15accccc02b8df

https://www.maestralsolutions.com/angular-application-state-management-you-do-not-need-external-data-stores/

https://chartio.com/resources/tutorials/using-common-table-expressions/

### JWT token expire and revoke

Check expiration time 

5hs before expiration 

SettimeOut() 

send refreshing request to back-end 

## Coding interview

Write a subject

https://stackblitz.com/edit/typescript-retcgn

```typescript
class Subscription {
  unsubscribe: any;

  constructor(subscribers, subscriber) {
    this.unsubscribe = () => {
      subscribers = subscribers.filter(sub => sub !== subscriber);
    };
  }
}

class Subject {
  subscribers: any[];

  constructor() {
    this.subscribers = [];
  }

  next(value: any) {
    this.subscribers.forEach(subscriber => subscriber.next(value));
  }

  error(errMessage: string) {
    this.subscribers.forEach(subscriber => subscriber.error(errMessage));
    this.subscribers = [];
  }

  subscribe(...callback) {
    let next, error;

    let newSub = {
      next: () => {},
      error: () => {}
    };
    if (callback.length === 1) {
      next = callback[0];
      newSub = typeof next === 'function' ? { ...newSub, next } : next;
    } else if (callback.length === 2) {
      next = callback[0];
      error = callback[1];
      newSub = { next, error };
    }

    this.subscribers.push(newSub);
    return new Subscription(this.subscribers, newSub);
  }
}

const mySubject = new Subject();

const sub1 = mySubject.subscribe(
  value => console.log('sub1', value),
  errMsg => console.warn('sub1', errMsg)
);

const sub2 = mySubject.subscribe(value => console.log('sub2', value));

mySubject.next(1);

sub2.unsubscribe();

mySubject.next(2);

mySubject.error('error');

mySubject.next(3);

```

BehaviorSubject

https://stackblitz.com/edit/typescript-nyxwxz

```typescript
import value from '*.json';

class Subscription {
  unsubscribe: any;

  constructor(subscribers, subscriber) {
    this.unsubscribe = () => {
      subscribers = subscribers.filter(sub => sub !== subscriber);
    };
  }
}

class BehaviorSubject {
  subscribers: any[];
  value: any;

  constructor(val) {
    this.subscribers = [];
    this.value = val;
  }

  next(value: any) {
    this.value = value;
    this.subscribers.forEach(subscriber => subscriber.next(this.value));
  }

  error(errMessage: string) {
    this.subscribers.forEach(subscriber => subscriber.error(errMessage));
    this.subscribers = [];
  }

  subscribe(...callback) {
    let next, error;

    let newSub = {
      next: () => {},
      error: () => {}
    };
    if (callback.length === 1) {
      next = callback[0];
      newSub = typeof next === 'function' ? { ...newSub, next } : next;
    } else if (callback.length === 2) {
      next = callback[0];
      error = callback[1];
      newSub = { next, error };
    }
    newSub.next(this.value);
    this.subscribers.push(newSub);
    return new Subscription(this.subscribers, newSub);
  }
}

const mySubject = new BehaviorSubject(11);
const sub1 = mySubject.subscribe(value => console.log('sub1', value));
mySubject.next(1);

const sub2 = mySubject.subscribe(
  value => console.log('sub2', value),
  errMsg => console.warn('sub2', errMsg)
);

mySubject.next(2);
```

ReplaySubject

https://stackblitz.com/edit/replay-subject-by-hecate?file=index.ts

```typescript
import value from '*.json';
import { ReplaySubject } from 'rxjs';
class Subscription {
  unsubscribe: any;

  constructor(subscribers, subscriber) {
    this.unsubscribe = () => {
      subscribers = subscribers.filter(sub => sub !== subscriber);
    };
  }
}

class MyReplaySubject {
  subscribers: any[];
  len: number;
  values: any[];

  constructor(cnt) {
    this.subscribers = [];
    this.values = [];
    this.len = cnt;
  }

  next(value: any) {
    if (this.values.length === this.len) {
      this.values.shift();
    }
    this.values.push(value);
    this.subscribers.forEach(subscriber => subscriber.next(value));
  }

  error(errMessage: string) {
    this.subscribers.forEach(subscriber => subscriber.error(errMessage));
    this.subscribers = [];
  }

  subscribe(...callback) {
    let next, error;

    let newSub = {
      next: () => {},
      error: () => {}
    };
    if (callback.length === 1) {
      next = callback[0];
      newSub = typeof next === 'function' ? { ...newSub, next } : next;
    } else if (callback.length === 2) {
      next = callback[0];
      error = callback[1];
      newSub = { next, error };
    }
    this.values.forEach(x => newSub.next(x));
    this.subscribers.push(newSub);
    return new Subscription(this.subscribers, newSub);
  }
}

const mySubject = new MyReplaySubject(2);
const sub1 = mySubject.subscribe(value => console.log('sub1', value));

mySubject.next(2);
mySubject.next(6);
mySubject.next(1);
mySubject.next(13);

const sub2 = mySubject.subscribe(
  value => console.log('sub2', value),
  errMsg => console.warn('sub2', errMsg)
);
// const RealSubject = new ReplaySubject(2);
// const sub3 = RealSubject.subscribe(value => console.log('sub3', value));

// RealSubject.next(1);
// RealSubject.next(3);
// RealSubject.next(5);
// RealSubject.next(7);
// const sub4 = RealSubject.subscribe(
//   value => console.log('sub4', value),
//   errMsg => console.warn('sub4', errMsg)
// );

```

**number Pad**

https://stackblitz.com/edit/angular-ivy-gxandw?file=src%2Fapp%2Fapp.component.css

Html code 写一个function --> 找className

root -> root node

# Element.classList

The `Element.classList` is a read-only property that returns **a live [`DOMTokenList`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) collection of the `class` attributes of the element.** This can then be used to manipulate the class list.

Using `classList` is a convenient alternative to accessing an element's list of classes as a space-delimited string via [`element.className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className).



The `DOMTokenList` interface represents a set of space-separated tokens. 

[`DOMTokenList.length`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/length) Read only

Is an `integer` representing the number of objects stored in the object.

[`DOMTokenList.value`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/value)

A stringifier property that returns the value of the list as a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString).

```typescript
function getByClassName(root, className){
	Let stack = [root];
	Let result = [];
	while(stack.length>0){
		let curr = stack.pop();
		let checkClass = curr.className.split(“ “).some(ele=>{
				Return ele === className;
})
		if(checkClass){
			Result.push(curr)
}
for(let i = 0;i<cur.children.length;i++){
	stack.push(cur.children[i]);
}
         }
	Return result
}

```

```typescript
//DFS
function getByClassName(root, className){
  Let stack = [root];
	Let result = [];
	while(stack.length>0){
		let cur = stack.pop();
		if (Array.from(cur.classList).includes(className)){
			result.push(cur)
		}
    for(let i = 0;i<cur.children.length;i++){
      stack.push(cur.children[i]);
    }  
    return result
}
```

**Auto-complete and search**

```html
<body>
	<input list="labels" name="label" id="label" onchange="handleOnchage(event)">
<datalist id="labels">
  <option value="label1">
  <option value="label2">
  <option value="label3">
  <option value="label4">
  <option value="label5">
</datalist>

<table id="demo-table">
</table>



<script>
	const data = [
{title:"Ticket1", label:'label1,label2',status:'pending'},
{title:'Ticket2', label:'label2',status:'pending'},
{title:'Ticket3', label:'label3',status:'pending'},
{title:'Ticket4', label:'label4',status:'pending'}
]
// let displayData;
function handleOnchage(event){
	let displayData = data.filter(item => {
  return item.label.toLowerCase().includes(event.target.value.toLowerCase());
});

	let tmp = generateTableTmp(displayData);
	render(tableElement,tmp)
}

function generateTableTmp(dataList){
	return dataList.map(item => ` 
		<tr>
			<td>${item.title}</td>
			<td>${item.label}</td>
			<td>${item.status}</td>
			</tr>`).join('');

}
function render(element,template){
	element.innerHTML = template
}

const tableElement = document.getElementById("demo-table");
render(tableElement, generateTableTmp(data))

</script>


</body>
```



### Test and TDD

Whenever I finished a ticket, I use Jasimine and Karma to do the unit test. Jasmine - Behavior driven  (user behavior scenarios : it should show __ if you click ___)

- we use **Describe()** to declare a suite of tests, 

- use **it()** to declare a single test,

- use **expect()** to test if the output as expected.


Our QA team use **cypress** to do the end-to-end test.

End-to-end: Test front-end AND back-end; entire application

​	**-**Ex: Test the website server from the URL (test it as a real human) not just in local; simulating clicking events

For TDD test-driven development, our team will take about testing before the development, it is really helpful that we can make sure the more smooth development process.

### OOP VS Functional programming

For functional programming, the core is using pure functions and immutable data. It attempts to avoid changing state and mutable data. In a functional program, the output of a function should always be the same, given the same exact inputs to the function. Its functions have no side effects means it does not impact code running on multiple processors. [Functional programming is used](https://www.educba.com/functional-programming-in-javascript/) for performing many different operations for which the data is fixed. Object-oriented programming used for performing a few operations which are having common behavior and different variants.

For Object oriented programming, we use **objects** to represent things you are programming about. data is stored in objects and it is mutable. Object-oriented programming based on some main features that are: **1. Abstraction:** It helps in letting the useful information or relevant data to a user, increasing the program’s efficiency and making things simple. **2. Inheritance:** It helps in inheriting the methods, functions, properties, and fields of a base class in the derived class. **3. Polymorphism:** It helps in doing one task in many ways with the help of overloading and overriding, which is  also known as compile-time and run-time polymorphism, respectively. **4. Encapsulation:** It helps in hiding irrelevant data from a user and prevents the user from unauthorized access.

In functional programming, the main focus of programming is *what are we doing*. In object-oriented programming, the main focus of programming is *how are we doing*.

### Do you familiar with any design pattern?

As an angular programmer, I very familiar Dependency Injection pattern. It makes a class independent of its dependencies by decoupling the usage of an object from its creation. This helps you to follow SOLID principle. The  [dependency inversion](https://stackify.com/dependency-inversion-principle/) and [single responsibility principles](https://stackify.com/solid-design-principles/). It improve the reusability of our code. They also aim to reduce the frequency with which you need to change a class. That enables you to **replace dependencies without changing the class that uses them.** It also reduces the risk that you have to change a class just because one of its dependencies changed.



I also used singleton pattern a lot. It requires that no matter how many times you try to instantiate a class, you’ll only have one instance available. This is a great pattern to handle things such as database connections, since you’ll probably want to only handle one at a time, instead of having to re-connect on every user request.



By using Angular, I also use Observable all the time. Essentially the pattern states that you have a set of observer objects, which will **react to changes in the state of the observed entity.** In order for this to happen, once a change is received at the observed end, it is responsible for notifying its observers by calling one of its methods. In angular, we always use Observable to listen to the state change and do the data communication between components.



### Do you have any experience about RESTful API?

I worked very closely with Back-end team to develop restful API. You know, we need to manage and display dynamic data to the dashborad module. So I use RESTful API to fetch data and post user input. User can also modify the data



# Backend

```
How could your consume back-end RESTful APIs in Angular application?
5. How could you call two APIs synchronously?

```

# Angular

### What is Angular?

Angular is a **TypeScript-based** platform, you can use it to build applications for web/mobile/desktop. Unlike Reactjs, Angular presents all the front-end solutions on it, like Router, HttpClient, and so on, 

it also encourages developers to use **observable** to transfer data inside the application, by using observable, the application can handle completed logic very well.

Angular advantages: 

**Long-term support, google support angular,** 

**Microsoft support typescript** 

**RXJS**

**Complete solution for all problems, HttpClient, router, ...**

### Why do you like use Angular?

**Typecript**

**Angular CLI**

**New feature**

**Aot compiler**

### 🍓Angular VS JQuery

a.  [Jquery is a library used](https://www.educba.com/jquery-queryselector/) for **DOM manipulation**, whereas Angular is a **TypeScript-based** **framework**. It used to create SPA (single page applications).
b. Jquery does not have two-way binding features(**uni-directional**), whereas Angular(**bi-directional)** has key features like routing, directives, two-way data binding, models, dependency injection, unit tests etc.
d. Jquery becomes complex and difficult to maintain when the size of the project increases, but in the case of Angular, things are different as they are manageable at a big project size.

![image-20210426163424679](/Users/hecate/Library/Application Support/typora-user-images/image-20210426163424679.png)

### 🍓Angular VS angularJS

One vital distinction between [Angular](https://angular.io/) vs [AngularJS](https://angularjs.org/)[ ](https://www.ebuilderz.com/angular-vs-angularjs/)is AngularJS is ==[JavaScript](https://stackify.com/a-practical-guide-to-javascript-debugging/)-based== while Angular is ==TypeScript based==. These two frameworks have similarities as a front end, open-source platform that create dynamic SPAs. 

AngularJs base on model-view-controller (**MVC**) pattern, Angular is a **component-based** on UI approach;

AngularJS does not provide mobile support while Angular supports mobile.

Angular easy to create **SEO-friendly** applications. AngularJs difficulty to do this.

##### 

**Model**: The model is where all data is stored.

**View:** The view generates the output after reviewing the information in the model.

**Controller:** The controller receives the input and converts it to commands which it sends to the model and view.



Why Angular is better?

**Long-term support**

**google support angular**

**Microsoft support typescript and rxjs,** 



### 🍓React vs Angular?

Angular, a TypeScript-based **framework**, and React, a JavaScript **library**

Angular allows **two-way data binding** while React allows **one-way data binding.**

Two-way data binding means that any changes you make to the model affect the view, and vice versa. One-way data binding means any changes you make to the model affect the view, but not the other way around. This way, the data only flows in one direction.

**Angular** uses the **browser's DOM,** while **React** uses **a virtual DOM.**

**A virtual DOM** is a simplified version of the DOM. By using a virtual DOM, you can change any element very quickly and without needing to render the whole DOM. It drastically changes the performance from good to excellent. Imagine the difference in performance in needing to render all 100 items when just a single item is changed, then just rendering a single changed item and not rendering the rest.



**React** is best for creating:

- **Dynamic Applications:** React will be a great choice because it uses a virtual DOM. It can quickly incorporate and "react" to the data changes made in the view by the users.
- **Single Page Apps:** React will be a great solution because it can display all changes made to the content without reloading the current page.
- **Native Mobile Apps:** If you wish to create a native mobile app, there is nothing better than React Native. You will be creating apps written in JavaScript with equal performance and feel of apps created in Java or Objective-C. **Angular** is ideal if you have a large application and you need strict code structure and base.

**Angular** is best for creating:

- **Cross-platform Mobile Apps:** Angular 2+ has great support for mobile apps, as it was created for that very purpose. It addresses limiting factors such as navigation via touch, different screen sizes, and mobile hardware.
- **Enterprise Software:** Because Angular uses an MVC architecture, it is great for creating enterprise level apps.
- **Progressive Web Apps and Hybrid Mobile Apps:** Angular 2, in combination with Ionic 2, is a perfect tool for building hybrid apps. The same technology stack can be used for progressive web app development. Angular 2 (and up) comes with a mobile toolkit which makes developing mobile apps extremely easy and quick.



##### **What Is a Framework?**

A software framework (be it front-end or backend) includes standardized, pre-written code, which makes the development of certain functionalities easier and faster. You have **less freedom to code**, as you have to code as the framework architecture dictates.

##### **What Is a Library?**

A library is **a collection of functions and functionalities**, which you can use to achieve a certain end. You have **more freedom to design** and construct the system when using a library, but that adds more responsibility on the coder to be able to use it efficiently and find the right library for the right job, because, for projects which need to grow over time and become more serious, this could become significantly riskier and more difficult to manage.



1. 

### 🍓Talk about pipes.(Did you use any filters(AngularJS) in you project?)

In my previous project, we basicly use Angular 2+, filter is the attribute of AngularJS. In my project, we use pipe in the template to **format data** or get the data from observables. We have many build-in pipes in Angular, like **DatePipe, LowerCasePipe, UpperCasePipe, CurrencyPipe, Decimal Pipe** and so on. We can also create custom pipes. We can also use the pipe function from Rxjs to manipulate data in observable. 

To use pipe in the template, we should use a **pipe symbol (|)** followed by the proper pipe name based on your choice.

If we want data transformation based on our custom requirement, then we need to create our own pipe to fulfill our requirement. The custom pipe is a function which takes the value and other arguments in order to process the data and return the transformed value.

custom pipe --> **transform(value:any args?:any):any**

And there is a method called `transform()`, which accepts the real value that needs to be transformed along with other arguments.

**Custom pipe to format the telephone number and SSN.**

### 🍓async pipe/How async pipe detect changes?

The `async` pipe subscribes to an `Observable` or `Promise` and ==returns the latest value it has==. When a new value is emitted, the `async` pipe marks the component to be checked for changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid potential memory leaks.

#### By default, Angular runs change detection on all components before updating the DOM. Using Async Pipes with the **OnPush change detection strategy** can improve web application performance. By setting the **ChangeDetector** class to `OnPush`, ==**only an Observable that registers a new value needs to go through the change detection process**==.

An Async Pipe streamlines Angular’s change detection process by **subscribing and automatically unsubscribing** from a component precisely at the end of its life cycle. You no longer need to unsubscribe from an Observable or Promise manually. Async Pipes guarantee that redundant subscriptions do not remain open after the component is destroyed and result in a potential memory leak.

**how to use async pipe?** -> promise/observable name + pipe sign + "async" -> **{{ obj_expression | async }}**

### 🍓What is the difference between pure and impure pipe?

A pure pipe is only called when Angular **detects a change** in the value or the parameters passed to a pipe. 

An impure pipe is called for **every change detection cycle** no matter whether the value or parameters changes. every keystroke or mouse-move will call the impure pipe.



### 🍓Promise vs Observable

A `Promise` handles a **single event** when an async operation completes or fails.

**Observable**

An `Observable` is like a **`Stream`** (in many languages) and allows to **pass zero or more events** where the callback is called for each event.

`Observable` also has the advantage over `Promise` to be **cancellable**. If the result of an HTTP request to a server or some other expensive async operation isn't needed anymore, the `Subscription` of an `Observable` allows to cancel the subscription, while a `Promise` will eventually call the success or failed callback even when you don't need the notification or the result it provides anymore.

While a `Promise` **starts immediately**, it is **eager**, an `Observable` only **starts if you subscribe to it**. This is why Observables are called **lazy**.

Observable provides **operators** like `map`, `forEach`, `reduce`, ... similar to an array

Both `Promises` and `Observables` provide us with abstractions that help us deal with the **asynchronous** nature of our applications. 



### 🍓Observable vs Subject

==Observables== are **unicast** by design and Subjects are multicast by design. An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (**each subscribed Observer owns an independent execution of the Observable**), Subjects are multicast, means can cast values to multiple subscribers and can act as both subscribers and emmitter.

Observable: Observable creates copy of data for each observer. 

Subject: Same data get shared between all observers.

### 🍓Two way to inject service

You do this in the app module or you do that by adding that provided in root key here into that object you pass to @injectable

##### 1. add to provider

```javascript
providers: [ShoppinglistService,
    RecipeService,
    DataService]
```

##### 2. Use @injectable

```javascript
@Injectable({
  providedIn: 'root'
})
```

this is an alternative to adding that service to your app module providers array and this is actually the way I would use because it's faster 

### 🍌When using httpclientmodule & lazy loading, are there chances that you may loose the interception & if you may lose those interception capabilities how would you add it back?

**We can provide the interceptor in the feature module.**(==let me know if you have any idea==)



In my case, I set up a token interceptor that was supposed to be shared application wide and adds an authentication token to all API bound requests. Debugging showed my that for some calls, the interceptor was getting used, but any other HTTP request from within any of my feature modules was not going through the interceptor at all.

It came down to having one of the other NPM packages I use in my lazy loaded modules ALSO importing the `HttpClientModule` . Everytime that happens, a new instance of the `HttpClient` service is injected in the module that of course has not been configured to use the interceptor configured in the `CoreModule` . 

### 🍓if i want to make 3 api calls to get bunch of data together , and i want them to complete at same time ?/Have you heard of `Promise.all` and in what context do you use it?

If you want to call multiple API calls simultaneously, we can use Promise.all().

The `Promise.all()` method accepts an array of promises, and let’s you run callback functions after all of them resolve or one of them throws an error.

There is another way to call multiple API calls simultaneously. ==**ForkJoin**==

`forkJoin` require all input observables to be completed, it also returns an observable that produces a single value that is **an array of the last values produced by the input observables**. In other words, it waits until the last input observable completes, and then **produces a single value** and completes.





### 🍓Which life cycle method would you put your async calls in?/Why we always subscribe our observable in ngOnInit()?

It's good practice to use `ngOnInit` to subscribe because `@Input` bindings are not initialized till this lifecycle hook and often observables can depend upon these values. Even if they don't, it's just a good practice thing to keep it consistent, and always in the same place.

Most of the time you want to load and display data directly ==when you access the component and update the UI when this data changes==. That's why it is good practice to put the subscription in ngOnInit().

It **depends** on the requirment



### 🍓Lazy loading

Lazy loading is that **we only load the code that belongs to these areas when we really need it**. With lazy loading, we initially only load our root route content, so only the app module code and the code of all the components.

### 🍓Why is TS good?

**Class and Module Support** --> Keywords like class, interface, extends and module are available in TypeScript. 

**Static Type-checking** --> TypeScript compiler will check the type (to surface more typing errors at compiling time), A practical example is if we use the wrong data type in the browser, we now get compiling errors. Before migrating to Typescript, they could only be found by testing against the back-end.

**ES6 Feature Support** --> With TypeScript, you can start using many ES6 features although it may not be supported in your target browser. TypeScript compile can compile the ts files into “ES3”, “ES5” or “ES6”.

**Syntax Similarity to Our Backend Languages (Java, [Scala](http://www.slideshare.net/razvanc/quick-typescript-vs-scala-sample))**

### 🍓What’s the relationship between js and ts

Typescript: has more features than vanilla JS( types, classes. Interfaces). It is a strongly typed, object oriented, compiled language. It contains all element of JS. 

It supports JS libraries and **provides error-checking feature at compilation time**.

JS doesn’t need to compile, it run directly by browser, but typescript has to be complied.



### 🍓**What are the datatypes in TypeScript?**

​	number, string, boolean, undefined, null, function, object

### 🍓**How to type array of strings?**

Array<string> or string[ ]

### 🍓**Any complex , custom types using typescript?** 

We can create the custom types by creating interface, then extend and implement the interface. Interfaces are basically a way to describe data shapes, for example, an object. 

More complex types in Typescript:

**Union** types allow us to create a new type that can have a value of one or a few more types. To create a union type, we have to use the `|` keyword.

**Intersection** allows us to combine multiple types into a single one type. To create an intersection type, we have to use the `&` keyword

[Tuples](https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple) are a very helpful concept in TypeScript, it brought to us this new data type that includes two sets of values of different data types. Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same. For example, you may want to represent a value as a pair of a `string` and a `number`:

```
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

**Enum** --> A helpful addition to the standard set of datatypes from JavaScript is the `enum`. As in languages like C#, an enum is a way of giving more friendly names to sets of numeric values.

```
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

### 🍓Type aliases in typescript

With type aliases, we can create a new name for a type but we don’t define a new type.

We use the `type` keyword to create a new type alias. 

### 🍓**How to type string or boolean?**

string | boolean

### 🍓**let value to assign value of string ‘true’ or ‘false’** 

​	value: ‘true’ | ‘false’ 

### 🍓How to build an Angular project?/How to bundle an Angular app for production?

We can use `ng build --prod ` command from Angular CLI. Ng build --prod compresses your JS file, remove comments, creates guids of your js file and make your application ready for production

**ng build** command compiles the Angular app into an output directory named **dist/** at the given output path. This command must be executed from within the working directory. The application builder in Angular uses the webpack build tool, with configuration options specified in the workspace configuration file (angular.json) or with a named alternative configuration. A “production” configuration is created by default when you use the CLI to create the project, and you can use that configuration by specifying the —`configuration="production"` or the `--prod="true"` option.

###  🍓**What happens when you run ng serve?**

The CLI supports running a live browser reload experience to users by running ng serve. This will compile the application upon file saves and reload the browser with the newly compiled application. This is done by hosting the application in memory and serving it via **webpack-dev-server.**

### 🍓Angular Change Detection: Default vs. OnPush

Change detection can be defined as synchronizing process of model and view. There are two types of change detection methods in Angular. This can be specified in the declaration of component like below.

```
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

If you do not specify, Angular will apply the **default change detection** method which **detects changes for entire components whenever changes are made.** As you know, Angular application is composed of hierarchical tree of components. During the runtime, every component gets the change detection class inside it, Angular traverses the application hierarchy from top to bottom components, if there is change, it updates DOM and renders the corresponding view.

**OnPush()** -->  it does not affected by Angular’s default change detection, strictly. `OnPush` will only trigger change detection when a template variable reference changes. Change detection will **not** trigger when a template variable is mutated.



### 🍌**What is single application in Angular. How to build and ==reuse(???)== code.**

A singleton service is a service for which only **one instance exists** in an app.

There are two ways to make a service a singleton in Angular:

- Set the `providedIn` property of the `@Injectable()` to `"root"`.
- Include the service in the `AppModule` or in a module that is only imported by the `AppModule`

### What is Directives?

Directives are **classes** that **add additional behavior to elements** in your Angular applications. With Angular's built-in directives, you can manage forms, lists, styles, and what users see.

**structural directive**

t change the structure of our DOM**, it either adds this element or it doesn't add it.

**Attribute directives**

They don't add or remove elements, they only change the appearance or behavior of DOM elements and Angular components.

**Component is also a kind of directives**

### What is Services? 

Service is a piece of  **reusable code** with a focused purpose. A code that will be used in many components across application. Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data. They should focus on presenting data and delegate data access to a service. An  Angular service is simply a JavaScript function. All we need to do is to  create a class and add methods & properties. We can then **create an  instance of this class in our component and call its methods.** One  of the best uses of services is to get the data from the data source.

 **What services are used for?**

1. Features that are independent of components such a logging services

2. Share logic or data across components

3. Encapsulate external interactions like data access

   Advantages:

   Reusable + easy to test + easy to debug

### Wildcard route

A **Wildcard route** has a **path** consisting of two asterisks (**). It matches every URL, the router will select this **route** if it can't match a **route** earlier in the configuration. A **Wildcard Route** can navigate to a custom component or can redirect to an existing **route**.

### Module Federation(new feature from webpack 5, used by angular 11)

The Module Federation integrated in Webpack beginning with version 5 allows the loading of separately compiled program parts. Hence, it finally provides an official solution for the implementation of microfrontends.

In short, Module Federation allows JavaScript application to **dynamically import code from another application at runtime.** The module will build a unique JavaScript entry file which can be downloaded by other applications by setting up the Webpack configuration to do so.

（==need to read more docs==)

### Do you use Async in your project?

Whenever we make an API call, we are using async.

==listen to audio==

# Web

### 🍓Webpack

The Angular build process uses webpack behind the scenes to transpile TypeScript to JavaScript, transform Sass files to CSS, and many other tasks. 

Browsers have very limited support for JavaScript modules. In practice, any JavaScript application loaded into the browser should **be contained in a single source file**. On the other hand, it is good software development practice to separate out code into modules contained in separate files. When deploying a JavaScript application for the browser, the modules must then be built into a single source file. Bundling multiple modules into a single file is the main purpose of webpack.

### Web component

For web component, we did not use it in production. But we were thinking to use web component to share it between the Angular app or React app.

### Microservice backend

### 🍓Talk about debounce

Debouncing is used to improve browser performance. Sometimes there might be some functionalities in a web page **that we will invoke frequently**. For example, if we type search terms on Google, there will be suggestions about the popular search terms related to what you’ve typed. What happens behind the scene is that with each character we type, the application is **triggering API calls constantly to update the popular search term suggestions**. This will affect the browser performance. In this kind of situation, we will use the debouncing technique to force the function to wait for a certain amount of time before running again. (*debounceTime* from Rxjs)

### 🍓What’s Server Side Rendering and do I need it?

**It works by converting HTML files in the server into usable information for the browser.** Once the request is done processing, your browser gets back the fully rendered HTML and displays it on the screen. If you then decide to visit a different page on the website, your browser will once again make another request for the new information.

 This will occur each and every time you visit a page that your browser does not have a cached version of. It doesn’t matter if the new page only has a few items that are different than the current page, the browser will ask for the entire new page and will re-render everything from the ground up.

On the bright side, server-side rendering is great for SEO. Your content is present before you get it, so search engines are able to index it and crawl it just fine. 

#### Server-side pros:

1. Search engines can crawl the site for better SEO.
2. The initial page load is faster.
3. Great for static sites.

#### Server-side cons:

1. Frequent server requests.
2. An overall slow page rendering.
3. Full page reloads.
4. Non-rich site interactions

### 🍓**How client-side rendering works**

Client-side rendering is rendering content in the browser using JavaScript. So instead of getting all of the content from the HTML document itself, you are getting a bare-bones HTML document with a JavaScript file that will render the rest of the site using the browser.

#### Client-side pros:

1. Rich site interactions
2. Fast website rendering after the initial load.
3. Great for web applications.
4. Robust selection of JavaScript libraries.

#### Client-side cons:

1. Low SEO if not implemented correctly.
2. Initial load might require more time.
3. In most cases, requires an external library.

### 🍓What is CDN

A CDN (Content Delivery Network) is a highly-distributed platform of servers that helps **minimize delays** in loading web page content by **reducing the physical distance between the server and the user**. This helps users around the world view the same high-quality content without slow loading times.

For example, a US visitor wishing to view content which originates at a UK-based server will experience poor loading times if this request has to travel across the Atlantic.  To combat this, CDNs **store a cached version** of your website content in **multiple geographical locations** around the world, which are known as “points of presence” (PoPs). These PoPs will contain their own caching servers and will be responsible for delivering that content in the user’s location. 

### 🍓What is **WebSockets**

[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) is a protocol that allows **bidirectional communication** between the user’s browser and the server. Unlike with HTTP, the client doesn’t have to constantly send requests to the server to get new messages. Instead, the browser simply listens to the server and receive the message when it’s ready.

As the result, you get a connection that in some cases can be [400% faster than the regular HTTP](https://blog.feathersjs.com/http-vs-websockets-a-performance-comparison-da2533f13a77).

### 🍓What is Polling system?

Polling is a process by which the client **continuously request data from the server without any user interaction**. It is mainly used to track the long running back-end process status.

With RxJS we can achieve Polling in Angular. 

In this component file, we are implementing the polling using interval() . Here the interval is an Observable and is piped to execute the API call every 5 seconds starting from 0 . Finally, subscribing the observable will give us the response.

<img src="/Users/hecate/Library/Application Support/typora-user-images/image-20210427220608715.png" alt="image-20210427220608715" style="zoom:50%;" />

### 🍓**Web Storage**

**Web Storage is used for storing data on the client-side. So the data will be available even when the page is refreshed.** 

Web storage = session storage + local storage

**Session Storage :**

1. Session Storage is for per browser tab. So data stored in one browser tab will not be accessible in another tab
2. Each browser tab has separate session storage data
3. Session Storage data gets cleared when we close the tab
4. It also gets cleared when we close the browser

**Local Storage :**

1. Local Storage is used for storing data **across the entire application**

2. Data stored in local storage will be accessible across all the tabs or pages only for that domain ( like [www.google.com](http://www.google.com/), [www.medium.com](http://www.medium.com/), etc)

3. Local Storage data stored for a particular domain will be accessible even you open another browser window (Control + n or Command + n (Mac)) on the same browser

4. **Local Storage data stored on normal browsing sessions will not be available when you open a browser in private browsing or in Incognito mode.**

5. Local Storage data will not get cleared even if you close the browser. Because it’s stored on your browser cache in your machine.

6. Local Storage data will only be cleared when you clear the browser cache using Control + Shift + Delete or Command + Shift + Delete (Mac)

7. We can also clear the local storage data programmatically. 

   localStorage.setItem(key, value)||localStorage.removeItem(key)

**Both Local and Session Storage have a storage limit of 5MB each.**



### How to write a reusable and clean code?/SOLID principe

The broad goal of the SOLID principles is to **reduce dependencies** so that engineers change one area of software without impacting others.

**S: Single Responsibility Principle -** A class or function should only have one reason to change, has only one responsibility

**O: Open-Closed Principle -** A software artifact should be open for extension but closed for modification

**L: Liskov-Substitution Principle -** Introduced by Barbara Liskov in the 1980s. This principle defines that **objects of a superclass shall be replaceable with objects of its subclasses without breaking the application.** That requires the objects of the subclasses to behave in the same way as the objects of the superclass.

**I: Interface Segregation Principle -** Prevent classes from relying on things that they don’t need

**D: Dependency Inversion Principle -** Abstractions should not depend on details. Details should depend on abstractions

### 🍓Talk about CORS.

**Cross-Origin Resource Sharing (CORS)** is a mechanism the browser uses to handle cases of when an application running at a particular origin wants to **access resources from another application running at another origin**.  This is useful because, thanks to the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) followed by `XMLHttpRequest` and `fetch`, JavaScript can only make calls to URLs that live on the same origin as the location where the script is running. For example, if a JavaScript app wishes to make an AJAX call to an API running on a different domain, it would be blocked from doing so thanks to the same-origin policy.

Our browser disabled us to access the ...

Angular Procsy

### 🍓Polyfill

A **polyfill** is a browser fallback, made in JavaScript, that allows functionality you expect to work in modern browsers to work in older browsers, e.g., to support canvas (an HTML5 feature) in older browsers.

# Ngrx

### 🍓Ngrx -> one way data flow/ single source store

Yes, I have used Ngrx in many projects. (NgRx stands for **Angular Reactive Extensions**.) NgRx is a **state management system** that is based on the **Redux pattern**. By using Ngrx, we have shared states stored in the global store, so that components from different hierarchies can use these states. Ngrx contains store, reducer, action and effects.

First, you dispatch an action, which is an object with type and payload properties. Then you run a reducer function. The reducer is a simple function, which receives the current state and action, and returns a new state based on action type. Finally, all subscribers get notified by the new state.

##### **immutable** 

state is immutable which means it is never modified, instead reducer creates new state from the existing state and define the actions. Making state changes much more explicit.

**Why Ngrx?** --> If you have an app that becomes bigger and bigger, and your state depends on many components at the same time and many components depend on the service and so on, then you could end up in **state management nightmare**

### Redux

A state management pattern

Idea: you have one central **store** in your entire application that holds you application state. Your different parts of the application, the services and components can still interact with each other but they receive their state from the store.

![image-20210326224200562](/Users/hecate/Library/Application Support/typora-user-images/image-20210326224200562.png)

### What is store?

### What is state?

### What is reducer?

reducer is a pure function. The core is data is immutable.

We use a spread ... operator to deep copy the first layer of object.

The **spread operator** makes **deep copies** of data if the data is not nested. When you have nested data in an array or object the **spread operator** will create a **deep copy** of the top most data and a shallow **copy** of the nested data.

### What is action?

An action is the end also just an **object** with an identifier called type, basically identifying the kind of action you want to perform and optionally, a payload.

An *action* usually represents some kind of event – like the beginning of an API call, or a user logging in.



reducer and effect will use the action type to identify the action

payload --> params

createAction() --> a function to return the action object

ActionCreater --> An *action creator* is a plain function that returns an *action* object.



### Disadavantage of using Subject (rxjs) to manage state:

**state can be updated from anywhere** 

When the application get bigger and bigger, there are a lot of place you can emit the value. You have no idea about the data flow, the data flow can be a mess. 

**Your state might also possibly be mutable**, which means that you might have a couple of places where your state is intended to change, your code in there might not force you to state the old data by overwriting it with new data and that is what I would recommend doing though because otherwise Angular sometimes doesn't pick up some changes to your state because of the reference type nature of objects and arrays in Javascript, where if you only change a property of an object, the overall object didn't change and therefore such a state change might not get picked up.

And in addition, **handling side effects** and that means things like HTTP requests, it's unclear where this should happen - should you write the code for sending them in a component? Should you do it in a service? And yes, all these problems can of course be solved and you can have a clear route and a clear approach regarding all these things but especially if you're working on a bigger app with a bigger team, it can be hard to enforce the best practices across all team members here and therefore, enforcing a specific pattern might be hard because Angular by default doesn't enforce one 

![image-20210326223540440](/Users/hecate/Library/Application Support/typora-user-images/image-20210326223540440.png)

# Rxjs

### 🍓==What is RXJS?==

RxJS (Reactive Extensions for JavaScript) is a js **library** for **reactive programming** using **observables** that makes it easier to compose asynchronous or callback-based code. Angular use Rxjs as a tool to handle async event.

The essential concepts in RxJS which **solve async event management** are:

- **Observable:** represents the idea of an invokable collection of future values or events.
- **Observer:** is a collection of callbacks that knows how to listen to values delivered by the Observable.
- **Subscription:** represents the execution of an Observable, is primarily useful for cancelling the execution.
- **Operators:** are pure functions that enable a functional programming style of dealing with collections with operations like `map`, `filter`, `concat`, `reduce`, etc.
- **Subject:** is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- **Schedulers:** are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. `setTimeout` or `requestAnimationFrame` or others.

### 🍓Have you used RXJS in your project?

Yes, I used Rxjs all the time. It is usually used to handle async event.

Angular itself has already embedded some Rxjs features in some module. For example, in Httpclients module, the get, post method will return an observable.

I used **subject** to manage the state, to implement the communication among components. I usually create subject in a service and all other components subscribing to it via service dependency injection. We can use .next() to pass the data and subscribe it wherever we want to display the data in the UI.

I also use RxJS operators like **map()** to perform data transformation. Mapping values to different types and use mergeMap to compose multiple streams

I used **debounceTime** and **distinctUntilChanged** to handling a event based on a **debounce time** to make sure we don’t send too many API calls in few seconds. 

### 🍓What is Reactive programming and how does it relate to Angular? 

Reactive Programming is programming with **asynchronous data streams**. We create data streams of anything, click events, HTTP requests, ingested messages, availability notifications, changes on a variable, cache events, measures from a sensor, literally anything that may change or happen. 

Angular uses RxJS for some aspects of its internal service, such as Http, Router, etc.
RxJS is a very powerful library that facilitates the design of applications.

### 🍓What is the difference between Behaviorsubject vs Subject?

##### Holding Values

If you subscribe to an **subject**, you **won’t get the current value** or **initial value**. **Subject does not return the current value on Subscription. It triggers only on `.next(value)`call and return/output the `value`**. But when you subscribe to an **Behavior Subject**, you will be able to **get** the **current value** or the **initial value**.

##### Defining Values

You **don’t** have to **define a default value** whenever you declare the subject. But you **have** to **define a default value** whenever you declare BehaviorSubject based upon the data type.

##### Subscribers 

In Subject, each **next subscribers receive** **only the upcoming values**. 🍌In Behavior Subject, **each next subscribers receive one previous value** and **upcoming values**.

### 🍓ReplaySubject

**it can cache up to a specified number of emissions. Any subscribers will get all the cached values upon subscription.** 

If you initialize a `ReplaySubject` with a buffer size of `1`, then it actually *behaves* just like a `BehaviorSubject`. The last value is always cached, so it acts like a value changing over time. With this, there is no need for a `null` check like in the case of the `BehaviorSubject` initialized with a `null`. In this instance, no value is ever emitted to the subscriber until the first publishing.

For example in chat application. We can use it for tracking the record of previous chat history.

The ReplaySubject is comparable to the BehaviorSubject in the way that it can **send “old” values to new subscribers**. It however has the extra characteristic that it can record a part of the observable execution and therefore store multiple old values and “replay” them to new subscribers.

When creating the ReplaySubjec**t you can specify how much values you want to store and for how long you want to store them.** In other words you can specify: “I want to store the last 5 values, that have been executed in the last second prior to a new subscription”.

### 🍓Difference between forkJoin and combinlatest?

`forkJoin` require all input observables to be completed, it also returns an observable that produces a single value that is **an array of the last values produced by the input observables**. In other words, it waits until the last input observable completes, and then **produces a single value** and completes.

In contrast, `combineLatest`  emit the latest value from each, **every time** when any observable emits a value. It emits an item whenever *any* of the source Observables emits an item (so long as each of the source Observables has emitted at least one item). 

### 🍓If you have multiple subscription in one component, how can you unsubscribe them all?

1. I tend to store all my subscriptions in an array..

2. Using the `takeUntil` operator to automatically unsubscribe from an observable. All subscriptions will be cleaned up when the component is destroyed.

   If the `takeUntil` operator is placed before an operator that **involves a subscription to another observable source**, the subscription to that source might not be unsubscribed when `takeUntil` receives its notification. To avoid the problem, the general rule is that `takeUntil` should **be the last operator** in the sequence.

   ```typescript
   import { Subject } from "rxjs"
   import { takeUntil } from "rxjs/operators"
   
   @Component({
     moduleId: __moduleName,
     selector: "my-view",
     templateUrl: "../views/view-route.view.html"
   })
   export class ViewRouteComponent implements OnInit, OnDestroy {
     componentDestroyed$: Subject<boolean> = new Subject()
   
     constructor(private titleService: TitleService) {}
   
     ngOnInit() {
       this.titleService.emitter1$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((data: any) => { /* ... do something 1 */ })
   
       this.titleService.emitter2$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((data: any) => { /* ... do something 2 */ })
   
       //...
   
       this.titleService.emitterN$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((data: any) => { /* ... do something N */ })
     }
   
     ngOnDestroy() {
       this.componentDestroyed$.next(true)
       this.componentDestroyed$.complete()
     }
   }
   ```

### 🍓What is take() and takeUntil() in Rxjs?

take(count) --> Emits only the first `count` values emitted by the source Observable.

`take` returns an **Observable** that emits only the first `count` values emitted by the source Observable. If the source emits fewer than `count` values then all of its values are emitted. After that, it completes, regardless if the source completes.

takeUntil(notifier) --> Emits the values emitted by the source Observable until a `notifier` Observable emits a value.

`takeUntil` subscribes and begins **mirroring the source Observable**. It also monitors a second Observable, `notifier` that you provide. If the `notifier` emits a value, the output Observable stops mirroring the source Observable and completes. If the `notifier` doesn't emit any value and completes then `takeUntil` will pass all values.

### 🍓What is map() in Rxjs?

Applies a given function to each value emitted by the source Observable, and emits the resulting values as an Observable.

Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), it passes each source value through a transformation function to get corresponding output values.

### 🍓What is tap() in Rxjs?

Used to perform side-effects for notifications from the source observable. 

Tap is designed to allow the developer a designated place to perform side effects. While you *could* perform side-effects inside of a `map` or a `mergeMap`, that would make their mapping functions **impure**, which isn't always a big deal, but will make it so you can't do things like memoize those functions. The `tap` operator is designed solely for such side-effects to help you remove side-effects from other operations.

```typescript
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

of(Math.random()).pipe(
  tap(console.log),
  map(n => n > 0.5 ? 'big' : 'small')
).subscribe(console.log);
```

### 🍓What is debounceTime in Rxjs?

Emits a notification from the source Observable only after a particular time span has passed without another source emission.

(***debounceTime*** waits until there’s no new data for the provided amount of time, until it lets the next data through.)

(***distinctUntilChanged*** will ensure that only distinct data passes through.  If the user types something, erases a character quickly and then types back the same character, *distinctUntilChanged* will only send the data once.)

(Finally, ***switchMap*** combines multiple possible observables into one, which ensures that we use the results from the latest request only.)

### 🍓What is switchMap in Rxjs?

SwitchMap is used to **map each source value to an Observable** (combines multiple possible observables into one), complete previous inner observable and emitting values only from the most recently projected Observable.

The main difference between `switchMap` and other flattening operators is the **cancelling effect**. On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed. 

### 🍓What is delay in Rxjs?

**Delays the emission of items** from the source Observable by a given timeout or until a given Date.

If the delay argument is a **Number**, this operator time shifts the source Observable by that amount of time expressed in milliseconds. The relative time intervals between the values are preserved.

If the delay argument is a **Date**, this operator time shifts the start of the Observable execution until the given date occurs.

### 🍓What is mergeMap(flatMap) in Rxjs?

flatMap is an alias for mergeMap! 

The MergeMap maps each value from the source observable into **an inner observable**, subscribes to it, and then starts emitting the values from it replacing the original value.  It allows for **multiple inner subscriptions to be active** at a time. Unlike [SwitchMap,](https://www.tektutorialshub.com/angular/using-switchmap-in-angular/) MergeMap does not cancel any of its inner observables. It merges the values from all of its inner observables and emits the values back into the stream.

### 🍓What is Observable?

Observable are just that — ==**things you wish to observe and take action on**==. Angular uses the **Observer pattern** which simply means — <u>Observable objects are registered, and other objects ==subscribe== them and take action when the observable object is acted on in some way.</u> 

They are similar to promises, but with some differences. **Promises execute once and then are done. Observable continue to be subscribed after the event occurs.** Observable can also be cancelled (you can stop observing an object during runtime). Promises cannot be cancelled — which makes sense, since you’re only executing the promise one time.

### 📷Build a subject by hand



# Javascript

### === and ==

if you use ==, javascript will help you do the coersion. For example, false == 0 will be true. It includes conversion form Boolean to Number by JS automaticly.

What is Type **Coercion** in **JavaScript** ? Type **Coercion** refers to the process of **automatic or implicit conversion of values from one data type to another**. This includes conversion from Number to String, String to Number, Boolean to Number etc. when different types of operators are applied to the values

### 🍓**What happens when browser loops at aync action from execution stack?/** How Eventloop works

You know,  JS is single-threaded means it can only perform one task or operation at a single time. 

The **event loop** is a process that **waits for the Call Stack to be clear** before pushing callbacks from the **Callback Queue** to the Call Stack. Once the Stack is clear, the event loop triggers and checks the Callback Queue for available callbacks. If there are any, it pushes it to the Call Stack, waits for the Call Stack to be clear again, and repeats the same process.

Back to the SetTimeout example, once the Web API finishes executing the task, it doesn’t just push it back to the Call Stack automatically. It goes to the **Callback Queue.** Tasks that have been executed by the Web API’s, which are being pushed to the Task Queue, then go back to the Call Stack to get their result printed out.

### **🍓**What is higher order function?

A function that takes a function as an argument or returns a function.

### 🍓Var, let, const

Using `var`, variables are **function-scoped** because their *visibility is limited to the function*. When you try to use it outside of the function, you’ll get an error. It will hoisting to function scope automatically.

`let` is **block-scoped** and reassignable, 

`const` is unassignable and **block-scoped.**

### 🍓**How to iterate over object properties in JavaScript**

1. `for..in` is a simpler way:

   ```javascript
   for (const item in items) {
     console.log(item)
   }
   ```

   

2. You can also call **`Object.entries()`** to **generate an array with all its enumerable properties**, and loop through that, using any of the above methods:

   ```javascript
   Object.entries(items).map(item => {
     console.log(item)
   })
   
   Object.entries(items).forEach(item => {
     console.log(item)
   })
   
   for (const item of Object.entries(items)) {
     console.log(item)
   }
   ```

### 🍓Const vs object.freeze()

`const` and `Object.freeze` are two completely different things.

`const` applies to **bindings** ("variables"). It creates an immutable binding, i.e. you cannot assign a new value to the binding.

`const` used to declare objects doesn't "freeze" them, you just can't redeclare the whole object, but you can modify its keys freely. On the other hand you can redeclare frozen objects.

`Object.freeze` works on **values**, and more specifically, *object values*. It makes an object immutable, i.e. you cannot change its properties.

`Object.freeze` is also shallow, so you'd need to recursively apply it on nested objects to protect them.

### 🍓**What is hoisting in JS?**

**Hoisting** is a **JavaScript** mechanism where variables and function declarations are **moved to the top of their scope** before code execution. Inevitably, this means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.

var let const will do hoisting all the time

### 🍓**Can you call method before defining it in JS file?**

Yes, it is called hoisting - Invoking (calling) a function before it has been defined.

### 🍓**Is this valid JS code?**

var sum = add (2,3)

function add (a,b) {return a + b};

**YES**

### 🍓**When you instantiate new class what will it return?**

It will return an object. 

When you create an object, you are creating an "instance" of a **class**, therefore "**instantiating" a class**. The new operator requires a single, postfix argument: a call to a constructor.

### 🍓apply(), bind() and call()

They all attach ***this\*** into function (or object) and the difference is in the function invocation

**call()** -->  **call** attaches ***this\*** into function and executes the function immediately. It allows you to pass in arguments one by one.

```javascript
var person = {  
  name: "James Smith",
  hello: function(thing) {
    console.log(this.name + " says hello " + thing);
  }
}

person.hello("world");  // output: "James Smith says hello world"
person.hello.call({ name: "Jim Smith" }, "world"); // output: "Jim Smith says hello world"
```

**apply()** --> The apply method is similar to the call() method. The only difference is that, call() method takes arguments separately whereas, **apply() method takes arguments as an array.** 

```javascript
function personContainer() {
  var person = {  
     name: "James Smith",
     hello: function() {
       console.log(this.name + " says hello " + arguments[1]);
     }
  }
  person.hello.apply(person, arguments);
}
personContainer("world", "mars"); // output: "James Smith says hello mars", note: arguments[0] = "world" , arguments[1] = "mars"                                     
```

**bind()** --> **bind** attaches ***this\*** into function and returns a new function. It needs to be invoked separately and allow you to pass in any number of arguments.

```javascript
var person = {  
  name: "James Smith",
  hello: function(thing) {
    console.log(this.name + " says hello " + thing);
  }
}

person.hello("world");  // output: "James Smith says hello world"
var helloFunc = person.hello.bind({ name: "Jim Smith" });
helloFunc("world");  // output: Jim Smith says hello world"
```

### 🍓Object copy

For shallow copy, what we do is just transforming the reference. We can just create a new obj and use the equal sign. If we change a value in the original obj, the value in copied obj will also change.

For deep copy, it copies all fields and allocates different memory for the copy object. We can spread ... to do the first level deep copy. Or we can use  the `JSON.stringify()` and `JSON.parse()` methods. we use `JSON.stringify()` to change the object to string, and use  `JSON.parse()` to transform the string to obj. But if there is any function or dynamic data  in the obj, we can not copy it. In this case we can use method from some third party lib like deepclone from loddash to do the deep copy. It is very reliable but expensive.

let copiedPerson = JSON.parse(JSON.stringify(person)); 

![image-20210426172724485](/Users/hecate/Library/Application Support/typora-user-images/image-20210426172724485.png)



### 🍓JS closure

In js, we use closure all the time. In angular, decorator is a curring function

Curring fuction are using closure all the time.

A closure is a **feature** in JavaScript where an **inner function has access to the outer (enclosing) function’s variables** — **a scope chain.** The closure has three scope chains:

- it has access to its own scope — variables defined between its curly brackets
- it has access to the outer function’s variables
- it has access to the global variables

### 🍓Create myMap as a new Array.prototype.

<img src="/Users/hecate/Library/Application Support/typora-user-images/image-20210426173023853.png" alt="image-20210426173023853" style="zoom:70%;" />

### 🍓Difference between map and foreach.

The map will generate a new array, forEach will not.

The `map` method receives a function as a parameter. Then it applies it on each element and returns an entirely new array populated with the results of calling the provided function.

Like `map` , the `forEach()` method receives a function as an argument and **executes it once for each array element**. However, instead of returning a new array like `map`, it returns `undefined`.





# Testing

### 🍓What unit testing framework do you use?

I use Jasmine and Karma to do the unit testing.

- - Jasmine - Behavior driven 

    (user behavior scenarios : it should show __ if you click ___)

- we use **Describe()** to declare a suite of tests, 

- use **it()** to declare a single test,

- use **expect()** to test if the output as expected.

- 

Our QA team use **cypress** to do the end-to-end test.

End-to-end: Test front-end AND back-end; entire application

​	**-**Ex: Test the website server from the URL (test it as a real human) not just in local; simulating clicking events



- **jasmine-core.** [Jasmine](https://jasmine.github.io/) is the **framework** we are going to use to create our tests. It has a bunch of functionalities to allow us the write different kinds of tests.
- **karma.** [Karma](https://karma-runner.github.io/1.0/index.html) is a **task runner** for our tests. It uses a configuration file in order to set the startup file, the reporters, the testing framework, the browser among other things.
- The rest of the dependencies are mainly reporters for our tests, tools to use karma and jasmine and browser launchers.

### 🍓Difference between unit testing and integration testing.

**Unit Testing** is to test each individual component of a software. An individual component may be either an individual function or a procedure. Unit Testing is typically performed by the developer. It is a testing method using which every independent modules are tested to determine if there are any issue by the developer himself. 

**Integration testing** is the process of testing the interface between two software units or modules. Its focus is on determining the correctness of the interface. The purpose of the integration testing is to expose faults in the **interaction between integrated units**. Once all the modules have been unit tested, integration testing is performed. 

![image-20210427142846324](/Users/hecate/Library/Application Support/typora-user-images/image-20210427142846324.png)



### How to implement unit test?

we use **Describe()** to declare a suite of tests, 

use **it()** to declare a single test, it(test-name, function)

use **expect()** to test if the output as expected.



Ex: test function

![image-20210428141544840](/Users/hecate/Library/Application Support/typora-user-images/image-20210428141544840.png)

run the test, save --> angular will execute the test automatically



Ex: test arrays and strings

![image-20210428142152455](/Users/hecate/Library/Application Support/typora-user-images/image-20210428142152455.png)

![image-20210428142342187](/Users/hecate/Library/Application Support/typora-user-images/image-20210428142342187.png)



Ex: test Angular component

Arrange Act Assert

![image-20210428142742749](/Users/hecate/Library/Application Support/typora-user-images/image-20210428142742749.png)



**beforeEach()** --> call the fnc before each test

**afterEach()** --> call the fnc after each test

**beforeAll()** --> call once before the whole test

**afterAll()** --> call once after the whole test



### 💣When testing components how would you deal with dependencies the components may have? 

When testing a component with a dependency, we used to isolate the component by providing a **mock** for the service. Typically we created a dummy class with many of the same methods as the original class by using Jasmin Spy. These methods do not provide functionality, but they may just return predictable values that we can use for testing purposes. Then we can provide the mock service to **testbed**  to replace the original service. The method from the mock service will be invoked instead.

![image-20210428023836262](/Users/hecate/Library/Application Support/typora-user-images/image-20210428023836262.png)

![image-20210428024028802](/Users/hecate/Library/Application Support/typora-user-images/image-20210428024028802.png)

### 💣Why would you use a spy in a test?

**Spies** are an easy way to check if a function was called or to provide a custom return value. **We** can **use spies** to **test** components that depend on a service and avoid actually calling the service's methods to get a value.

We can use spies to test components, by **mock a service**, it can avoid calling the service's methods to get a value.

I think spies are handy everytime you deal with **3rd party libraries** or with code you can't test entirely because it breaks the scope of your tests.



### 🍋**How would you test in http client making a call? how to mock it?**



### 🍓What is testbed?

**TestBed** is the primary api for writing unit **tests** for **Angular** applications and libraries. It is a mock environment to run Angular2+ component tests without the browser. 

You need to configure the `TestBed` before each test, adding any components, modules and services you need for the test. It's just like configuring an regular `@NgModule` from scratch, but you just add what you need.

# CSS

### flex

```
/* Keyword values */
flex: auto;
flex: initial;
flex: none;

/* One value, unitless number: flex-grow */
flex: 2;

/* One value, width/height: flex-basis */
flex: 10em;
flex: 30%;
flex: min-content;

/* Two values: flex-grow | flex-basis */
flex: 1 30px;

/* Two values: flex-grow | flex-shrink */
flex: 2 2;

/* Three values: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
flex: 0 0 30%; --> tesla number pad layout

/* Global values */
flex: inherit;
flex: initial;
flex: unset;
```

- One-value syntax:

  the value must be one of:

  - a `<number>`: In this case it is interpreted as `flex: <number> 1 0`; the `<flex-shrink>` value is assumed to be 1 and the `<flex-basis>` value is assumed to be `0`.
  - one of the keywords: `none`, `auto`, or `initial`.

- Two-value syntax:

  - The first value must be:
    - a number and it is interpreted as `<flex-grow>`.
  - The second value must be one of:
    - a number then it is interpreted as `<flex-shrink>`.
    - a valid value for [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width): then it is interpreted as `<flex-basis>`.

- Three-value syntax:

  the values must be in the following order:

  1. a number for `<flex-grow>`.
  2. a number for `<flex-shrink>`.
  3. a valid value for [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) for `<flex-basis>`.



### 🍌SCSS

Sass has two syntaxes. The most commonly used syntax is known as “SCSS” (for “Sassy CSS”), and is **a superset of CSS3’s** syntax. This means that every valid CSS3 stylesheet is valid SCSS as well. SCSS files use the extension .scss.

**Using SCSS, we can perform basic calculations, reuse code using mixins, and create functions. SCSS makes maintenance of CSS so much easier in bigger projects.**

With SCSS, we can define **variables** and reuse them across the code

we can **nest** child selectors inside the parent selector.

Using **mixins**, we can reduce code redundancy and increase code reuse. A mixin is a reusable piece of code which is similar to functions. For example, we can define a mixin as following

```css
@mixin absCenterPosition() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}// remember how to center an element 🙂🙂🙂🙂🙂🙂🙂🙂🙂
```

**Functions** in Sass are similar to functions in JavaScript. Just like JavaScript, functions in Sass can accept arguments and return some value. For example:

```
@function divide($a, $b) {
  @return $a / $b;
}
div {
  margin: divide(60, 2) * 1px;
  height: 200px;
  width: 200px;
}
```

There are many directives in Sass. For example, `@extend`, `@mixin`, and `@import` are some of the directives that we have seen above. There are many more directives in Sass, such as `@if`, `@else`, `@for`, `@while`.

### 🍌What CSS patterns are you using ?

**BEM** --> **Block Element Modifier** is a methodology that helps you to create reusable components and code sharing in front-end development

Use the **7-1 pattern** for a manageable codebase --> The "7" refers to seven thematic **directories** (which is programmer-speak for “folder”)  you put your files in, which funnel into the “1”: a single `.scss` file compiled into your site’s CSS style sheet.



### SSE

```typescript
var source = new EventSource("demo_sse.php");
source.onmessage = function(event) {
  document.getElementById("result").innerHTML += event.data + "<br>";
};
```

- Create a new **EventSource** object, and specify the **URL** of the page sending the updates (in this example "demo_sse.php"),  that will receive events from the server
- Each time an update is received, the **onmessage** event occurs
- When an onmessage event occurs, put the received data into the element with id="result"

![image-20210510120552593](/Users/hecate/Library/Application Support/typora-user-images/image-20210510120552593.png)

The service will return an observable that will emit data coming from the `EventSource`. You’ll notice we are also incorporating **[zone.js](https://github.com/angular/zone.js/).** We need `NgZone` to **alert Angular when an event occurs because it happens outside of the framework.**

Here’s an example of how you can call it in a component

![image-20210510120730636](/Users/hecate/Library/Application Support/typora-user-images/image-20210510120730636.png)

### NgZone

**NgZone** enables us to explicitly run certain code outside Angular's Zone, preventing Angular to run any change detection. So basically, handlers will still be executed, but since they won't run inside Angular's Zone, Angular won't get notified that a task is done and therefore no change detection will be performed.

### Cloud technology

**AWS** 

Our team used **Jenkins** to perform the CI/CD pipeline and auto deploy on AWS. For my AWS experience, I used AWS **Kinesis**, AWS **Lambda** and AWS **DynamoDB** to capture, process and store data streams. I also implemented an asynchronized message system by using AWS SNS and SQS. Finally, I used AWS **ECR** to manage the docker images and deployed them on AWS ECS.



DOcker

![image-20210428164603806](/Users/hecate/Library/Application Support/typora-user-images/image-20210428164603806.png)

effect in ngrx --> give an example

Helps to make API call 



Test case cover the code you want to test

![image-20210428164710707](/Users/hecate/Library/Application Support/typora-user-images/image-20210428164710707.png)

trash testing with 100% coverage



Behavior:

keep up to the newest tech



how to handle the bug

Prod producation memory leak things 



the prioruty of task will cahnge many times within a day



prime ng



what kinds of API do we have?

GRPC

Restful API

Cons: sometimes you get data you don't need,

redundent data

under fetching

user friends infor (make a second API call to get nest data)

GraphicQL

Endpoints





