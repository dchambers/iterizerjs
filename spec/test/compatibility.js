describe('iterizer.js browser compatibility', function() {
	it('does not add any enumerable properties to Object', function() {
		expect(function() {
			for(var key in {}) {
				throw new Error("'" + key + "' was found in {}, but iterizer.js should not add any enumerable properties");
			}
		}).not.toThrow();
	});

	it('does not add any enumerable properties to String', function() {
		expect(function() {
			for(var key in '') {
				throw new Error("'" + key + "' was found in '', but iterizer.js should not add any enumerable properties");
			}
		}).not.toThrow();
	});

	it('allows the ES5 Array.reduce() method (that gets passed four arguments) to still be used with arrays', function() {
		expect([1,2,3].reduce(function(previousValue, currentValue, index, array) {
			return array.join();
		})).toBe('1,2,3');
	});
});

