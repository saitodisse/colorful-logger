var ColorfullLogger = require('../src/colorfull-logger');
var fakeConsole = require('./fake-console');
var colorfullLogger = new ColorfullLogger({
	output: fakeConsole
});

var TEN_CHARAC_MESSAGE = 'TEN_CHARAC';

module.exports = {
	setUp: function (callback) {
		callback();
	},
	
	tearDown: function (callback) {
		callback();
	},

	colorfullLogger_is_an_object: function (test) {
		test.equal('function', typeof ColorfullLogger,
			'ColorfullLogger must be a constructor function');
		
		test.equal('object', typeof colorfullLogger,
			'colorfullLogger must be an object');
		
		test.equal('function', typeof colorfullLogger.log,
			'colorfullLogger.log must be a function');
		
		test.done();
	},

	config_has_his_defaults: function(test) {
		var config = colorfullLogger.config;

		test.ok(config.enabled,
			'enabled === true');

		test.done();
	},

	call_console_debug: function(test) {
		colorfullLogger.log(TEN_CHARAC_MESSAGE);

		test.equal('debug', fakeConsole.logRecorder[0].methodName);
		test.equal(TEN_CHARAC_MESSAGE, fakeConsole.logRecorder[0].message);

		test.done();
	},

	disabled_on_startup: function(test){
		colorfullLogger = new ColorfullLogger({
			enabled: false
		});

		colorfullLogger.log(TEN_CHARAC_MESSAGE);
		
		test.equal(0, fakeConsole.logRecorder.length);

		test.done();
	},

	// disabled_after_startup: function(test){
	// 	colorfullLogger.configure({
	// 		enabled: false
	// 	});
		
	// 	var mustBeFalse = colorfullLogger.log('it is disabled');
	// 	test.ok(!mustBeFalse,
	// 		'returns false when disabled');
		
	// 	test.done();
	// },

	// enabled_after_startup: function(test){
	// 	//create disabled
	// 	colorfullLogger = new ColorfullLogger({
	// 		enabled: false
	// 	});

	// 	//enable afterwards
	// 	colorfullLogger.configure({
	// 		enabled: true
	// 	});
		

	// 	fakeConsole.consoleCallback.consoleDebug = function(strResult) {
	// 		test.equal(TEN_CHARAC_MESSAGE, strResult,
	// 			'the message must be received by console.debug');
	// 		test.done();
	// 	};

	// 	colorfullLogger.log(TEN_CHARAC_MESSAGE);
	// },
};