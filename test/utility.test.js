/** @license MIT License (c) Copyright (c) 2014 Julio Makdisse Saito */

/**
 * ColorfulLogger
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Julio Makdisse Saito (saitodisse@gmail.com)
 */

var buster = require('buster'),
        equals = buster.assert.equals,
        notEquals = buster.refute.equals,
        ColorfulLogger = require('../src/colorful-logger'),
        stringUtility = ColorfulLogger.stringUtility
;

buster.testCase('stringUtility:', {
    setUp: function () {
    },

    tearDown: function () {
    },

    'rpad': function () {
        equals('--------', stringUtility.rpad('', '-', 8));
        equals('123-----', stringUtility.rpad('123', '-', 8));
        equals('123     ', stringUtility.rpad('123', ' ', 8));
        equals('  123   ', stringUtility.rpad('  123', ' ', 8));
    },

    'truncate': function () {
        equals('', stringUtility.truncate('', 8));
        equals('1234', stringUtility.truncate('1234', 8));
        equals('12345678', stringUtility.truncate('12345678', 8));
        equals('123456..', stringUtility.truncate('123456789', 8));
    },
});