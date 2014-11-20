/*jshint expr: true*/
var assert = require("assert");
var should = require("should");

var queue = require('../lib/queue.js');
var imqs = require('../lib/inMemoryQueueingStrategy.js');

describe("InMemoryQueueingStrategy", function() {
  it('sends messages right to receiver', function(done) {
    var message = "Message 1234";
    var strat = new imqs.InMemoryQueueingStrategy();

    function recieve(err, message) {
      message.should.equal(message);
      done();
    }

    function sent(err, messageId) {
      messageId.should.be.a.number;
    }

    var q = new queue.Queue(strat);
    q.receiveMessage(null, recieve);
    q.sendMessage({
      MessageBody: message
    }, sent);
  });
});
