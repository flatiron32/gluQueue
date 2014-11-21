var fs = require('fs');
var Q = require('./queue.js');
var imqs = require('./inMemoryQueueingStrategy.js');
var pkg = require(path.join(__dirname, 'package.json'));

function processModel(url, callback) {
  var strat = new imqs.InMemoryQueueingStrategy();
  var q = new Q.Queue(strat);
  q.receiveMessage({}, callback);

  enqueueApplications(url, q);
}

function enqueueApplications(url, q, callback) {
  enqueue = function(err, applicationName) {
    q.sendMessage({
      MessageBody: applicationName
    }, function() {
    });
  };

  var count = forEachApplication(url, enqueue);
  if (callback) {
    callback(null, count);
  }
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

exports.processModel = processModel;
exports.forEachApplication = forEachApplication;
exports.enqueueApplications = enqueueApplications;

processModel(url, function(err, message) {
  console.log(message);
});
