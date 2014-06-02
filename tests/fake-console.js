var fakeConsole = {};
fakeConsole.logRecorder = [];

fakeConsole.log = function(message, messagesConfig) {
	fakeConsole.logRecorder.push({
		'methodName': 'log',
		'message': message,
		'messagesConfig': messagesConfig
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