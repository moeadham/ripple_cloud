// Ripple-secure has three tasks, and will only ever have three tasks.
//  1. Generate secure seed keys, generate secure cyphers, store to DB.
//  2. With the correct cypher, sign a transaction, return a blob. 
//  3. Move funds to cold storage, and maybe set account limits..
//
// Everything else can be done in a "less secure" environment, but this
// is the walled garden, as secret keys exist in RAM brefily here, 
// and are stored (encrypted).

var db = require('./db-secure'),
	crypto = require('crypto'),
	Base58Utils = require('../util/base58'),
	RippleAddress = require('../util/types').RippleAddress,
	ripple = require('ripple-lib'),
	sjcl = require('../util/sjcl');
	
var connect = function(cb){
	db.connect(cb);
};

var disconnect = function(cb){
	db.disconnect(cb);
};

var generateKeys = function(cb) {
		//This is test code. This is not real entropy.
		for (var i = 0; i < 8; i++) {
			sjcl.random.addEntropy(Math.random(), 32, "Math.random()");
		}
		var seed = sjcl.random.randomWords(4);
		var secret = Base58Utils.encode_base_check(33, sjcl.codec.bytes.fromBits(seed));
		var pub = (new RippleAddress(secret)).getAddress();
		var cypher = sjcl.random.randomWords(4);
		var keyBlob = new db.keyModel({
			pub : pub,
			secret_crypt: secret,
			seed_crypt : seed
		});
		
		encrypt(keyBlob,cypher,function(err,keyBlob){
			if(err){
				return;
			} else {
				keyBlob.save(function(err){
					if(err){
						cb(err);
					} else {
						cb(err,pub,cypher);
					}
				});
			}
		});
};

var keyExists = function(pub, cb){
	db.findOne(db.keyModel,'pub',pub,cb);
};

var encrypt = function(keyBlob, cypher, cb){
	var err;
	cb(err, keyBlob);
};

var decryptSecret = function(keyBlob, cypher, cb){
	var err;
	cb(err, keyBlob.secret_crypt);
};

var signtx = function(pub, cypher, tx_in, cb) {
	var tx = new ripple.Transaction();
	tx.tx_json = tx_in;
	var unsigned = tx.serialize().to_hex();
	keyExists(pub,function(err, result){
		decryptSecret(result,cypher, function(err,secret){
			tx._secret = secret;
			tx.complete();
			tx.sign();
			cb((tx.serialize().to_hex()));	
		});
	});
};

//db.connect();


module.exports = {
	connect : connect,
	generateKeys: generateKeys,
	signtx: signtx,
	keyExists: keyExists,
	disconnect: disconnect
};
