describe('some()', function() {
	function isOdd(n) {
		return (n % 2) == 1;
	}

	function isTrue() {
		return true;
	}

	it('returns true if any of the items satisfy the given predicate', function() {
		expect(range(2, 4).some(isOdd)).toBe(true);
	});

	it('returns false if none of the items satisfy the given predicate', function() {
		expect(range(2, 10, 2).some(isOdd)).toBe(false);
	});

	it('returns true if the last item satisfies the given predicate', function() {
		expect(range(2, 3).some(isOdd)).toBe(true);
	});

	it('returns false if there are no iterable items', function() {
		expect(''.chars().some(isTrue)).toBe(false);
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

