var colorfullLogger = require('../colorfull-logger');

module.exports = {
    setUp: function (callback) {
	    console.groupCollapsed = function(){};
	    console.groupEnd = function(){};
	    console.debug = function(){};
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },

    isFunction: function (test) {
	    test.equal('function', typeof colorfullLogger);
	    test.done();
    },

    canBeCalled: function (test) {
	    colorfullLogger('Namespace.method()', this, arguments, 10);
	    test.ok(true, 'errors occurred');
	    test.done();
    }
};