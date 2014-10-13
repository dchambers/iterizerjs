var should = require('chai').should();

describe('Project Euler Problem #9', function() {
	/*
	 * facts:
	 * 
	 * a < b < c
	 * a + b + c = sum
	 * a^2 + b^2 = c^2
	 */
	function* specialPythagoreanTriplets(sum) {
		var maxA = Math.ceil((sum / 3) - 1); // 'a' has to less than a third of the sum since 'b' and 'c' must both be greater than it
		var maxB = Math.floor(sum / 2); // b has to be no more than half of the sum since c must be greater than it
		var minC = Math.floor((sum / 3) + 1); // 'c' has to be greater than a third of the sum since 'a' and 'b' must both be smaller than it

		var minA = 1; // temporarilly assume the worst while we have two unknown variables ('a' and 'b') at the same time
		var minB = Math.floor(Math.sqrt(Math.pow(minC, 2) - Math.pow(minA, 2))); // b^2 = c^2 - a^2, and therefore min(b)^2 = min(c)^2 - min(a)^2
		minA = Math.floor(Math.sqrt(Math.pow(minC, 2) - Math.pow(minB, 2))); // a^2 = c^2 - b^2, and therefore min(a)^2 = min(c)^2 - min(b)^2

		for(var a of range(minA, maxA)) {
			for(var b of range(Math.max(a + 1, minB), maxB)) {
				var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

				if((a + b + c) == sum) {
					yield a + '^2 + ' + b + '^2 = ' + c + '^2 and ' + a + ' + ' + b + ' + ' + c + ' = ' + sum;
				}
			}
		}
	}

	it('displays the pythagorean triplet whose sum is 12', function() {
		specialPythagoreanTriplets(12).first().should.equal('3^2 + 4^2 = 5^2 and 3 + 4 + 5 = 12');
	});

	it('displays the pythagorean triplet whose sum is 1000', function() {
		specialPythagoreanTriplets(1000).first().should.equal('200^2 + 375^2 = 425^2 and 200 + 375 + 425 = 1000');
	});
});

