/*global define*/
define([
	'ColorfulLogger',
], function (ColorfulLogger) {
	'use strict';

	var logger = new ColorfulLogger.Logger({
		ignorePattern: /^ignored/i
	});

	var LoggerExamples = function() {
		var titleCss = 'font-weight: bold; font-size: 12pt';

		makeRainbow();
		logger.log({ message: ' Colorful Logger',	css: titleCss });
		makeRainbow();

		logger.log('');
		logger.log({ message: '"table" like', css: titleCss });
		makeRandom();
		makeTable();
		makeRandom();

		logger.log('');
		logger.log({ message: 'groups', css: titleCss });
		makeGroups();

		logger.log('');
		logger.log({ message: 'ignore regex patterns',	css: titleCss });
		logger.log({ message: 'simple message, not ignored' });
		logger.log({ message: 'ignored console output' });

	};

	var makeRainbow = function() {
		// rainbow
		var fontSize = 'font-size: 12pt';
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

	var makeRandom = function(size) {
		// rainbow
		size = size || 65;
		var messages = [];
		for (var i = 0; i < size; i++) {
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
			makeRandom(7);
			logger.log({ message: 'Group 2', logType: 'groupCollapsed', randomColor: true });
				makeRandom(7);
				logger.log({ message: 'Group 3', logType: 'groupCollapsed', randomColor: true });
					makeRandom(7);
					logger.log({ message: 'Group 4', logType: 'groupCollapsed', randomColor: true });

						makeRandom(31);
						logger.log({
							message: 'This message is inside 4 groups',
							randomColor: true
						});
						makeRandom(31);

					logger.log({ logType: 'groupEnd' });
				logger.log({ logType: 'groupEnd' });
			logger.log({ logType: 'groupEnd' });
		logger.log({ logType: 'groupEnd' });

	};

	return LoggerExamples;
});
