var should = require('chai').should();

describe('range()', function() {
	it('displays numbers within the given range', function() {
		range(10, 12).join().should.equal('10,11,12');
	});

	it('displays numbers from 1 if no lower bound is provided', function() {
		range(3).join().should.equal('1,2,3');
	});

	it('can displays numbers in reverse order', function() {
		range(3, 1).join().should.equal('3,2,1');
	});

	it('can displays ranges of numbers starting negative and becoming positive', function() {
		range(-1, 1).join().should.equal('-1,0,1');
	});

	it('can display ranges with a step size greater than 1', function() {
		range(2, 10, 2).join().should.equal('2,4,6,8,10');
	});

	it('can display ranges in reverse order with a step size greater than 1', function() {
		range(10, 2, 2).join().should.equal('10,8,6,4,2');
	});

	it('displays only numbers within a range, even if the step size will cause it to step outside of the range', function() {
		range(1, 10, 2).join().should.equal('1,3,5,7,9');
	});

	it('throws a nice error if the range arguments are not numbers', function() {
		(function() {
			range('1', '10').next();
		}).should.throw("start argument must be a Number");

		(function() {
			range(1, '10').next();
		}).should.throw("stop argument must be a Number");
	});

	it('throws a nice error if the single range argument is not a number', function() {
		(function() {
			range('10').next();
		}).should.throw("stop argument must be a Number");
	});

	it('throws a nice error if no arguments are provided', function() {
		(function() {
			range().next();
		}).should.throw('start argument must be provided');
	});

	it('throws a nice error if the step argument is not a number', function() {
		(function() {
			range(1, 10, '2').next();
		}).should.throw("step argument must be a Number");
	});

	it('throws a nice error if the step argument is negative', function() {
		(function() {
			range(10, 1, -1).next();
		}).should.throw("step argument must be a positive number");
	});

	it('throws a nice error if the step argument is zero', function() {
		(function() {
			range(1, 10, 0).next();
		}).should.throw("step argument must be a positive number");
	});
});
