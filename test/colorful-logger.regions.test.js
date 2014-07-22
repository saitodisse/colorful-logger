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

buster.testCase('Regions:', {

  setUp: function () {
		colorfulLogger = new ColorfulLogger.Logger({
			output: fakeConsole
		});

		fakeConsole.logRecorder = [];
	},

	tearDown: function () {
	},

	'message size smaller add some pad strings': function() {
		colorfulLogger.log({
			message: '12345',
			size: 10,
			padString: ' '
		});

		equals('12345     ', fakeConsole.logRecorder[0].message);
	},

	'message size bigger make a cut with two dots': function() {
		colorfulLogger.log({
			message: '12345678901',
			size: 10,
			padString: ' '
		});

		equals('12345678..', fakeConsole.logRecorder[0].message);
	},

	'log two simple messages': function() {
		colorfulLogger.log(['ab','cd']);

		equals('abcd', fakeConsole.logRecorder[0].message);
	},

	'log various simple messages': function() {
		colorfulLogger.log(['a', 'b', 'c', 'd']);

		equals('abcd', fakeConsole.logRecorder[0].message);
	},

	'log two objects messages': function() {
		colorfulLogger.log(
		[
			{
				message: 'abc'
			},
			{
				message: 'def'
			}
		]);

		equals('abcdef', fakeConsole.logRecorder[0].message);
	},

	'log two objects messages with sizes': function() {
		colorfulLogger.log([
			{
				message: 'abc',
				size: 4
			},
			{
				message: 'def',
				size: 4
			}
		]);

		equals('abc def ', fakeConsole.logRecorder[0].message);
	},

	'must have %c with colors': function() {
		colorfulLogger.log([
			{
				message: 'abc',
				css: 'color: #12F'
			},
			{
				message: 'def',
				css: 'color: #F21'
			}
		]);

		equals('%cabc%cdef', fakeConsole.logRecorder[0].message);
	},

	'must correct color CSS': function() {
		colorfulLogger.log([
			{
				message: 'abc',
				css: 'color: #12F'
			},
			{
				message: 'def',
				css: 'color: #F21'
			}
		]);

		equals(true, _.isArray(fakeConsole.logRecorder[0].cssList));
		equals('color: #12F', fakeConsole.logRecorder[0].cssList[0]);
		equals('color: #F21', fakeConsole.logRecorder[0].cssList[1]);
	},

	'first message has CSS but not the second, ugly thing to do': function() {
		colorfulLogger.log([
			{
				message: 'SomeObj',
				css: 'color: blue',
				size: 10
			},
  		{
  			message: 'addNumbers'
  		}
  	]);

		equals('%cSomeObj   addNumbers', fakeConsole.logRecorder[0].message);
		equals('color: blue', fakeConsole.logRecorder[0].cssList[0]);
	},

});