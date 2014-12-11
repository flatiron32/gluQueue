var nconf = require("nconf");

nconf.argv().env({
  logicalSeparator: '_'
}).file({
  file: 'db/config.json'
});

nconf.get();

exports.get = function(database) {
  return {
    host: nconf.get('database:host'),
    port: nconf.get('database:port'),
    user: nconf.get('database:user'),
    database: database
  };
};
