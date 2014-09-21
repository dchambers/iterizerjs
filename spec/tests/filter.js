describe('filter()', function() {
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
});

