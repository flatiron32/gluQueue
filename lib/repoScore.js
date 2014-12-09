var fs = require('fs');
var git = require('gift');
var tmp = require('tmp');
tmp.setGracefulCleanup();

exports.scoreRepo = function(repo, callback) {
  tmp.dir(function _tempDirCreated(err, path) {
    if (err)
      callback(err);

    git.clone(repo, path, function(err, repo) {
      if (err) {
        callback(err);
      } else {
        callback(err, path, 0);
      }
    });
  });
};

exports.scoreFileSystem = function(path, callback) {
  fs.stat(path, function(err, stats) {
    var score = 0;
    var error = "";
    if (err) {
      error = err;
    } else {
      if (stats.isDirectory()) {
        try {
          var stats = fs.statSync(path + "/build.sh");
          if (stats.isFile()) {
            score++;
          }
        } catch (err) {
          // Ignore
        }
      } else {
        error = "directory does not exist";
      }
    }

    if (error) {
      callback(error);
    } else {
      callback(null, score);
    }
  });
};
