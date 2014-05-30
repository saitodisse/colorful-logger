//var utility = require('./utility');
var _ = require('lodash');

var ColorfullLogger = function ColorfullLogger(config){

	config = config || {};

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

	this.log = function(opt) {
		//check if it is disabled
		if(this.config.enabled === false){
			return false;
		}

		var message = '';
		if(_.isObject(opt)){
			message = opt.message;
		}
		else if(_.isString(opt)){
			message = opt;
		}

		this.config.output['log'](message);
		return true;
	};
  
};

module.exports = ColorfullLogger;