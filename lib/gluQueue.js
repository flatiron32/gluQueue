var fs = require('fs');
var Q = require('./queue.js');

function processGluModel() {

}

function forEachArtifact(url, callback) {
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

exports.forEachArtifact = forEachArtifact;
exports.processGluModel = processGluModel;
