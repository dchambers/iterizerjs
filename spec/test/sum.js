var should = require('chai').should();

describe('sum()', function() {
	it('can return the sum of a number of items', function() {
		range(4).sum().should.equal(10);
	});
});

