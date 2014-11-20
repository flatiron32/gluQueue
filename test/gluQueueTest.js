var assert = require("assert");
var should = require("should");

var GQ = require('../lib/gluQueue.js');

describe("gluQueue", function() {
  describe("processGluModel", function() {
    it('should send 5 unique messages', function(done) {

      var count = 0;
      function counter(err, applicationName) {
        (err === null).should.equal(true);

        switch (count) {
        case 0:
          applicationName.should.equal("orbitz-host-itsb");
          break;
        case 1:
          applicationName.should.equal("orbitz-host-gash");
          break;
        case 2:
          applicationName.should.equal("orbitz-host-tbs-shop");
          break;
        case 3:
          applicationName.should.equal("orbitz-host-tbs-txn");
          break;
        case 4:
          applicationName.should.equal("orbitz-web-wl");
          done();
          break;
        }
        count++;
      }

      GQ.processGluModel("glu.json", counter);
    });

    it('should invoke call with error', function(done) {

      function expectError(err, applicationName) {
        (err !== null).should.equal(true);
        (applicationName === null).should.equal(true);
      }

      GQ.processGluModel("invalid.json", expectError);
      done();
    });
  });
});
