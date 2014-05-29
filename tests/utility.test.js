var ut = require('../utility');

module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },

    rpadTest: function (test) {
        test.equal('--------', ut.rpad('', '-', 8));
        test.equal('123-----', ut.rpad('123', '-', 8));
        test.equal('123     ', ut.rpad('123', ' ', 8));
        test.equal('  123   ', ut.rpad('  123', ' ', 8));
	    test.done();
    },

    truncateTest: function (test) {
        test.equal('', ut.truncate('', 8));
        test.equal('1234', ut.truncate('1234', 8));
        test.equal('12345678', ut.truncate('12345678', 8));
        test.equal('12345678...', ut.truncate('123456789', 8));
        test.done();
    },

    _isObjectTest: function (test) {
        var anObject = {};
        test.equal(true, ut._isObject(anObject));
        
        var aFunction = (function(){})();
        test.equal(false, ut._isObject(aFunction));
        
        var aString = '123';
        test.equal(false, ut._isObject(aString));
        
        var aNumber = 123;
        test.equal(false, ut._isObject(aNumber));
        
        var aNull = null;
        test.equal(false, ut._isObject(aNull));
        
        var anUndefined;
        test.equal(false, ut._isObject(anUndefined));
        
        test.done();
    },

    _hasTest: function (test) {
        var anObject = {
            aString: 'this is a string'
        };

        test.equal(true, ut._has(anObject, 'aString'));
        test.equal(false, ut._has(anObject, 'notExist'));
        
        test.done();
    },

};