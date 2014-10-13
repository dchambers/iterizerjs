var should = require('chai').should();
var primes = require('./primes.js');

describe('Project Euler Problem #10', function() {
	it('displays the sum of all primes below 10', function() {
		primes().limit(lessThan(10)).sum().should.equal(17);
	});

	it('displays the sum of all primes below 2000000', function() {
		this.timeout(10000);
		primes().limit(lessThan(2000000)).sum().should.equal(142913828922);
	});
});

