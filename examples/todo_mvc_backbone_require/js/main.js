/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		text: '../bower_components/requirejs-text/text',

		ColorfullLogger: '../bower_components/meld-trace-logger/src/colorfull-logger'
	}
});

require([
	'backbone',
	'views/app',
	'routers/router',
	'ColorfullLogger'
], function (Backbone, AppView, Workspace, ColorfullLogger) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	new Workspace();
	Backbone.history.start();


	var logger = new ColorfullLogger();
	logger.log('this is a simple test');


	// Initialize the application view
	new AppView();
});
