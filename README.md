[![Build Status](https://travis-ci.org/dchambers/iterizerjs.png)](https://travis-ci.org/dchambers/iterizerjs)

# IterizerJs

Expressive & concise code using ES6 iterables:

  * [Home Page](http://dchambers.github.io/iterizerjs/)
  * [Introductory Blog](http://dchambers.github.io/on-the-discovery-of-iterizerjs/)


## Introduction

IterizerJs makes it easier to write code that makes extensive use of ES6 iterables. It is not a polyfill, but merely makes it easier to get the most out of ES6 iterables and generators. It provides:

  * A `range()` function so you never need to use the classic `for` loop again &mdash; `for...of` and `for...in` can be used instead.
  * Implementations of the ES5 array methods (`map()`, `filter()`, `every()`, `some()`, `reduce()`, `reduceRight()`, `indexOf()` & `lastIndexOf()`) for use with any iterable.
  * `limit()`, `nthItem()` and `first()` methods to reduce the number of items returned by long-running and infinite iterables.
  * Other helpful methods like `join()`, `toArray()`, `sum()` & `product()`.

By making extensive use of ES6 iterators, ES6 generators & the ES5 array methods, you can write more _concise_ and more _re-usable_ code &mdash; see the [home page](http://dchambers.github.io/iterizerjs/) for more details.

You can run ES6 generators and iterators natively on the following platforms:

  * Chrome 29 (the `enable-javaScript-harmony` flag must be enabled)
  * Firefox 26.0
  * Node.js 0.11.4 (the `--harmony` switch must be used)
  * Older Browsers (by using [regenerator](https://facebook.github.io/regenerator/) to convert your code to ES5 you can run your code in most browsers)

Take a look at the [home page](http://dchambers.github.io/iterizerjs/) for a more detailed explanation of why you might want to use IterizerJs.


## Installing

### NPM Instructions

If you use NPM then you should install as follows:

``` shell
npm install iterizerjs
```

and start making use of iterizerjs using the following code:

``` javascript
var iterizerjs = require('iterizerjs');
iterizerjs.install();
```

### Alternate Instructions

Alternatively, you can download the latest release, unzip, and start making use of iterizerjs using the following code:

``` html
<script src="dist/iterizer.js"></script>
<script>
	iterizerjs.install();
</script>
```


# Running Tests

### NPM Instructions

If you've installed via NPM you can run the tests as follows:

``` shell
npm test
```

which runs all the tests in Node.js (using _mocha_), and the main spec tests in Firefox and Chrome (using _karma_). You can run the tests against Firefox and Chrome, with automatic re-runs as files are changed, using the command:

``` shell
npm run test-browser
```

Finally, you also have the option to manually open 'spec/index.html' in the browser of your choice. To ensure that changes to the source code automatically cause the bundles to be re-built, you can run:

``` shell
npm run watch
```

### Alternate Instructions

If you haven't installed via NPM then there isn't too much point to running the tests since any changes to the source code won't be reflected. However, if you want to anyway, you can run the tests by opening 'spec/index.html' in the browser of your choice.
