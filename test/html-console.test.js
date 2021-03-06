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
		fakePreElement.innerHTML = '';
		htmlConsole.firstGroupCollapsed = undefined;
		htmlConsole.currentGroup = undefined;
	},

	tearDown: function () {
	},

	'when log is called, append some text': function(){
		equals(0, fakePreElement.innerHTML.length);
		equals(0, fakeConsole.logRecorder.length);

		htmlConsole.log('LOG');
		
		equals(true, fakePreElement.innerHTML.length > 0);
		equals(1, fakeConsole.logRecorder.length);
	},

	'append a span with a style': function(){
		htmlConsole.log('%cSOME', 'color: red');

		equals('<span style="color: red">SOME</span>\n', fakePreElement.innerHTML);
	},

	'two style at the same log': function(){
		htmlConsole.log('%cSOME %cLOG', 'color: red', 'color: blue');

		equals('<span style="color: red">SOME </span><span style="color: blue">LOG</span>\n', fakePreElement.innerHTML);
	},

	'groupCollapsed do not do nothing yet, just add an item to groupList': function(){
		htmlConsole.groupCollapsed('gc1');

		equals(0, fakePreElement.innerHTML.length);
		equals('gc1', htmlConsole.currentGroup.title);
	},

	'groupCollapsed can have css': function(){
		htmlConsole.groupCollapsed('%cgc1', 'color: red');

		equals('<span style="color: red">gc1</span>', htmlConsole.currentGroup.title);
	},

	'groupEnd prints a group': function(){
		htmlConsole.groupCollapsed('gc1');
		htmlConsole.groupEnd();
		equals('<div class="gc"><div class="gc_title">gc1</div><div class="gc_body"></div></div>\n', fakePreElement.innerHTML);
	},

	'groupCollapsed with log inside': function(){
		htmlConsole.groupCollapsed('gc1');
		htmlConsole.log('%cSOME', 'color: red');
		htmlConsole.groupEnd();

		equals(	// the first group
							'<div class="gc">'							
						+		'<div class="gc_title">'
						+			'gc1'
						+		'</div>'
						+		'<div class="gc_body">'

						+			'<span style="color: red">SOME</span>\n'

						+		'</div>'
						+	'</div>'
						+	'\n', fakePreElement.innerHTML);

	},

	'groupCollapsed with another groupCollapsed inside': function(){
		htmlConsole.groupCollapsed('gc1');
			htmlConsole.groupCollapsed('gc2');
			htmlConsole.groupEnd();
		htmlConsole.groupEnd();

		equals(	// the first group
							'<div class="gc">'							
						+		'<div class="gc_title">'
						+			'gc1'
						+		'</div>'
						+		'<div class="gc_body">'

						// the second group is inside
						+			'<div class="gc">'
						+				'<div class="gc_title">'
						+					'gc2'
						+				'</div>'
						+				'<div class="gc_body">'
						+				'</div>'
						+			'</div>'

						+		'</div>'
						+	'</div>'
						+	'\n', fakePreElement.innerHTML);
	},

	'two logs inside the group': function(){
		htmlConsole.groupCollapsed('gc1');
			htmlConsole.log('LOG 1');
			htmlConsole.log('LOG 2');
		htmlConsole.groupEnd();

		equals(	// the first group
							'<div class="gc">'							
						+		'<div class="gc_title">'
						+			'gc1'
						+		'</div>'
						+		'<div class="gc_body">'

						+			'LOG 1\n'
						+			'LOG 2\n'

						+		'</div>'
						+	'</div>'
						+	'\n', fakePreElement.innerHTML);
	},

});