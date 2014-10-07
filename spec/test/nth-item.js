describe('nthItem()', function() {
	it('can return the first item in an iterable', function() {
		expect(range(-2, 2).nthItem(1)).toBe(-2);
	});

	it('can return an arbitrary item from an iterable', function() {
		expect(range(-2, 2).nthItem(3)).toBe(0);
	});

	it('can return the last item in an iterable', function() {
		expect(range(-2, 2).nthItem(5)).toBe(2);
	});

	it('can be invoked via the first() helper function', function() {
		expect(range(-2, 2).first()).toBe(-2);
	});

	it('throws a nice error if no n argument is provided', function() {
		expect(function() {
			range(10).nthItem().next();
		}).toThrow(new Error("a 'n' argument must be provided"));
	});

	it('throws a nice error if n is of the wrong type', function() {
		expect(function() {
			range(10).nthItem(true).next();
		}).toThrow(new TypeError("'n' must be a number"));
	});
});

