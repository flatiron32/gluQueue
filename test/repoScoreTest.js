/*jshint expr: true*/
var should = require("should");

var repoScore = require('../lib/repoScore.js');

describe("repoScore", function() {
  describe("scoreRepo", function() {
    it('should callback with score if repo exists', function(done) {
      var repo = "./test/repos/empty";
      repoScore.scoreRepo(repo, function(err, path, score) {
        if (err) {
          err.should.not.be.ok;
        } else {
          score.should.be.type('number');
          score.should.equal(0);
          path.should.be.type('string');
        }
        done();
      });
    });

    it('should return error if repo does not exist', function(done) {
      var repo = "./test/repos/doesNotExist";
      repoScore.scoreRepo(repo, function(err, path, score) {
        if (err) {
          err.should.be.ok;
          (path === undefined).should.be.true;
          (score === undefined).should.be.true;
        } else {
          err.should.be.ok;
        }
        done();
      });
    });
  });

  describe("scoreFileSystem", function() {
    it('should callback with error if path does not exist', function(done) {
      repoScore.scoreFileSystem("./test/repos/doesNotExist", function(err, score) {
        if (err) {
          err.should.be.ok;
          should.not.exist(score);
        } else {
          err.should.be.ok;
        }
        done();
      });
    });
    it('should callback with error if path is not directory', function(done) {
      repoScore.scoreFileSystem("./test/repos/file", function(err, score) {
        if (err) {
          err.should.equal("directory does not exist");
          should.not.exist(score);
        } else {
          err.should.be.ok;
        }
        done();
      });
    });
    it('should return 0 if path exists', function(done) {
      repoScore.scoreFileSystem("./test/repos/empty", function(err, score) {
        if (err) {
          err.should.not.be.ok;
        } else {
          score.should.be.type('number');
          score.should.equal(0);
        }
        done();
      });
    });
    it('should calculate basic score', function(done) {
      repoScore.scoreFileSystem("./test/repos/basic", function(err, score) {
        if (err) {
          err.should.not.be.ok;
        } else {
          score.should.be.type('number');
          score.should.equal(1);
        }
        done();
      });
    });
  });
});
