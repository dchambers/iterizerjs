# IterizerJs

IterizerJs makes it easier to write code that makes extensive use of ES6 iterables. It provides:

  * A `range()` function so you never need to use the classic `for` loop again &mdash; `for...of` and `for...in` can be used instead.
  * Implementations of the ES5 array methods (`map()`, `filter()`, `every()`, `some()`, `reduce()`, `reduceRight()`, `indexOf()` & `lastIndexOf()`) for use with any iterable.
  * `limit()`, `nthItem()` and `first()` methods to reduce the number of items returned by long-running and infinite iterables.
  * Other helpful methods like `join()`, `toArray()`, `sum()` & `product()`.

By making extensive use of ES6 iterators, ES6 generators & the ES5 array methods, you can write more _concise_ and more _re-usable_ code.

You can run ES6 generators and iterators natively in Node.js, Firefox & Chrome (`enable-javaScript-harmony` flag must be enabled), and you can run them in all other browsers by using [regenerator](https://facebook.github.io/regenerator/) to convert your code to ES5.

## More Concise Code

For example, here's the solution for [problem 6](https://projecteuler.net/problem=6) in [Project Euler](https://projecteuler.net/):

```
function sumOfSquares(n) {
	return range(n).map(function(n) {return n * n}).sum();
}

function squaresOfSums(n) {
	return Math.pow(range(n).sum(), 2);
}

console.log(squaresOfSums(10) - sumOfSquares(10));
```

## Better Functional Re-use

To solve problems [3](https://projecteuler.net/problem=3) & [7](https://projecteuler.net/problem=7) from [Project Euler](https://projecteuler.net/) in ES5 we might end up creating `primes(numPrimes)`, `primes(maxPrime)` & `nthPrime(n)` methods, whereas with _IterizerJs_ we can create a single `primes()` generator function, and achieve the variations using:

  * `primes().limit(numPrimes)`
  * `primes().limit(lessThanOrEqualTo(maxPrime))`
  * `primes().nthPrime(n)`

increasing re-use at the functional level.

When we later encounter [problem 10](https://projecteuler.net/problem=10) from Project Euler ('Find the sum of all the primes below two million'), our intuitions are confirmed when we can solve the problem with this single line of code:

```
primes().limit(lessThan(2000000)).sum();
```

