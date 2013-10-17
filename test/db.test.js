'use strict';

var assert = require('assert')
  , db = require('../lib/db')
  , should = require('should');
  
  
suite('database', function() {
	test('open should open database connection', function(done) {
    db.connect(done);
  });
});