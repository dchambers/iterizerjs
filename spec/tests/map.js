describe('map()', function() {
	function double(n) {
		return n * 2;
	}

	it('allows a collection of items to be updated with a common function', function() {
		expect(range(3).map(double).join()).toBe('2,4,6');
	});

	it('throws a nice error if no map argument is provided', function() {
		expect(function() {
			range(3).map().next();
		}).toThrow(new Error("a 'map' argument must be provided"));
	});

	it('throws a nice error if map is of the wrong type', function() {
		expect(function() {
			range(3).map(true).next();
		}).toThrow(new TypeError("'map' must be a function"));
	});
});

