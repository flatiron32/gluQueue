var assert = require("assert");
var should = require("should");

describe('Array', function() {
	describe('#indexOf() 1', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});

describe("Should", function() {
	it('shoud work', function() {
		(5).should.be.exactly(5).and.be.a.Number;
	});
});
