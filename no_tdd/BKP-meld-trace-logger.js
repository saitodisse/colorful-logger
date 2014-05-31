var meld = require('meld');
var trace = require('meld/aspect/trace');
var __LOG = require('./colorful-logger');


module.exports = function(appName, app, colorIndex){
  /* log all executed functions from an instance
  
    usage:  
    __MELD_LOG('MyApp.MyFunction', myFunction, 2);
  
  /**
   * @param  {[string]}     appName      [Namespace.Function]
   * @param  {[object]}     app          [intance of Namespace.Function]
   * @param  {[integer]}    colorIndex   [1,2,3,4,5,6]
   */
  var pointcut = /./;
  var myReporter = {
    counter: 0,
    lpad: function (str, padString, length) {
      str = String(str);
      while(str.length < length){
        str = padString + str;
      }
      return str;
    },
    getCounter: function ()
    {
      return this.lpad(++this.counter,'0',4);
    },
    onCall: function (info) {
      info.target.__getCounter__ = this.getCounter();
      var fName = '( ' + info.target.__getCounter__ + ' ) -> ' + appName + '.' + info.method;
      __LOG(fName, info.target, info.args, colorIndex);
    },
    // onReturn: function (info) {
    //   var fName = '( ' + info.target.__getCounter__ + ' ) <- ' + appName + '.' + info.method;
    //   __LOG(fName, info.target, info.result, colorIndex);
    // },
    // onThrow: function(info) {
    //   var fName = '( ' + info.target.__getCounter__ + ' ) <- ' + appName + '.' + info.method;
    //   __LOG(fName, info.exception, undefined, 99);
    // }
  };
  // Around advice wraps the intercepted method in layers
  meld(app, pointcut, trace(myReporter));
};