/*jshint expr: true*/
var should = require("should");
var mysql = require('mysql');
var nconf = require('nconf');

nconf.argv().env().file({
  file: 'db/config.json'
});

var Score = require('../lib/score.js').Score;

describe("saveScore", function() {
  describe("save", function() {
    it('should save score', function(done) {
      var repo = "repo 1";
      var score = new Score(repo);
      score.score = 100;

      var connection = mysql.createConnection({
        host: nconf.get('database:host'),
        port: nconf.get('database:port'),
        user: nconf.get('database:user'),
        database: 'score'
      });

      var initialCount = 0;
      connection.query('SELECT count(*) as count FROM scores', function(err, rows, fields) {
        (!err).should.be.true;
        initialCount = rows[0].count;
      });
      connection.end();
      score.save(function(err) {
        (!err).should.be.true;
        var connection = mysql.createConnection({
          host: nconf.get('database:host'),
          port: nconf.get('database:port'),
          user: nconf.get('database:user'),
          database: 'score'
        });

        connection.query('SELECT count(*) as count FROM scores', function(err, rows, fields) {
          (!err).should.be.true;
          rows[0].count.should.be.greaterThan(initialCount);
          connection.end(done);
        });
      });
    });
  });
});
