var crypto = require('crypto'),
	Base58Utils = require('./util/base58'),
	RippleAddress = require('./util/types').RippleAddress,
	ripple = require('ripple-lib'),
	sjcl = require('./util/sjcl');

var generateKeys = function() {
		//sjcl.random.addEntropy(crypto.randomBytes(256), 32, "crypto.randomBytes(256)");
		for (var i = 0; i < 8; i++) {
			sjcl.random.addEntropy(Math.random(), 32, "Math.random()");
		}
		var seed = Base58Utils.encode_base_check(33, sjcl.codec.bytes.fromBits(sjcl.random.randomWords(4)));
		var pub = (new RippleAddress(seed)).getAddress();
		return {
			secret : seed,
			pub : pub
		};
};
var signtx = function(secret, tx_in) {
	var tx_JSON = JSON.parse(tx_in);
	var tx = new ripple.Transaction();
	tx.tx_json = tx_JSON;
	tx._secret = secret;
	tx.complete();
	var unsigned = tx.serialize().to_hex();
	tx.sign();
	return (tx.serialize().to_hex());
};

var keys = generateKeys();
console.log(keys.pub);
console.log(keys.secret);

module.exports = {
	generateKeys: generateKeys,
	signtx: signtx
};
