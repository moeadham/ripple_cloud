var Remote = require('ripple-lib').Remote;

var remote = new Remote({
  // see the API Reference for available options
  trusted:        true,
  local_signing:  true,
  local_fee:      true,
  fee_cusion:     1.5,
  servers: [
    {
        host:    's1.ripple.com'
      , port:    443
      , secure:  true
    }
  ]
});



module.exports = {
	connect: function(cb){
		remote.connect(cb);
	}
};

