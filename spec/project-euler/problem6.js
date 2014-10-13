var should = require('chai').should();

describe('Project Euler Problem #6', function() {
	function sumOfSquares(n) {
		return range(n).map(function(n) {return n * n}).sum();
	}

	function squaresOfSums(n) {
		return Math.pow(range(n).sum(), 2);
	}

	it('displays the square of the first ten natural numbers minus the sum of the first ten natural numbers squared', function() {
		(squaresOfSums(10) - sumOfSquares(10)).should.equal(2640);
	});

	it('displays the square of the first hundred natural numbers minus the sum of the first hundred natural numbers squared', function() {
		(squaresOfSums(100) - sumOfSquares(100)).should.equal(25164150);
	});
});

