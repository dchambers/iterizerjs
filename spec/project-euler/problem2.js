describe('Project Euler Problem #2', function() {
	it('displays the sum of even fibonaci numbers not exeeding four million', function() {
		var fibItems = [1, 1];
		while(fibItems[fibItems.length - 1] < 4000000) {
			fibItems.push(fibItems[fibItems.length - 2] + fibItems[fibItems.length - 1]);
		}

		var evenFibItems = fibItems.filter(function(i) {
			return (i % 2) == 0;
		});

		expect(evenFibItems.sum()).toBe(4613732);
	});
});

