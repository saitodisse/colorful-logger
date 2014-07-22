/** @license MIT License (c) Copyright (c) 2014 Julio Makdisse Saito */

/**
 * ColorfulLogger
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Julio Makdisse Saito (saitodisse@gmail.com)
 */

var _ = require('lodash');
var fakePreElement = {};
fakePreElement.appendRecorder = [];

fakePreElement.append = function(text) {
	fakePreElement.appendRecorder.push(text);
};

module.exports = fakePreElement;