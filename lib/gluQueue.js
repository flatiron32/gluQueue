var fs = require('fs');
var Q = require('./queue.js');
var imqs = require('./inMemoryQueueingStrategy.js');

function enqueueApplications(url, q, callback) {
  enqueue = function(err, applicationName) {
    q.sendMessage({
      MessageBody: applicationName
    }, function() {
    });
  };

  var count = forEachApplication(url, enqueue);
  callback(null, count);
}

function forEachApplication(url, callback) {
  fs.readFile(url, {
    encoding: 'utf-8'
  }, function(err, data) {
    if (!err) {
      var model = JSON.parse(data);

      var artifacts = model.entries.map(function(entry) {
        return entry.initParameters.artifact.project;
      }).filter(function(element, index, self) {
        return self.indexOf(element) === index;
      });

      artifacts.forEach(function(artifact) {
        callback(null, artifact);
      });
    } else {
      callback(err, null);
    }
  });
}

exports.forEachApplication = forEachApplication;
exports.enqueueApplications = enqueueApplications;
