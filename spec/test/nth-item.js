var should = require('chai').should();

describe('nthItem()', function() {
	it('can return the first item in an iterable', function() {
		range(-2, 2).nthItem(1).should.equal(-2);
	});

	it('can return an arbitrary item from an iterable', function() {
		range(-2, 2).nthItem(3).should.equal(0);
	});

	it('can return the last item in an iterable', function() {
		range(-2, 2).nthItem(5).should.equal(2);
	});

	it('can be invoked via the first() helper function', function() {
		range(-2, 2).first().should.equal(-2);
	});

	it('throws a nice error if no n argument is provided', function() {
		(function() {
			range(10).nthItem().next();
		}).should.throw("a 'n' argument must be provided");
	});

	it('throws a nice error if n is of the wrong type', function() {
		(function() {
			range(10).nthItem(true).next();
		}).should.throw("'n' must be a number");
	});
});

