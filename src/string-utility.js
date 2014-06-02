module.exports.rpad = function (str, padString, length) {
    while (str.length < length) {
        str = str + padString;
    }
    return str;
};

module.exports.truncate = function (str, length, truncateStr) {
    if (str === null) {
        return '';
    }
    str = String(str);
    truncateStr = truncateStr || '..';
    length = ~~length;
    return str.length > length ? str.slice(0, length-2) + truncateStr : str;
};