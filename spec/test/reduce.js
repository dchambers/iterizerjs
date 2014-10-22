var should = require('chai').should();

describe('reduce()', function() {
	function sum(previousValue, currentValue, index) {
		return previousValue + currentValue;
	}

	function sumTimesIndex(previousValue, currentValue, index) {
		return previousValue + (currentValue * (index + 1));
	}

	it('allows a collection of items to be reduced to a single value', function() {
		range(3).reduce(sum, 0).should.equal(6);
	});

	it('supports an initial value which can affect the result', function() {
		range(3).reduce(sum, 10).should.equal(16);
	});

	it('provides an index argument to the reducer function which can be used to affect the result', function() {
		range(3).reduce(sumTimesIndex, 0).should.equal(14);
	});

	it('throws a nice error if no reducer argument is provided', function() {
		(function() {
			range(5).reduce().next();
		}).should.throw("reducer argument must be provided");
	});

	it('throws a nice error if reducer is of the wrong type', function() {
		(function() {
			range(5).reduce(true).next();
		}).should.throw("reducer argument must be a Function");
	});

	it('throws a nice error if no initialValue argument is provided', function() {
		(function() {
			range(5).reduce(function() {}).next();
		}).should.throw("initialValue argument must be provided");
	});

	it('throws a nice error if initialValue is of the wrong type', function() {
		(function() {
			range(5).reduce(function() {}, true).next();
		}).should.throw("initialValue argument must be a Number");
	});
});
