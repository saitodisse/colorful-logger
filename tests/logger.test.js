var ColorfullLogger = require('../src/colorfull-logger');
var fakeConsole = require('./fake-console');
var colorfullLogger = new ColorfullLogger({
	output: fakeConsole
});

var TEN_CHARAC_MESSAGE = 'TEN_CHARAC';

module.exports = {
	setUp: function (callback) {
		colorfullLogger = new ColorfullLogger({
			output: fakeConsole
		});

		fakeConsole.logRecorder = [];

		callback();
	},
	
	tearDown: function (callback) {
		callback();
	},

	'ColorfullLogger object': function(test) {
		test.equal('function', typeof ColorfullLogger);
		
		test.equal('object', typeof colorfullLogger);
		
		test.equal('function', typeof colorfullLogger.log);
		
		test.done();
	},

	'config has his owns defaults': function(test) {
		colorfullLogger = new ColorfullLogger();
		var config = colorfullLogger.config;

		test.ok(config.enabled);

		test.equal(console, config.output);

		test.done();
	},

	'call colorfullLogger.log call the output': function(test) {
		colorfullLogger.log(TEN_CHARAC_MESSAGE);

		test.equal('log', fakeConsole.logRecorder[0].methodName);
		test.equal(TEN_CHARAC_MESSAGE, fakeConsole.logRecorder[0].message);

		test.done();
	},

	'when disabled do not call the output': function(test){
		colorfullLogger = new ColorfullLogger({
			enabled: false
		});

		colorfullLogger.log(TEN_CHARAC_MESSAGE);
		
		test.equal(0, fakeConsole.logRecorder.length);

		test.done();
	},

	'can be disabled after initialization': function(test){
		colorfullLogger = new ColorfullLogger({
			enabled: false
		});
		
		colorfullLogger.configure({
			enabled: false
		});
		test.equal(false, colorfullLogger.config.enabled);

		colorfullLogger.configure({
			enabled: true
		});
		test.equal(true, colorfullLogger.config.enabled);

		test.done();
	},

	'can call with a literal object': function(test) {
		colorfullLogger.log({
			message: TEN_CHARAC_MESSAGE
		});

		test.equal('log', fakeConsole.logRecorder[0].methodName);
		test.equal(TEN_CHARAC_MESSAGE, fakeConsole.logRecorder[0].message);

		test.done();
	},


};