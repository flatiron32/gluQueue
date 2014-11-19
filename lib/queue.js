function Queue() {
  var recieveCallbacks = [];

  this.receiveMessage = function(params, callback) {
    recieveCallbacks.push(callback);
  };

  this.sendMessage = function(params, callback) {
    var message = params.MessageBody;
    console.log("Sending " + message);
    messageObj = new Message(message);
    recieveCallbacks.forEach(function(item) {
      item(null, new Envelope([ messageObj ]));
    });
    callback(null, {
      MD5OfMessageBody: require('crypto').createHash('md5').update(message).digest("hex"),
      MD5OfMessageAttributes: require('crypto').createHash('md5').update(messageObj.MessageAttributes.toString()).digest("hex"),
      MessageId: messageObj.MessageId
    });
  };
}

function Envelope(messages) {
  this.Messages = messages;
}

function Message(messageBody) {
  this.MessageId = 0;
  this.Body = messageBody;
  this.Attributes = {};
  this.MessageAttributes = {};
}

var queue = new Queue();

exports.queue = function () {
  return queue;
};
