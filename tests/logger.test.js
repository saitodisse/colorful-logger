var colorfullLogger = require('../src/colorfull-logger');

function enableFakeConsole(colorfullLoggerCall, testCallback) {
	//bkp original console
	var oldLog = console;
	console.debug = function(str){
		testCallback(str);
	};

	//call the logger
	colorfullLoggerCall();

	//restore original console
	console = oldLog;

	// var oldLog = console;

	// console.groupCollapsed = function(groupName, groupColor){
	// 	console.log('groupName:[' + groupName + '], groupColor:[' + groupColor + ']');
	// };
	// console.groupEnd = function(){
	// 	console.log('groupEnd:');
	// };
	// console.dir = function(obj){
	// 	console.log('dir:', obj);
	// };

	// test.ok(true, 'test.ok(true)');

	// f();

}

module.exports = {
	setUp: function (callback) {
		callback();
	},
	tearDown: function (callback) {
		callback();
	},

	colorfullLogger_is_a_function: function (test) {
		test.equal('function', typeof colorfullLogger,
			'must be a function');
		test.done();
	},

	call_console_debug: function(test) {
		var message = 'this must be printed';
		enableFakeConsole(
			function() {
				colorfullLogger(message);
			},
			function(consoleResult) {
				test.equal(message, consoleResult,
					'console debug must be called with: "this must be printed"');
				test.done();
			}
		);

	},

	// can_log_a_simple_object: function (test) {
	//     enableFakeConsole(function() {
	//         var aSimpleObj = {
	//             property1: 'property 1'
	//         };
	//         var argumentsSample = {'0':1,'1':'2','2':[3]};
	//         colorfullLogger('Namespace.ObjectMethodName()', aSimpleObj, argumentsSample, 10);
	//     }, test);
		
	   //  test.done();
	// }
};