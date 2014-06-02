var ut = require('../src/string-utility');

module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },

    'rpad': function (test) {
        test.equal('--------', ut.rpad('', '-', 8));
        test.equal('123-----', ut.rpad('123', '-', 8));
        test.equal('123     ', ut.rpad('123', ' ', 8));
        test.equal('  123   ', ut.rpad('  123', ' ', 8));
	    test.done();
    },

    'truncate': function (test) {
        test.equal('', ut.truncate('', 8));
        test.equal('1234', ut.truncate('1234', 8));
        test.equal('12345678', ut.truncate('12345678', 8));
        test.equal('123456..', ut.truncate('123456789', 8));
        test.done();
    },
};