/*global require*/
'use strict';

require.config({
	shim: {
		ColorfulLogger: {
			deps: ['lodash']
		},
		htmlConsole: {
			deps: ['lodash']
		}
	},
	paths: {
		lodash: '../javascripts/vendor/lodash',
		ColorfulLogger: '../javascripts/vendor/colorful-logger',
		htmlConsole: '../javascripts/vendor/html-console',
		jquery: '../javascripts/vendor/jquery'
	}
});

require([
	'groups.test.js'
], function (GroupsTest) {

	new GroupsTest();

});