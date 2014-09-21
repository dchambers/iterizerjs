describe('Project Euler Problem #4', function() {
	function isPalindrome(n) {
		var str = String(n);
	
		if((str.length % 2) == 0) {
			var midLength = str.length / 2;

			if(str.substr(0, midLength) == str.substr(midLength).split('').reverse().join('')) {
				return true;
			}
		}
	
		return false;
	}

	function largestPalindrome(componentSize) {
		for(var x of range(componentSize, 0)) {
			for(var y of range(componentSize, 0)) {
				if(isPalindrome(x * y)) {
					return (x * y) + ' formed from ' + x + ' and ' + y;
				}
			}
		}
	}

	it('displays the largest palindrome beneath 100', function() {
		expect(largestPalindrome(100)).toBe('9009 formed from 99 and 91');
	});

	it('displays the largest palindrome beneath 1000', function() {
		expect(largestPalindrome(1000)).toBe('580085 formed from 995 and 583');
	});
});

