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
			'padString': ' ',
			'enabledCss': true
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
			if(opt && (opt.css || opt.randomColor) && this.config.enabledCss){
				if(opt.randomColor){
					var someColors = ['#600','#330','#033','#21460F','#6700B9','#284','#7653C1'];
					var randomNumber = _.random(0, someColors.length-1, false);
					var oneColor = someColors[randomNumber];
					if(_.isUndefined(opt.css)){
						opt.css = 'color: ' + oneColor;
					}
					else{
						opt.css = opt.css + '; color: ' + oneColor;
					}
					
				}
				cssList.push(opt.css);
			}
		};

		this.getMessage = function(opt) {
			var message = '';
			if(_.isObject(opt)){
				message = opt.message;
			}
			else if(_.isString(opt)){
				message = opt;
			}

			var hasCss = (!_.isUndefined(opt.css) || opt.randomColor);
			if(hasCss && this.config.enabledCss){
				message = '%c' + message;
			}

			return message;
		};

		this.truncOrPadMessage = function(opt, message) {
			if(opt.size){
				var isSmaller = message.length <= opt.size;
				var padString = opt.padString || this.config.padString;
				if(isSmaller){
					return stringUtility.rpad(message, padString, opt.size);
				}
				else{
					return stringUtility.truncate(message, opt.size);
				}
			}
			return message;
		};

		this.sendToOutput = function(opt, message, cssList) {
			var localConsole = this.config.output;
			var logtype = (opt && opt.logType) || 'log';
			console.log('logtype:', logtype);

			if(_.isUndefined(cssList) || cssList.length === 0){
				localConsole[logtype](message);
			}
			else{
				var params = [message].concat(cssList);
				localConsole[logtype].apply(localConsole, params);
			}
		};

	};

  return ColorfulLogger;

}));

