/*global require*/
'use strict';

require.config({
	shim: {
		ColorfulLogger: {
			deps: ['lodash']
		},
		htmlConsole: {
			deps: ['lodash']
		}
	},
	paths: {
		lodash: 'vendor/lodash',
		ColorfulLogger: 'vendor/colorful-logger',
		htmlConsole: 'vendor/html-console',
		jquery: 'vendor/jquery'
	}
});

require([
	'./logger-examples'
], function (LoggerExamples) {

	new LoggerExamples();

});