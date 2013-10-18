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
  		secure.keyExists(_pub, done);
  	});
  	/*var _tx;
  	var tx_JSON = JSON.parse(_tx);
  	test('sign a new transaction', function(done){
  		blob = secure.signtx(_pub, _key, _tx);
  		done();
  	});*/
  	test('close to secure db', function(done){
		secure.disconnect(done);
	});
});