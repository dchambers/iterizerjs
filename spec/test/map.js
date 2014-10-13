var should = require('chai').should();

describe('map()', function() {
	function double(n) {
		return n * 2;
	}

	it('allows a collection of items to be updated with a common function', function() {
		range(3).map(double).join().should.equal('2,4,6');
	});

	it('throws a nice error if no map argument is provided', function() {
		(function() {
			range(3).map().next();
		}).should.throw("a 'map' argument must be provided");
	});

	it('throws a nice error if map is of the wrong type', function() {
		(function() {
			range(3).map(true).next();
		}).should.throw("'map' must be a function");
	});
});

