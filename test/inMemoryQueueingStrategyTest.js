/*jshint expr: true*/
var assert = require("assert");
var should = require("should");

var queue = require('../lib/queue.js');
var imqs = require('../lib/inMemoryQueueingStrategy.js');

describe("InMemoryQueueingStrategy", function() {
  it('sends messages right to receiver', function(done) {
    var message = "Message 1234";

    function recieve(err, message) {
      message.should.equal(message);
      done();
    }

    function sent(err, messageId) {
      messageId.should.be.a.number;
    }

    var strat = new imqs.InMemoryQueueingStrategy();
    var q = new queue.Queue(strat);
    q.receiveMessage(null, recieve);
    q.sendMessage({
      MessageBody: message
    }, sent);
  });
});
