/*global define*/
define([
	'ColorfulLogger',
	'backbone',
	'collections/todos',
	'views/todos'
], function (ColorfulLogger, Backbone, Todos, TodoView) {
	'use strict';

	var logger = new ColorfulLogger.create();

	var LoggerConfiguration = function() {
		
		makeRainbow();

		// a simple usage, not fun
		logger.log('Meld Trace Logger');
		
		makeRainbow();

	};

	var makeRainbow = function() {
		// rainbow
		logger.log(
			[
				{	message: '#',	color: '#f80c12' },
				{	message: '#',	color: '#ee1100' },
				{	message: '#',	color: '#ff3311' },
				{	message: '#',	color: '#ff4422' },
				{	message: '#',	color: '#ff6644' },
				{	message: '#',	color: '#ff9933' },
				{	message: '#',	color: '#feae2d' },
				{	message: '#',	color: '#ccbb33' },
				{	message: '#',	color: '#d0c310' },
				{	message: '#',	color: '#aacc22' },
				{	message: '#',	color: '#69d025' },
				{	message: '#',	color: '#22ccaa' },
				{	message: '#',	color: '#12bdb9' },
				{	message: '#',	color: '#11aabb' },
				{	message: '#',	color: '#4444dd' },
				{	message: '#',	color: '#3311bb' },
				{	message: '#',	color: '#3b0cbd' },
				{	message: '#',	color: '#442299' },			
			]
		);
	};

	return LoggerConfiguration;
});
