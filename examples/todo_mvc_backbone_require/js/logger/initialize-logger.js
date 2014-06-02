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

		makeRandom();
		makeTable();
		makeRandom();

		makeGroups();

	};

	var makeRainbow = function() {
		// rainbow
		var fontSize = 'font-size: 11pt';
		logger.log(
			[
				{	message: '#',	css: 'color: #f80c12;' + fontSize },
				{	message: '#',	css: 'color: #ee1100;' + fontSize },
				{	message: '#',	css: 'color: #ff3311;' + fontSize },
				{	message: '#',	css: 'color: #ff4422;' + fontSize },
				{	message: '#',	css: 'color: #ff6644;' + fontSize },
				{	message: '#',	css: 'color: #ff9933;' + fontSize },
				{	message: '#',	css: 'color: #feae2d;' + fontSize },
				{	message: '#',	css: 'color: #ccbb33;' + fontSize },
				{	message: '#',	css: 'color: #d0c310;' + fontSize },
				{	message: '#',	css: 'color: #aacc22;' + fontSize },
				{	message: '#',	css: 'color: #69d025;' + fontSize },
				{	message: '#',	css: 'color: #22ccaa;' + fontSize },
				{	message: '#',	css: 'color: #12bdb9;' + fontSize },
				{	message: '#',	css: 'color: #11aabb;' + fontSize },
				{	message: '#',	css: 'color: #4444dd;' + fontSize },
				{	message: '#',	css: 'color: #3311bb;' + fontSize },
				{	message: '#',	css: 'color: #3b0cbd;' + fontSize },
			]
		);
	};

	var makeRandom = function() {
		// rainbow
		var messages = [];
		for (var i = 0; i < 65; i++) {
			messages.push({	message: '*',	randomColor: true });
		};
		logger.log(messages);
	};

	var makeTable = function () {
		logger.log(
			[{
				message: '10',
				size: 5
			},
			{
				message: 'different sizes',
				size: 20
			},
			{
				message: 'Lorem ipsum dolor',
				size: 40
			}]
		);

		logger.log(
			[{
				message: '20',
				size: 5
			},
			{
				message: 'but remains',
				size: 20
			},
			{
				message: 'Lorem ipsum dolor sit amet',
				size: 40
			}]
		);

		logger.log(
			[{
				message: '30',
				size: 5
			},
			{
				message: 'aligned',
				size: 20
			},
			{
				message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
				size: 40
			}]
		);
	}

	var makeGroups = function() {
		logger.log({ message: 'Group 1', logType: 'groupCollapsed', randomColor: true });
			logger.log({ message: 'Group 2', logType: 'groupCollapsed', randomColor: true });
				logger.log({ message: 'Group 3', logType: 'groupCollapsed', randomColor: true });
					logger.log({ message: 'Group 4', logType: 'groupCollapsed', randomColor: true });
						
						logger.log({
							message: 'this is inside',
							randomColor: true
						});

					logger.log({ logType: 'groupEnd' });
				logger.log({ logType: 'groupEnd' });
			logger.log({ logType: 'groupEnd' });
		logger.log({ logType: 'groupEnd' });

	};

	return LoggerConfiguration;
});
