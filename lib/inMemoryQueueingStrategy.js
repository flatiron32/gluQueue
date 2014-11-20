function InMemoryQueueingStrategy() {
  this.receptionCallback = function(err, message) {
    // console.log("Message " + JSON.stringify(message) + " is in-flight.");
  };
}

InMemoryQueueingStrategy.prototype.initialize = function() {
  // no-op
};

InMemoryQueueingStrategy.prototype.receiveMessage = function(params, callback) {
  var previousCallback = this.receptionCallback;
  this.receptionCallback = function(err, message) {
    callback(err, message);
    previousCallback(err, message);
  };
};

InMemoryQueueingStrategy.prototype.sendMessage = function(params, callback) {
  this.receptionCallback(null, {
    Messages: [ {
      Body: params.MessageBody
    } ]
  });
  callback(null, {
    MessageId: Date.now()
  });
};

exports.InMemoryQueueingStrategy = InMemoryQueueingStrategy;
