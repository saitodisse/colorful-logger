(function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['lodash', './string-utility', 'exports'], function (_, stringUtility, exports) {
      factory(root, exports, _, stringUtility);
    });

  // Node.js
  } else if (typeof exports !== 'undefined') {
    var _ = require('lodash');
    var stringUtility = require('./string-utility');
    factory(root, exports, _, stringUtility);
  }

}(this, function(root, ColorfulLogger, _, stringUtility) {
	ColorfulLogger.create = function (config){
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

			if(opt.size && opt.padString){
				var isSmaller = message.length <= opt.size;
				if(isSmaller){
					message = stringUtility.rpad(message, opt.padString, opt.size);
				}
				else{
					message = stringUtility.truncate(message, opt.size);
				}
			}

			if(_.isUndefined(opt.color)){
				this.config.output.log(message);
			}
			else{
				this.config.output.log('%c' + message, 'color: ' + opt.color);
			}

			
			return true;
		};
	};

  return ColorfulLogger;

}));

