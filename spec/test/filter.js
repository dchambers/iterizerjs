var should = require('chai').should();
var iterableArray = require('../../lib/iterable-array');

describe('filter()', function() {
	var softFruits = ['blackberry', 'cherry', 'cranberry', 'fig', 'gooseberry', 'grape', 'kiwi', 'raspberry', 'strawberry'];

	function isOdd(n) {
		return (n % 2) == 1;
	}

	it('allows a collection of items to be updated with a common function', function() {
		range(5).filter(isOdd).join().should.equal('1,3,5');
	});

	it('throws a nice error if no filter argument is provided', function() {
		(function() {
			range(5).filter().next();
		}).should.throw("a 'filter' argument must be provided");
	});

	it('throws a nice error if filter is of the wrong type', function() {
		(function() {
			range(5).filter(true).next();
		}).should.throw("'filter' must be a function");
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

	describe('equals()', function() {
		it('returns items that exactly match the filter', function() {
			iterableArray(softFruits).filter(equals('grape')).join().should.equal('grape');
		});

		it('returns nothing if no items match', function() {
			iterableArray(softFruits).filter(equals('orange')).join().should.equal('');
		});
	});

	describe('beginsWith()', function() {
		it('returns items that begin with the filter', function() {
			iterableArray(softFruits).filter(beginsWith('g')).join().should.equal('gooseberry,grape');
		});

		it('returns nothing if no items begin with the filter', function() {
			iterableArray(softFruits).filter(beginsWith('a')).join().should.equal('');
		});
	});

	describe('endsWith()', function() {
		it('returns items that end with the filter', function() {
			iterableArray(softFruits).filter(endsWith('berry')).join().should.equal('blackberry,cranberry,gooseberry,raspberry,strawberry');
		});

		it('returns nothing if no items end with the filter', function() {
			iterableArray(softFruits).filter(endsWith('x')).join().should.equal('');
		});
	});

	describe('contains()', function() {
		it('returns items that contain the filter', function() {
			iterableArray(softFruits).filter(contains('err')).join().should.equal('blackberry,cherry,cranberry,gooseberry,raspberry,strawberry');
		});

		it('returns nothing if no items contain the filter', function() {
			iterableArray(softFruits).filter(contains('x')).join().should.equal('');
		});
	});

	describe('matches()', function() {
		it('returns items that match the filter', function() {
			iterableArray(softFruits).filter(matches(/^[a-z]{3}$/)).join().should.equal('fig');
		});

		it('returns nothing if no items match the filter', function() {
			iterableArray(softFruits).filter(matches(/^[a-z]{2}$/)).join().should.equal('');
		});
	});

	describe('not.<filter>', function() {
		it('returns items that do not match the filter', function() {
			iterableArray(softFruits).filter(not.endsWith('berry')).join().should.equal('cherry,fig,grape,kiwi');
		});

		it('returns nothing if all items match', function() {
			iterableArray(softFruits).filter(not.matches(/[a-z]*/)).join().should.equal('');
		});
	});
});

