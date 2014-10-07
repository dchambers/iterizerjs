describe('reduce()', function() {
	function sum(previousValue, currentValue, index) {
		return previousValue + currentValue;
	}
	
	function sumTimesIndex(previousValue, currentValue, index) {
		return previousValue + (currentValue * (index + 1));
	}

	it('allows a collection of items to be reduced to a single value', function() {
		expect(range(3).reduce(sum, 0)).toBe(6);
	});

	it('supports an initial value which can affect the result', function() {
		expect(range(3).reduce(sum, 10)).toBe(16);
	});

	it('provides an index argument to the reducer function which can be used to affect the result', function() {
		expect(range(3).reduce(sumTimesIndex, 0)).toBe(14);
	});

	it('throws a nice error if no reducer argument is provided', function() {
		expect(function() {
			range(5).reduce().next();
		}).toThrow(new Error("a 'reducer' argument must be provided"));
	});

	it('throws a nice error if reducer is of the wrong type', function() {
		expect(function() {
			range(5).reduce(true).next();
		}).toThrow(new TypeError("'reducer' must be a function"));
	});

	it('throws a nice error if no initialValue argument is provided', function() {
		expect(function() {
			range(5).reduce(function() {}).next();
		}).toThrow(new Error("an 'initialValue' argument must be provided"));
	});

	it('throws a nice error if initialValue is of the wrong type', function() {
		expect(function() {
			range(5).reduce(function() {}, true).next();
		}).toThrow(new TypeError("'initialValue' must be a number"));
	});
});

