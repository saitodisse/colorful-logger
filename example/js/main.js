/*global require*/
'use strict';

require.config({
	shim: {
		ColorfulLogger: {
			deps: ['lodash']
		}
	},
	paths: {
		lodash: '../bower_components/lodash/dist/lodash',
		ColorfulLogger: '../bower_components/colorful-logger/src/colorful-logger'
	}
});

require([
	'./logger-examples'
], function (LoggerExamples) {
	
	new LoggerExamples();

});
