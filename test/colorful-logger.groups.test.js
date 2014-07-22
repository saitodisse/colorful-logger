/** @license MIT License (c) Copyright (c) 2014 Julio Makdisse Saito */

/**
 * ColorfulLogger
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Julio Makdisse Saito (saitodisse@gmail.com)
 */

var buster = require('buster'),
		equals = buster.assert.equals,
		notEquals = buster.refute.equals,
		ColorfulLogger = require('../src/colorful-logger'),
		fakeConsole = require('./fake-console'),
		colorfulLogger
;

buster.testCase('Groups:', {

  setUp: function () {
		colorfulLogger = new ColorfulLogger.Logger({
			output: fakeConsole
		});

		fakeConsole.logRecorder = [];
	},

	tearDown: function () {
	},

	'create a groupCollapsed': function() {
		colorfulLogger.log({
			logType: 'groupCollapsed',
			message: 'Group 1'
		});

		equals('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		equals('Group 1',      fakeConsole.logRecorder[0].message);
	},

	'create a groupEnd': function() {
		colorfulLogger.log({
			logType: 'groupEnd'
		});

		equals('groupEnd', fakeConsole.logRecorder[0].methodName);
	},

	'create a groupCollapsed and a groupEnd': function() {
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

		equals('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		equals('Group 1',      fakeConsole.logRecorder[0].message);

		equals('log', fakeConsole.logRecorder[1].methodName);
		equals('this is inside',      fakeConsole.logRecorder[1].message);

		equals('groupEnd', fakeConsole.logRecorder[2].methodName);

	},

	'create a complex group': function() {
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

		equals('groupCollapsed', fakeConsole.logRecorder[0].methodName);
		equals('%cSomeObj   addNumbers', fakeConsole.logRecorder[0].message);
		equals('color: blue', fakeConsole.logRecorder[0].cssList[0]);

		equals('log', fakeConsole.logRecorder[1].methodName);
		equals('this is inside',      fakeConsole.logRecorder[1].message);

		equals('groupEnd', fakeConsole.logRecorder[2].methodName);

	}

});