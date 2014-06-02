var ColorfulLogger = require('../src/colorful-logger');
var stringUtility = ColorfulLogger.stringUtility;

module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },

    'rpad': function (test) {
        test.equal('--------', stringUtility.rpad('', '-', 8));
        test.equal('123-----', stringUtility.rpad('123', '-', 8));
        test.equal('123     ', stringUtility.rpad('123', ' ', 8));
        test.equal('  123   ', stringUtility.rpad('  123', ' ', 8));
	    test.done();
    },

    'truncate': function (test) {
        test.equal('', stringUtility.truncate('', 8));
        test.equal('1234', stringUtility.truncate('1234', 8));
        test.equal('12345678', stringUtility.truncate('12345678', 8));
        test.equal('123456..', stringUtility.truncate('123456789', 8));
        test.done();
    },
};