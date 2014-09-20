var find = require('lodash.find');
var isarray = require('lodash.isarray');
var isboolean = require('lodash.isboolean');
var isempty = require('lodash.isempty');
var isnumber = require('lodash.isnumber');
var isobject = require('lodash.isobject');
var isstring = require('lodash.isstring');
var isundefined = require('lodash.isundefined');
var random = require('lodash.random');
var merge = require('lodash.merge');
var partialright = require('lodash.partialright');
var assign = require('lodash.assign');

module.exports = {
	find : find,
	isArray: isarray,
	partialRight: partialright,
	assign: assign,
	isBoolean: isboolean,
	isEmpty: isempty,
	isNumber: isnumber,
	isObject: isobject,
	isString: isstring,
	isUndefined: isundefined,
	random: random,
	merge: merge,
};