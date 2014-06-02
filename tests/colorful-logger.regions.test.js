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

	'log various simple messages': function(test) {
		colorfulLogger.log(['a', 'b', 'c', 'd']);

		test.equal('abcd', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'log two objects messages': function(test) {
		colorfulLogger.log(
		[
			{
				message: 'abc'
			},
			{
				message: 'def'
			}
		]);

		test.equal('abcdef', fakeConsole.logRecorder[0].message);
		test.done();
	},

	'log two objects messages with sizes': function(test) {
		colorfulLogger.log([
			{
				message: 'abc',
				size: 4,
				padString: ' '
			},
			{
				message: 'def',
				size: 4,
				padString: ' '
			}
		]);

		test.equal('abc def ', fakeConsole.logRecorder[0].message);
		test.done();
	},

};