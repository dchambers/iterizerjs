# IterizerJs

IterizerJs makes it easier to write code that makes extensive use of ES6 iterables:

  * A `range()` function is provided so you never need to use the classic `for` loop again -- `for...of` and `for...in` can be used instead.
  * Implementations of the ES5 array methods (`map()`, `filter()`, `every()`, `some()`, `reduce()`, `reduceRight()`, `indexOf()` & `lastIndexOf()`) are provided for use with any iterable.
  * `limit()`, `nthItem()` and `first()` methods are provided to reduce the number of items returned by long-running and infinite iterables.
  * Other helpful methods like `join()`, `toArray()`, `sum()` & `product()` are also made available.

By making extensive use of ES6 iterators, ES6 generators & the ES5 `Array` methods, you can write more _concise_ and more _re-usable_ code.

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

When we later encounter problem [10](https://projecteuler.net/problem=10), our intuitions are confirmed when we can solve the problem 'Find the sum of all the primes below two million' with this single line of expressive code:

```
primes().limit(lessThan(2000000)).sum();
```

