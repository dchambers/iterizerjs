var primes = require('./primes.js');

describe('Project Euler Problem #7', function() {
	it('displays the 6th prime number', function() {
		expect(primes().nthItem(6)).toBe(13);
	});

	it('displays the 10001st prime number', function() {
		expect(primes().nthItem(10001)).toBe(104743);
	});
});

