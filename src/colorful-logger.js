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
			var fullMessage = '',
				message = '',
				messagesConfig = [],
				optItem,
				i
			;

			if(this.config.enabled === false){
				//disabled, do nothing
				return false;
			}


			if(_.isArray(opt)){
				for (i = 0; i < opt.length; i++) {
					optItem = opt[i];

					message = this.getMessage(optItem);
					message = this.truncOrPadMessage(optItem, message);
					fullMessage += message;
				}
			}
			else{
				message = this.getMessage(opt);
				message = this.truncOrPadMessage(opt, message);
				fullMessage = message;
			}


			this.sendToOutput(opt, fullMessage);
			
			return true;
		};

		this.getMessage = function(opt) {
			var message = '';
			if(_.isObject(opt)){
				message = opt.message;
			}
			else if(_.isString(opt)){
				message = opt;
			}

			if(!_.isUndefined(opt.color)){
				message = '%c' + message;
			}

			return message;
		};

		this.truncOrPadMessage = function(opt, message) {
			if(opt.size && opt.padString){
				var isSmaller = message.length <= opt.size;
				if(isSmaller){
					return stringUtility.rpad(message, opt.padString, opt.size);
				}
				else{
					return stringUtility.truncate(message, opt.size);
				}
			}
			return message;
		};

		this.sendToOutput = function(opt, message) {
			if(_.isUndefined(opt.color)){
				this.config.output.log(message);
			}
			else{
				this.config.output.log(message, 'color: ' + opt.color);
			}
		};

	};

  return ColorfulLogger;

}));

