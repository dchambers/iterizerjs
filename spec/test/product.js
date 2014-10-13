var should = require('chai').should();

describe('product()', function() {
	it('can return the product of a number of items', function() {
		range(4).product().should.equal(24);
	});
});

