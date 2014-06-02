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
		logger.log({
			message: ' Meld Trace Logger',
			css: 'font-weight: bold; font-size: 10pt'
		});

		makeRainbow();

		makeTable();
	};

	var makeRainbow = function() {
		// rainbow
		logger.log(
			[
				{	message: '#',	css: 'color: #f80c12; font-size: 11pt' },
				{	message: '#',	css: 'color: #ee1100; font-size: 11pt' },
				{	message: '#',	css: 'color: #ff3311; font-size: 11pt' },
				{	message: '#',	css: 'color: #ff4422; font-size: 11pt' },
				{	message: '#',	css: 'color: #ff6644; font-size: 11pt' },
				{	message: '#',	css: 'color: #ff9933; font-size: 11pt' },
				{	message: '#',	css: 'color: #feae2d; font-size: 11pt' },
				{	message: '#',	css: 'color: #ccbb33; font-size: 11pt' },
				{	message: '#',	css: 'color: #d0c310; font-size: 11pt' },
				{	message: '#',	css: 'color: #aacc22; font-size: 11pt' },
				{	message: '#',	css: 'color: #69d025; font-size: 11pt' },
				{	message: '#',	css: 'color: #22ccaa; font-size: 11pt' },
				{	message: '#',	css: 'color: #12bdb9; font-size: 11pt' },
				{	message: '#',	css: 'color: #11aabb; font-size: 11pt' },
				{	message: '#',	css: 'color: #4444dd; font-size: 11pt' },
				{	message: '#',	css: 'color: #3311bb; font-size: 11pt' },
				{	message: '#',	css: 'color: #3b0cbd; font-size: 11pt' },
			]
		);
	};

	var makeTable = function () {
		logger.log(
			[{
				message: '10',
				size: 10
			},
			{
				message: 'different sizes',
				size: 10
			},
			{
				message: 'Lorem ipsum dolor',
				size: 20
			}]
		);

		logger.log(
			[{
				message: '20',
				size: 10
			},
			{
				message: 'but remains',
				size: 10
			},
			{
				message: 'Lorem ipsum dolor sit amet',
				size: 20
			}]
		);

		logger.log(
			[{
				message: '30',
				size: 10
			},
			{
				message: 'aligned',
				size: 10
			},
			{
				message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
				size: 20
			}]
		);
	}

	return LoggerConfiguration;
});
