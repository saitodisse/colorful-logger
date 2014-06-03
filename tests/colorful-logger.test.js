var ColorfulLogger = require('../src/colorful-logger');
var fakeConsole = require('./fake-console');
var colorfulLogger = new ColorfulLogger.create({
	output: fakeConsole
});

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
		test.equal(' ', config.padString);

		test.done();
	},

	'call colorfulLogger.log call the output': function(test) {
		colorfulLogger.log('SOME MESSAGE');

		test.equal('log', fakeConsole.logRecorder[0].methodName);
		test.equal('SOME MESSAGE', fakeConsole.logRecorder[0].message);

		test.done();
	},

	'when disabled do not call the output': function(test){
		colorfulLogger = new ColorfulLogger.create({
			enabled: false
		});

		colorfulLogger.log('SOME MESSAGE');
		
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
			message: 'SOME MESSAGE'
		});

		test.equal('log', fakeConsole.logRecorder[0].methodName);
		test.equal('SOME MESSAGE', fakeConsole.logRecorder[0].message);
		test.equal(0, fakeConsole.logRecorder[0].cssList.length);

		test.done();
	},

	'set a color to the main message': function(test) {
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			css: 'color: #F40'
		});

		test.equal('%c' + 'SOME MESSAGE', fakeConsole.logRecorder[0].message);
		test.equal('color: #F40', fakeConsole.logRecorder[0].cssList[0]);
		test.done();
	},

	'bold text message': function(test) {
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			css: 'font-weight: bold'
		});

		test.equal('%c' + 'SOME MESSAGE', fakeConsole.logRecorder[0].message);
		test.equal('font-weight: bold', fakeConsole.logRecorder[0].cssList[0]);
		test.done();
	},

	'css can be disabled': function(test) {
		colorfulLogger.configure({
			enabledCss: false
		});
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			css: 'color: #F40; font-weight: bold'
		});

		test.equal('SOME MESSAGE', fakeConsole.logRecorder[0].message);
		test.equal(0, fakeConsole.logRecorder[0].cssList.length);
		test.done();
	},

	'can get an almost random color': function(test) {
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			randomColor: true
		});

		test.equal('%c' + 'SOME MESSAGE', fakeConsole.logRecorder[0].message);
		test.equal('color: ', fakeConsole.logRecorder[0].cssList[0].substring(0,7));
		test.done();
	},

	'ignore log globally with regex': function(test) {
		colorfulLogger.configure({
			ignorePattern: /^ignore.*/i
		});
		colorfulLogger.log('this will be printed');
		colorfulLogger.log('ignored line');
		colorfulLogger.log('IgnOrE this too');
		colorfulLogger.log('hello!');

		test.equal(2, fakeConsole.logRecorder.length);
		test.equal('this will be printed', fakeConsole.logRecorder[0].message);
		test.equal('hello!', fakeConsole.logRecorder[1].message);
		test.done();
	},


};