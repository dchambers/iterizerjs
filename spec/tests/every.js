describe('every()', function() {
	function isOdd(n) {
		return (n % 2) == 1;
	}

	function isFalse() {
		return false;
	}

	it('returns true if all items satisfy the given predicate', function() {
		expect(range(1, 5, 2).every(isOdd)).toBe(true);
	});

	it('returns false if some of the items fail to satisfy the given predicate', function() {
		expect(range(5).every(isOdd)).toBe(false);
	});

	it('returns false if the last item fails to satisfy the given predicate', function() {
		expect(range(2).every(isOdd)).toBe(false);
	});

	it('returns true if there are no iterable items', function() {
		expect(''.chars().every(isFalse)).toBe(true);
	});

	it('throws a nice error if no predicate argument is provided', function() {
		expect(function() {
			range(5).every().next();
		}).toThrow(new Error("a 'predicate' argument must be provided"));
	});

	it('throws a nice error if predicate is of the wrong type', function() {
		expect(function() {
			range(5).every(true).next();
		}).toThrow(new TypeError("'predicate' must be a function"));
	});
});

