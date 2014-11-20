var assert = require("assert");
var should = require("should");

var queue = require('../lib/queue.js');

describe("queue", function() {
  describe("constructor", function() {
    it('should take a strategy', function() {
      var strat = new TestQueueingStrategy();
      new queue.Queue(strat);
      strat.initialized.should.be.true;
    });
  });
  
  describe("recieveMessage", function() {
    it('unpacks message envolope from strategy and delegates message to callback', function(done) {
      var strat = new TestQueueingStrategy();
      
      function recieve(err, message) {
        message.should.equal("Message Received");
        done();
      }
      
      new queue.Queue(strat).receiveMessage(null, recieve);
    });
  });
  
  describe("sendMessage", function() {
    it('packs message and delegates response callback to strategy', function(done) {
      var strat = new TestQueueingStrategy();
      
      function sent(err, messageId) {
        messageId.should.equal(1234);
        done();
      }
      
      new queue.Queue(strat).sendMessage({MessageBody: "Message Sent"}, sent);
    });
  });
});

function TestQueueingStrategy() {
  this.initialized = false;
}

TestQueueingStrategy.prototype.initialize = function() {
  this.initialized = true;
}

TestQueueingStrategy.prototype.receiveMessage = function(params, callback) {
  callback(null, new SimpleEnvelope("Message Received"));
}

TestQueueingStrategy.prototype.sendMessage = function(params, callback) {
  params.MessageBody.should.equal("Message Sent");
  callback(null, {MessageId: 1234});
}

function SimpleEnvelope(message) {
  this.Messages = [{
      Body: message
  }];
};
