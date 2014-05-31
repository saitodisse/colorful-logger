var ColorfulLogger = require('../src/colorful-logger');
var fakeConsole = require('./fake-console');
var colorfulLogger = new ColorfulLogger.create({
	output: fakeConsole
});

var TEN_CHARAC_MESSAGE = 'TEN_CHARAC';

module.exports = {
	setUp: function (callback) {
		colorfulLogger = new ColorfulLogger.create({
			output: fakeConsole
		});

		fakeConsole.logRecorder = [];

		callback();
	},
	
	tearDown: function (callback) {
		callback();		
	},

	'ColorfulLogger object': function(test) {
		test.equal('function', typeof ColorfulLogger.create);
		
		test.equal('object', typeof colorfulLogger);
		
		test.equal('function', typeof colorfulLogger.log);
		
		test.done();
	},

	'config has his owns defaults': function(test) {
		colorfulLogger = new ColorfulLogger.create();
		var config = colorfulLogger.config;

		test.ok(config.enabled);

		test.equal(console, config.output);

		test.done();
	},

	'call colorfulLogger.log call the output': function(test) {
		colorfulLogger.log(TEN_CHARAC_MESSAGE);

		test.equal('log', fakeConsole.logRecorder[0].methodName);
		test.equal(TEN_CHARAC_MESSAGE, fakeConsole.logRecorder[0].message);

		test.done();
	},

	'when disabled do not call the output': function(test){
		colorfulLogger = new ColorfulLogger.create({
			enabled: false
		});

		colorfulLogger.log(TEN_CHARAC_MESSAGE);
		
		test.equal(0, fakeConsole.logRecorder.length);

		test.done();
	},

	'can be disabled after initialization': function(test){
		colorfulLogger = new ColorfulLogger.create({
			enabled: false
		});
		
		colorfulLogger.configure({
			enabled: false
		});
		test.equal(false, colorfulLogger.config.enabled);

		colorfulLogger.configure({
			enabled: true
		});
		test.equal(true, colorfulLogger.config.enabled);

		test.done();
	},

	'can call with a literal object': function(test) {
		colorfulLogger.log({
			message: TEN_CHARAC_MESSAGE
		});

		test.equal('log', fakeConsole.logRecorder[0].methodName);
		test.equal(TEN_CHARAC_MESSAGE, fakeConsole.logRecorder[0].message);

		test.done();
	},

	'set a color to the main message': function(test) {
		colorfulLogger.log({
			message: TEN_CHARAC_MESSAGE,
			color: '#F40'
		});

		test.equal('%c' + TEN_CHARAC_MESSAGE, fakeConsole.logRecorder[0].message);
		test.equal('color: #F40', fakeConsole.logRecorder[0].messageConfig);
		test.done();
	},

};