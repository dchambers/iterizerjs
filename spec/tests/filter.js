var iterableArray = require('../../lib/iterable-array');

describe('filter()', function() {
	var softFruits = ['blackberry', 'cherry', 'cranberry', 'fig', 'gooseberry', 'grape', 'kiwi', 'raspberry', 'strawberry'];

	function isOdd(n) {
		return (n % 2) == 1;
	}

	it('allows a collection of items to be updated with a common function', function() {
		expect(range(5).filter(isOdd).join()).toBe('1,3,5');
	});

	it('throws a nice error if no filter argument is provided', function() {
		expect(function() {
			range(5).filter().next();
		}).toThrow(new Error("a 'filter' argument must be provided"));
	});

	it('throws a nice error if filter is of the wrong type', function() {
		expect(function() {
			range(5).filter(true).next();
		}).toThrow(new TypeError("'filter' must be a function"));
	});

	it('throws a nice error if no predicate argument is provided', function() {
		expect(function() {
			range(5).some().next();
		}).toThrow(new Error("a 'predicate' argument must be provided"));
	});

	it('throws a nice error if predicate is of the wrong type', function() {
		expect(function() {
			range(5).some(true).next();
		}).toThrow(new TypeError("'predicate' must be a function"));
	});

	describe('equals()', function() {
		it('returns items that exactly match the filter', function() {
			expect(iterableArray(softFruits).filter(equals('grape')).join()).toBe('grape');
		});

		it('returns nothing if no items match', function() {
			expect(iterableArray(softFruits).filter(equals('orange')).join()).toBe('');
		});
	});

	describe('beginsWith()', function() {
		it('returns items that begin with the filter', function() {
			expect(iterableArray(softFruits).filter(beginsWith('g')).join()).toBe('gooseberry,grape');
		});

		it('returns nothing if no items begin with the filter', function() {
			expect(iterableArray(softFruits).filter(beginsWith('a')).join()).toBe('');
		});
	});

	describe('endsWith()', function() {
		it('returns items that end with the filter', function() {
			expect(iterableArray(softFruits).filter(endsWith('berry')).join()).toBe('blackberry,cranberry,gooseberry,raspberry,strawberry');
		});

		it('returns nothing if no items end with the filter', function() {
			expect(iterableArray(softFruits).filter(endsWith('x')).join()).toBe('');
		});
	});

	describe('contains()', function() {
		it('returns items that contain the filter', function() {
			expect(iterableArray(softFruits).filter(contains('err')).join()).toBe('blackberry,cherry,cranberry,gooseberry,raspberry,strawberry');
		});

		it('returns nothing if no items contain the filter', function() {
			expect(iterableArray(softFruits).filter(contains('x')).join()).toBe('');
		});
	});

	describe('matches()', function() {
		it('returns items that match the filter', function() {
			expect(iterableArray(softFruits).filter(matches(/^[a-z]{3}$/)).join()).toBe('fig');
		});

		it('returns nothing if no items match the filter', function() {
			expect(iterableArray(softFruits).filter(matches(/^[a-z]{2}$/)).join()).toBe('');
		});
	});

	describe('not()', function() {
		it('returns items that do not match the filter', function() {
			expect(iterableArray(softFruits).filter(not(endsWith('berry'))).join()).toBe('cherry,fig,grape,kiwi');
		});

		it('returns nothing if all items match', function() {
			expect(iterableArray(softFruits).filter(not(matches(/[a-z]*/))).join()).toBe('');
		});
	});
});

