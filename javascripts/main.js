/*global require*/
'use strict';

require.config({
	shim: {
		ColorfulLogger: {
			deps: ['lodash']
		}
	},
	paths: {
		lodash: 'vendor/lodash',
		ColorfulLogger: 'colorful-logger'
	}
});

require([
	'./logger-examples'
], function (LoggerExamples) {

	new LoggerExamples();

});