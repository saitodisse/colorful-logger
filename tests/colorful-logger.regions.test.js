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

	'message size smaller add some pad strings': function(test) {
		colorfulLogger.log({
			message: '12345',
			size: 10,
			padString: ' '
		});

		test.equal('12345     ', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'message size bigger make a cut with two dots': function(test) {
		colorfulLogger.log({
			message: '12345678901',
			size: 10,
			padString: ' '
		});

		test.equal('12345678..', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'log two simple messages': function(test) {
		colorfulLogger.log(['ab','cd']);

		test.equal('abcd', fakeConsole.logRecorder[0].message);
		test.done();
	},

	// 'log two simple messages': function(test) {
	// 	colorfulLogger.log(
	// 	[
	// 		{
	// 			message: 'ab'
	// 		},
	// 		{
	// 			message: 'cd'
	// 		}
	// 	]);

	// 	test.equal('abcd', fakeConsole.logRecorder[0].message);
	// 	test.done();
	// },


};