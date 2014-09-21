describe('Project Euler Problem #5', function() {
	function getSmallestMultiple(startRange, endRange) {
		var nonDivisibleRangeMembers = range(startRange, endRange).filter(function(n) {
			return (endRange % n) != 0;
		}).toArray();

		var smallestMultiple = endRange;
		while(!nonDivisibleRangeMembers.every(function(n) {return (smallestMultiple % n) == 0;})) {
			smallestMultiple += endRange;
		}

		return smallestMultiple;
	}

	it('displays the smallest number that can be divided by all numbers from 1 to 10 without any remainder', function() {
		expect(getSmallestMultiple(1, 10)).toBe(2520);
	});

	it('displays the smallest number that can be divided by all numbers from 1 to 20 without any remainder', function() {
		expect(getSmallestMultiple(1, 20)).toBe(232792560);
	});
});

