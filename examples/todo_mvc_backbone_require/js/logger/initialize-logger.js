/*global define*/
define([
	'ColorfulLogger',
	'backbone',
	'collections/todos',
	'views/todos'
], function (ColorfulLogger, Backbone, Todos, TodoView) {
	'use strict';

	var LoggerConfiguration = function() {
		var logger = new ColorfulLogger.create();
		
		// a simple usage, not fun
		logger.log('Welcome to Meld Trace Logger');
		
		// here it is a green colored message
		logger.log({
			message: 'this message must be green',
			color: '#0A0'
		});

	};

	return LoggerConfiguration;
});
