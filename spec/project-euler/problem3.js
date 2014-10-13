var should = require('chai').should();
var primes = require('./primes.js');

describe('Project Euler Problem #3', function() {
	function primeFactors(num) {
		return primes().limit(lessThan(num)).filter(function(nextPrime) {
			return (num % nextPrime) == 0;
		});
	}

	function largestPrimeFactor(num) {
		var largestPrimeFactor = num;
		var n = 2;

		while(n < largestPrimeFactor) {
			while((largestPrimeFactor % n) == 0) {
				largestPrimeFactor = (largestPrimeFactor / n);
			}

			++n;
		}

		return largestPrimeFactor;
	}

	it('displays the first ten primes correctly', function() {
		primes().limit(10).join().should.equal('2,3,5,7,11,13,17,19,23,29');
	});

	it('displays all prime factors of 13195', function() {
		primeFactors(13195).join().should.equal('5,7,13,29');
	});

	it('displays the largest prime factor of 13195', function() {
		largestPrimeFactor(13195).should.equal(29);
	});

	it('displays the largest prime factor of 600851475143', function() {
		largestPrimeFactor(600851475143).should.equal(6857);
	});
});

