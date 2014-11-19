var fs = require('fs');
var Q = require('./queue.js');
var queue = Q.queue();


processGluModel = function(url) {
  fs.readFile(url, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
      console.log('received data: ' + data);
      var model = JSON.parse(data);
      console.log(model);
      queue.sendMessage({ MessageBody: "message 1" }, function(err, data) {});
      queue.sendMessage({ MessageBody: "message 2" }, function(err, data) {});
      queue.sendMessage({ MessageBody: "message 3" }, function(err, data) {});
      queue.sendMessage({ MessageBody: "message 4" }, function(err, data) {});
      queue.sendMessage({ MessageBody: "message 5" }, function(err, data) {});
    } else {
      console.log(err);
    }
  });
};

exports.processGluModel = processGluModel;
