describe('Project Euler Problem #10', function() {
	it('displays the sum of all primes below 10', function() {
		expect(primes().limit(lessThan(10)).sum()).toBe(17);
	});

	// Note: commented out because it adds about 5 seconds to the test time
//	it('displays the sum of all primes below 2000000', function() {
//		expect(primes().limit(lessThan(2000000)).sum()).toBe(142913828922);
//	});
});

