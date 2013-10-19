'use strict';

var assert = require('assert')
  , mongoose = require('../lib/db')
  , should = require('should');
  
  
suite('database', function() {
	test('open should open database connection', function(done) {
    	mongoose.connect(done);
  });
});