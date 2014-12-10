var mysql = require('mysql');
var nconf = require('nconf');

nconf.argv().env().file({
  file: 'db/config.json'
});

function Score(repository) {
  this.repository = repository;
}

Score.prototype.save = function(callback) {
  var connection = mysql.createConnection({
    host: nconf.get('database:host'),
    port: nconf.get('database:port'),
    user: nconf.get('database:user'),
    database: 'score'
  });

  connection.connect(callback);
  connection.query('INSERT INTO scores SET ?', this, function(err, result) {
    console.log("executed instert");
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      console.log(result.insertId);
    }
    console.log("closing connection");
    connection.end(callback);
  });

};

exports.Score = Score;
