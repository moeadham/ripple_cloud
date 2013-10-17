var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Connect to cloud database
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/mojo';

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

module.exports = {
	mongoose: mongoose,
	Schema: Schema,
	connect: function(cb){
		// Connect to mongo		
		mongoose.connect(uristring, cb);	
	},
	disconnect: function(cb){
		mongoose.disconnect(cb);
	}
};