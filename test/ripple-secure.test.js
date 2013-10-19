'use strict';

var assert = require('assert')
  , secure = require('../secure/ripple-secure')
  , should = require('should');
  

suite('ripple-secure', function() {
	var _pub;
	var _cypher;
	/*test('connect to secure db', function(done){
		secure.connect(done);
	});*/
	test('generate new key', function(done) {
    	secure.generateKeys(function(err, pub, cypher){
    		_pub = pub;
    		_cypher = _cypher;
    		done(err);	
    	});
  	});
  	test('check that key is in db', function(done){
  		secure.keyExists(_pub, function(err,result){
  				result.pub.should.eql(_pub);
  				done();
  		});
  	});
  	test('sign a new transaction', function(done){
  		var _tx = '{ "TransactionType" : "Payment", "SigningPubKey":"'+_pub+'", "Account" : "'+_pub+'", "Destination" : "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV", "Amount" : "10", "Fee" : "10", "Sequence" : 1 }';
  		var tx_JSON = JSON.parse(_tx);
  		secure.signtx(_pub, _cypher, tx_JSON, function(blob){
  			done();	
  		});
  	});
  	/*test('close to secure db', function(done){
		secure.disconnect(done);
	});*/
});