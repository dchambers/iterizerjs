var should = require('chai').should();

describe('some()', function() {
	function isOdd(n) {
		return (n % 2) == 1;
	}

	function isTrue() {
		return true;
	}

	it('returns true if any of the items satisfy the given predicate', function() {
		range(2, 4).some(isOdd).should.equal(true);
	});

	it('returns false if none of the items satisfy the given predicate', function() {
		range(2, 10, 2).some(isOdd).should.equal(false);
	});

	it('returns true if the last item satisfies the given predicate', function() {
		range(2, 3).some(isOdd).should.equal(true);
	});

	it('returns false if there are no iterable items', function() {
		''.chars().some(isTrue).should.equal(false);
	});

	it('throws a nice error if no predicate argument is provided', function() {
		(function() {
			range(5).some().next();
		}).should.throw("a 'predicate' argument must be provided");
	});

	it('throws a nice error if predicate is of the wrong type', function() {
		(function() {
			range(5).some(true).next();
		}).should.throw("'predicate' must be a function");
	});
});

