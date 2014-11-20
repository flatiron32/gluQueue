var assert = require("assert");
var should = require("should");

var GQ = require('../lib/gluQueue.js');
var queue = require('../lib/queue.js');
var imqs = require('../lib/inMemoryQueueingStrategy.js');

describe("gluQueue", function() {
  describe("forEachApplications", function() {
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

      GQ.forEachApplication("glu.json", counter);
    });

    it('should invoke call with error', function(done) {

      function expectError(err, applicationName) {
        (err !== null).should.equal(true);
        (applicationName === null).should.equal(true);
      }

      GQ.forEachApplication("invalid.json", expectError);
      done();
    });
  });

  describe("enqueueApplications", function() {
    it('should enqueue 5 unique messages', function(done) {

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
          break;
        }
        count++;
      }

      var strat = new imqs.InMemoryQueueingStrategy();
      var q = new queue.Queue(strat);
      q.receiveMessage({}, counter);

      GQ.enqueueApplications("glu.json", q, done);
    });
  });
});
