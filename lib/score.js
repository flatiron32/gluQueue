var mysql = require('mysql');
var ds = require('./datasource.js');

function Score(repository) {
  this.repository = repository;
}

Score.prototype.save = function(callback) {
  var connection = mysql.createConnection(ds.get('score'));

  connection.query('INSERT INTO scores SET ?', this, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(undefined);
    }
  });
  connection.end();
};

exports.Score = Score;
