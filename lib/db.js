var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database

var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/mojo';

// Connect to mongo
function connect(cb) {
  mongoose.connect(uristring, cb);
}

function disconnect() {mongoose.disconnect()}