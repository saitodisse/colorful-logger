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
		fakeConsole = require('./fake-console'),
		fakePreElement = require('./fake-pre-element'),
		htmlConsole = require('../src/html-console'),
		ColorfulLogger = require('../src/colorful-logger')
;

// initializing htmlConsole
htmlConsole.setHtmlOutput(fakePreElement);
htmlConsole.setLocalConsole(fakeConsole);

buster.testCase('HTML console:', {

  setUp: function () {
		//cleaning mocks
		fakeConsole.logRecorder = [];
		fakePreElement.appendRecorder = [];

	},

	tearDown: function () {
	},

	'when log is called, append some text': function(){
		equals(0, fakePreElement.appendRecorder.length);
		equals(0, fakeConsole.logRecorder.length);

		htmlConsole.log('SOME TEXT');
		
		equals(1, fakePreElement.appendRecorder.length);
		equals(1, fakeConsole.logRecorder.length);
	},

	'append a span with a style': function(){
		htmlConsole.log('%cSOME', 'color: red');

		equals('<span style="color: red">SOME</span>', fakePreElement.appendRecorder.length);
	},

});