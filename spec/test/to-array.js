describe('toArray()', function() {
	it('allows an iterable to be converted to an array', function() {
		expect(range(3).toArray().length).toBe(3);
		expect(range(3).toArray().join()).toBe('1,2,3');
	});
});

