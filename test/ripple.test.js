'use strict';

var assert = require('assert')
  , remote = require('../src/ripple/remote')
  , should = require('should');
  
  
suite('ripple', function() {
	test('should connect to a remote ripple server', function(done) {
    remote.connect(done);
  });
});