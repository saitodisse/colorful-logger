//var utility = require('./utility');
var _ = require('lodash');

var ColorfullLogger = function ColorfullLogger(config){

	var defaults = _.partialRight(_.assign, function(a, b) {
	  return typeof a == 'undefined' ? b : a;
	});

	var defaultConfig = {
		'enabled': true,
		'output': console
	};

	defaults(config, defaultConfig);
	this.config = config;

	this.configure = function(config) {
		defaults(config, this.config);
		this.config = config;
	};

	this.log = function(message) {
		//check if it is disabled
		if(this.config.enabled === false){
			return false;
		}

		this.config.output['debug'](message);
		return true;
	};
  
};

module.exports = ColorfullLogger;