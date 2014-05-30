var colorfullLogger = require('../src/colorfull-logger');

function enableFakeConsole(f, test) {
    var oldLog = console;

    console.groupCollapsed = function(groupName, groupColor){
        console.log('groupName:[' + groupName + '], groupColor:[' + groupColor + ']');
    };
    console.groupEnd = function(){
        console.log('groupEnd:');
    };
    console.debug = function(str){
        console.log('debug:', str);
    };
    console.dir = function(obj){
        console.log('dir:', obj);
    };

    // console.log = function(str) {
    //     console.log('log:', str);
    // };

    test.ok(true, 'test.ok(true)');

    f();

    console = oldLog;
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

    can_log_a_simple_object: function (test) {
        enableFakeConsole(function() {
            var aSimpleObj = {
                property1: 'property 1'
            };
            var argumentsSample = {'0':1,'1':'2','2':[3]};
            colorfullLogger('Namespace.ObjectMethodName()', aSimpleObj, argumentsSample, 10);
        }, test);
        
	    test.done();
    }
};