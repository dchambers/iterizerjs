describe('chars()', function() {
	it('allows a string to be iterated character by character', function() {
		expect('Hello'.chars().join()).toBe('H,e,l,l,o');
	});

	it('allows a single character string to be iterated', function() {
		expect('X'.chars().join()).toBe('X');
	});

	it('correctly handles an empty string', function() {
		expect(''.chars().toArray().length).toBe(0);
	});
});

