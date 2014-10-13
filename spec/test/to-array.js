var should = require('chai').should();

describe('toArray()', function() {
	it('allows an iterable to be converted to an array', function() {
		range(3).toArray().length.should.equal(3);
		range(3).toArray().join().should.equal('1,2,3');
	});
});

