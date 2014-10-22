var should = require('chai').should();

describe('every()', function() {
	function isOdd(n) {
		return (n % 2) == 1;
	}

	function isFalse() {
		return false;
	}

	it('returns true if all items satisfy the given predicate', function() {
		range(1, 5, 2).every(isOdd).should.be.true;
	});

	it('returns false if some of the items fail to satisfy the given predicate', function() {
		range(5).every(isOdd).should.be.false;
	});

	it('returns false if the last item fails to satisfy the given predicate', function() {
		range(2).every(isOdd).should.be.false;
	});

	it('returns true if there are no iterable items', function() {
		''.chars().every(isFalse).should.be.true;
	});

	it('throws a nice error if no predicate argument is provided', function() {
		(function() {
			range(5).every().next();
		}).should.throw("predicate argument must be provided");
	});

	it('throws a nice error if predicate is of the wrong type', function() {
		(function() {
			range(5).every(true).next();
		}).should.throw("predicate argument must be a Function");
	});
});
