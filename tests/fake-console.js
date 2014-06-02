var _ = require('lodash');
var fakeConsole = {};
fakeConsole.logRecorder = [];

fakeConsole.log = function() {
	var args = _.toArray(arguments);
	var message = args.shift();

	fakeConsole.logRecorder.push({
		'methodName': 'log',
		'message': message,
		'cssList': args
	});
};

fakeConsole.info = function() {

};

fakeConsole.warn = function() {

};

fakeConsole.error = function() {

};

fakeConsole.trace = function() {

};

fakeConsole.dir = function() {

};

fakeConsole.group = function() {

};

fakeConsole.groupCollapsed = function() {

};

fakeConsole.groupEnd = function() {

};

fakeConsole.time = function() {

};

fakeConsole.timeEnd = function() {

};

fakeConsole.profile = function() {

};

fakeConsole.profileEnd = function() {

};

fakeConsole.dirxml = function() {

};

fakeConsole.assert = function() {

};

fakeConsole.count = function() {

};

fakeConsole.markTimeline = function() {

};

fakeConsole.timeStamp = function() {

};

fakeConsole.clear = function() {

};


module.exports = fakeConsole;