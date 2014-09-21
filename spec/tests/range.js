describe('range()', function() {
	it('displays numbers within the given range', function() {
		expect(range(10, 12).join()).toBe('10,11,12');
	});

	it('displays numbers from 1 if no lower bound is provided', function() {
		expect(range(3).join()).toBe('1,2,3');
	});
	
	it('can displays numbers in reverse order', function() {
		expect(range(3, 1).join()).toBe('3,2,1');
	});
	
	it('can displays ranges of numbers starting negative and becoming positive', function() {
		expect(range(-1, 1).join()).toBe('-1,0,1');
	});
	
	it('can display ranges with a step size greater than 1', function() {
		expect(range(2, 10, 2).join()).toBe('2,4,6,8,10');
	});
	
	it('can display ranges in reverse order with a step size greater than 1', function() {
		expect(range(10, 2, 2).join()).toBe('10,8,6,4,2');
	});

	it('displays only numbers within a range, even if the step size will cause it to step outside of the range', function() {
		expect(range(1, 10, 2).join()).toBe('1,3,5,7,9');
	});

	it('throws a nice error if the range arguments are not numbers', function() {
		expect(function() {
			range('1', '10').next();
		}).toThrow(new TypeError("'start' must be a number"));

		expect(function() {
			range(1, '10').next();
		}).toThrow(new TypeError("'stop' must be a number"));
	});

	it('throws a nice error if the single range argument is not a number', function() {
		expect(function() {
			range('10').next();
		}).toThrow(new TypeError("'stop' must be a number"));
	});

	it('throws a nice error if no arguments are provided', function() {
		expect(function() {
			range().next();
		}).toThrow(new Error('range arguments must be provided'));
	});

	it('throws a nice error if the step argument is not a number', function() {
		expect(function() {
			range(1, 10, '2').next();
		}).toThrow(new TypeError("'step' must be a number"));
	});

	it('throws a nice error if the step argument is negative', function() {
		expect(function() {
			range(10, 1, -1).next();
		}).toThrow(new Error("'step' must be a positive number"));
	});

	it('throws a nice error if the step argument is zero', function() {
		expect(function() {
			range(1, 10, 0).next();
		}).toThrow(new Error("'step' must be a positive number"));
	});
});

