var mongoose = require('mongoose');

// Connect to cloud database
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/mojo-secure';

var keySchema = new mongoose.Schema({
	pub : String,
	salt  : String,
	secret_crypt : String,
	seed_crypt : String
});

var keyModel = mongoose.model('keys', keySchema);

module.exports = {
	mongoose: mongoose,
	keySchema: keySchema,
	keyModel: keyModel,
	connect: function(cb){
		// Connect to mongo		
		mongoose.connect(uristring, cb);	
	},
	disconnect: function(cb){
		mongoose.disconnect(cb);
	},
	findOne: function(model, key, val, cb){
		var q = {};
		q[key] = val;
		keyModel.findOne(q).exec(function(err, result) {
			cb(err,result);
		});
	}
};