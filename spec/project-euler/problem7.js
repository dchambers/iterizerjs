var should = require('chai').should();
var primes = require('./primes.js');

describe('Project Euler Problem #7', function() {
	it('displays the 6th prime number', function() {
		primes().nthItem(6).should.equal(13);
	});

	it('displays the 10001st prime number', function() {
		this.timeout(5000);
		primes().nthItem(10001).should.equal(104743);
	});
});

