function Queue(strategy) {
  this.strategy = strategy;
  strategy.initialize();
}

Queue.prototype.receiveMessage = function(params, callback) {
  this.strategy.receiveMessage(params, function(err, data) {
    callback(err, data.Messages[0].Body);
  });
};

Queue.prototype.sendMessage = function(params, callback) {
  this.strategy.sendMessage(params, function(err, data) {
    callback(err, data.MessageId);
  });
};

exports.Queue = Queue;
