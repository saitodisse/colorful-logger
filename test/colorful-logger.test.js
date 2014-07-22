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
		_ = require('lodash'),
		colorfulLogger
;

buster.testCase('Main:', {

  setUp: function () {
		colorfulLogger = new ColorfulLogger.Logger({
			output: fakeConsole
		});

		fakeConsole.logRecorder = [];
	},

	tearDown: function () {
	},

	'ColorfulLogger object': function() {
		equals('function', typeof ColorfulLogger.Logger);
		
		equals('object', typeof colorfulLogger);
		
		equals('function', typeof colorfulLogger.log);
	},

	'config has his owns defaults': function() {
		colorfulLogger = new ColorfulLogger.Logger();
		var config = colorfulLogger.config;

		equals(true, config.enabled);
		equals(console, config.output);
		equals(' ', config.padString);

	},

	'call colorfulLogger.log call the output': function() {
		colorfulLogger.log('SOME MESSAGE');

		equals('log', fakeConsole.logRecorder[0].methodName);
		equals('SOME MESSAGE', fakeConsole.logRecorder[0].message);

	},

	'when disabled do not call the output': function(){
		colorfulLogger = new ColorfulLogger.Logger({
			enabled: false
		});

		colorfulLogger.log('SOME MESSAGE');
		
		equals(0, fakeConsole.logRecorder.length);

	},

	'can be disabled after initialization': function(){
		colorfulLogger = new ColorfulLogger.Logger({
			enabled: false
		});
		
		colorfulLogger.configure({
			enabled: false
		});
		equals(false, colorfulLogger.config.enabled);

		colorfulLogger.configure({
			enabled: true
		});
		equals(true, colorfulLogger.config.enabled);

	},

	'can call with a literal object': function() {
		colorfulLogger.log({
			message: 'SOME MESSAGE'
		});

		equals('log', fakeConsole.logRecorder[0].methodName);
		equals('SOME MESSAGE', fakeConsole.logRecorder[0].message);
		equals(0, fakeConsole.logRecorder[0].cssList.length);

	},

	'set a color to the main message': function() {
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			css: 'color: #F40'
		});

		equals('%c' + 'SOME MESSAGE', fakeConsole.logRecorder[0].message);
		equals('color: #F40', fakeConsole.logRecorder[0].cssList[0]);
	},

	'bold text message': function() {
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			css: 'font-weight: bold'
		});

		equals('%c' + 'SOME MESSAGE', fakeConsole.logRecorder[0].message);
		equals('font-weight: bold', fakeConsole.logRecorder[0].cssList[0]);
	},

	'css can be disabled': function() {
		colorfulLogger.configure({
			enabledCss: false
		});
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			css: 'color: #F40; font-weight: bold'
		});

		equals('SOME MESSAGE', fakeConsole.logRecorder[0].message);
		equals(0, fakeConsole.logRecorder[0].cssList.length);
	},

	'can get an almost random color': function() {
		colorfulLogger.log({
			message: 'SOME MESSAGE',
			randomColor: true
		});

		equals('%c' + 'SOME MESSAGE', fakeConsole.logRecorder[0].message);
		equals('color: ', fakeConsole.logRecorder[0].cssList[0].substring(0,7));
	},

	'ignore log globally with regex': function() {
		colorfulLogger.configure({
			ignorePattern: /^ignore.*/i
		});
		colorfulLogger.log('this will be printed');
		colorfulLogger.log('ignored line');
		colorfulLogger.log('IgnOrE this too');
		colorfulLogger.log('hello!');

		equals(2, fakeConsole.logRecorder.length);
		equals('this will be printed', fakeConsole.logRecorder[0].message);
		equals('hello!', fakeConsole.logRecorder[1].message);
	},


});