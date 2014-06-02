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
		logger.log('Meld Trace Logger',	css: 'text-weight: bold');
		
		makeRainbow();

	};

	var makeRainbow = function() {
		// rainbow
		logger.log(
			[
				{	message: '#',	css: 'color: #f80c12' },
				{	message: '#',	css: 'color: #ee1100' },
				{	message: '#',	css: 'color: #ff3311' },
				{	message: '#',	css: 'color: #ff4422' },
				{	message: '#',	css: 'color: #ff6644' },
				{	message: '#',	css: 'color: #ff9933' },
				{	message: '#',	css: 'color: #feae2d' },
				{	message: '#',	css: 'color: #ccbb33' },
				{	message: '#',	css: 'color: #d0c310' },
				{	message: '#',	css: 'color: #aacc22' },
				{	message: '#',	css: 'color: #69d025' },
				{	message: '#',	css: 'color: #22ccaa' },
				{	message: '#',	css: 'color: #12bdb9' },
				{	message: '#',	css: 'color: #11aabb' },
				{	message: '#',	css: 'color: #4444dd' },
				{	message: '#',	css: 'color: #3311bb' },
				{	message: '#',	css: 'color: #3b0cbd' },
				{	message: '#',	css: 'color: #442299' },			
			]
		);
	};

	return LoggerConfiguration;
});
