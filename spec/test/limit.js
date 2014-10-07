describe('limit()', function() {
	function isNegativeNumber(num) {
		return num <= 0;
	}
	
	it('yields the number of items its told to', function() {
		expect(range(10).limit(3).join()).toBe('1,2,3');
	});
	
	it('can can skip some items at the beginning if requested to', function() {
		expect(range(10).limit(4,6).join()).toBe('4,5,6');
	});
	
	it('can can stop yielding once a cut-off function fires', function() {
		expect(range(-3, 3).limit(isNegativeNumber).join()).toBe('-3,-2,-1,0');
	});

	it('throws a nice error if the limit arguments are not numbers', function() {
		expect(function() {
			range(10).limit('1', '5').next();
		}).toThrow(new TypeError("'from' must be a number"));

		expect(function() {
			range(10).limit(1, '5').next();
		}).toThrow(new TypeError("'to' must be a number"));
	});

	it('throws a nice error if the single to argument is not a number or function', function() {
		expect(function() {
			range(10).limit('5').next();
		}).toThrow(new TypeError("'to' must be a number or 'continueYielding' must be a function"));
	});

	it('throws a nice error if no limit arguments are provided', function() {
		expect(function() {
			range(10).limit().next();
		}).toThrow(new Error('limit arguments must be provided'));
	});

	describe('lessThan()', function() {
		it('displays only numbers less than a given number', function() {
			expect(range(2, 10, 2).limit(lessThan(6)).join()).toBe('2,4');
		});
	});

	describe('lessThanOrEqualTo()', function() {
		it('displays only numbers less than or equal to a given number', function() {
			expect(range(2, 10, 2).limit(lessThanOrEqualTo(6)).join()).toBe('2,4,6');
		});
	});

	describe('greaterThan()', function() {
		it('displays only numbers greater than a given number', function() {
			expect(range(10, 2, 2).limit(greaterThan(6)).join()).toBe('10,8');
		});
	});

	describe('greaterThanOrEqualTo()', function() {
		it('displays only numbers greater than or equal to a given number', function() {
			expect(range(10, 2, 2).limit(greaterThanOrEqualTo(6)).join()).toBe('10,8,6');
		});
	});
});

