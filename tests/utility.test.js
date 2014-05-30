var ut = require('../src/utility');

module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },

    'rpad': function (test) {
        test.equal('--------', ut.rpad('', '-', 8),
            'empty string returns only padString');
        test.equal('123-----', ut.rpad('123', '-', 8),
            '123-----');
        test.equal('123     ', ut.rpad('123', ' ', 8),
            '123     ');
        test.equal('  123   ', ut.rpad('  123', ' ', 8),
            '  123   ');
	    test.done();
    },

    'truncate': function (test) {
        test.equal('', ut.truncate('', 8),
            'ut.truncate(\'\') === \'\'');
        test.equal('1234', ut.truncate('1234', 8),
            '1234');
        test.equal('12345678', ut.truncate('12345678', 8),
            '12345678');
        test.equal('12345678...', ut.truncate('123456789', 8),
            '12345678...');
        test.done();
    },
};