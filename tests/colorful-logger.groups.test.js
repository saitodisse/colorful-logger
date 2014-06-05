var ColorfulLogger = require('../src/colorful-logger');
var fakeConsole = require('./fake-console');
var colorfulLogger = new ColorfulLogger.Logger({
	output: fakeConsole
});

module.exports = {
	setUp: function (callback) {
		colorfulLogger = new ColorfulLogger.Logger({
			output: fakeConsole
		});

		fakeConsole.logRecorder = [];

		callback();
	},
	
	tearDown: function (callback) {
		callback();		
	},

	'create a groupCollapsed': function(test) {
		colorfulLogger.log({
			logType: 'groupCollapsed',
			message: 'Group 1'
		});

		test.equal('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		test.equal('Group 1',      fakeConsole.logRecorder[0].message);

		test.done();
	},

	'create a groupEnd': function(test) {
		colorfulLogger.log({
			logType: 'groupEnd'
		});

		test.equal('groupEnd', fakeConsole.logRecorder[0].methodName);

		test.done();
	},

	'create a groupCollapsed and a groupEnd': function(test) {
		colorfulLogger.log({
			logType: 'groupCollapsed',
			message: 'Group 1'
		});
		colorfulLogger.log({
			message: 'this is inside'
		});
		colorfulLogger.log({
			logType: 'groupEnd'
		});

		test.equal('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		test.equal('Group 1',      fakeConsole.logRecorder[0].message);

		test.equal('log', fakeConsole.logRecorder[1].methodName);
		test.equal('this is inside',      fakeConsole.logRecorder[1].message);

		test.equal('groupEnd', fakeConsole.logRecorder[2].methodName);

		test.done();
	},

	'create a complex group': function(test) {
		colorfulLogger.log([
			{
				logType: 'groupCollapsed',
				message: 'SomeObj',
				css: 'color: blue',
				size: 10
			},
  		{
  			message: 'addNumbers'
  		}
		]);

		colorfulLogger.log({
			message: 'this is inside'
		});

		colorfulLogger.log({
			logType: 'groupEnd'
		});

		test.equal('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		test.equal('%cSomeObj   addNumbers', fakeConsole.logRecorder[0].message);
		test.equal('color: blue', fakeConsole.logRecorder[0].cssList[0]);

		test.equal('log', fakeConsole.logRecorder[1].methodName);
		test.equal('this is inside',      fakeConsole.logRecorder[1].message);

		test.equal('groupEnd', fakeConsole.logRecorder[2].methodName);

		test.done();
	},

};