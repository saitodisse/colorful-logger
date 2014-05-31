/*global define*/
define([
	'ColorfullLogger',
	'backbone',
	'collections/todos',
	'views/todos'
], function (ColorfullLogger, Backbone, Todos, TodoView) {
	'use strict';

	var LoggerConfiguration = function() {
		var logger = new ColorfullLogger.create();
		
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
