(function(root, factory) {

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['lodash', 'exports'], function (_, exports) {
      factory(root, exports, _);
    });

  // Node.js
  } else if (typeof exports !== 'undefined') {
    var _ = require('lodash');
    factory(root, exports, _);
  }

}(this, function(root, ColorfulLogger, _) {

	/*******************************
		string utilities
	*******************************/
	ColorfulLogger.stringUtility = {
		rpad: function (str, padString, length) {
	    while (str.length < length) {
	        str = str + padString;
	    }
	    return str;
		},
		truncate: function (str, length, truncateStr) {
	    if (str === null) {
	        return '';
	    }
	    str = String(str);
	    truncateStr = truncateStr || '..';
	    length = ~~length;
	    return str.length > length ? str.slice(0, length-2) + truncateStr : str;
		}
	};

	/*******************************
		ColorfulLogger
	*******************************/
	ColorfulLogger.create = function (config){
		var stringUtility = ColorfulLogger.stringUtility;

		config = config || {};

		var defaults = _.partialRight(_.assign, function(a, b) {
		  return typeof a == 'undefined' ? b : a;
		});

		var defaultConfig = {
			'enabled': true,
			'output': console,
			'padString': ' '
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
				cssList = [],
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
					this.addCss(cssList, optItem);
				}
			}
			else{
				message = this.getMessage(opt);
				message = this.truncOrPadMessage(opt, message);
				fullMessage = message;
				this.addCss(cssList, opt);
			}

			this.sendToOutput(opt, fullMessage, cssList);
			
			return true;
		};

		this.addCss = function (cssList, opt) {
			if(opt && opt.css){
				cssList.push(opt.css);
			}
		}

		this.getMessage = function(opt) {
			var message = '';
			if(_.isObject(opt)){
				message = opt.message;
			}
			else if(_.isString(opt)){
				message = opt;
			}

			if(!_.isUndefined(opt.css)){
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

		this.sendToOutput = function(opt, message, cssList) {
			if(_.isUndefined(cssList) || cssList.length === 0){
				this.config.output.log(message);
			}
			else{
				var params = [message].concat(cssList);
				this.config.output.log.apply(this.config.output, params);
			}
		};

	};

  return ColorfulLogger;

}));

