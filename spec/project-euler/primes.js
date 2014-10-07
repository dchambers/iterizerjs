var iterableArray = require('../../lib/iterable-array');

function* primes(maxPrime) {
	yield 2;
	
	var primes = [2];
	var lastPrimeDivisor = 1;
	var nextNum = 3;

	while(true) {
		// TODO: stop using iterableArray() once Chrome fixes the bug (see <https://code.google.com/p/chromium/issues/detail?id=415914>) that prevents for...of working with arrays
		var isPrime = iterableArray(primes).limit(lastPrimeDivisor).every(function(primeDivisor) {
			return (nextNum % primeDivisor) != 0;
		});
		
		if(isPrime) {
			var nextPotentialPrimeDivisor = primes[lastPrimeDivisor];
			
			if((nextNum % nextPotentialPrimeDivisor) == 0) {
				isPrime = false;
				++lastPrimeDivisor;
			}
		}
		
		if(isPrime) {
			primes.push(nextNum);
			yield nextNum;
		}

		++nextNum;
	}
}

module.exports = primes;

