describe('join()', function() {
	it('can convert a series of items to a delimited string', function() {
		expect(range(3).join()).toBe('1,2,3');
	});

	it('allows an arbitrary delimiter to be used when joining', function() {
		expect(range(3).join(', ')).toBe('1, 2, 3');
	});
	
	it('throws a nice error if delimiter is of the wrong type', function() {
		expect(function() {
			range(3).join(true).next();
		}).toThrow(new TypeError("'delimiter' must be a string"));
	});
});

