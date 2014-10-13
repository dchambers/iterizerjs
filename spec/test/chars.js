var should = require('chai').should();

describe('chars()', function() {
	it('allows a string to be iterated character by character', function() {
		'Hello'.chars().join().should.equal('H,e,l,l,o');
	});

	it('allows a single character string to be iterated', function() {
		'X'.chars().join().should.equal('X');
	});

	it('correctly handles an empty string', function() {
		''.chars().toArray().length.should.equal(0);
	});
});

