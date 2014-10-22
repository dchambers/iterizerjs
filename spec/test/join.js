var should = require('chai').should();

describe('join()', function() {
	it('can convert a series of items to a delimited string', function() {
		range(3).join().should.equal('1,2,3');
	});

	it('allows an arbitrary delimiter to be used when joining', function() {
		range(3).join(', ').should.equal('1, 2, 3');
	});

	it('throws a nice error if delimiter is of the wrong type', function() {
		(function() {
			range(3).join(true).next();
		}).should.throw("delimiter argument must be a String");
	});
});
