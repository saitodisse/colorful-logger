var meld = require('meld');
var trace = require('meld/aspect/trace');

var __LOG = function __LOG(message, thisObj, args, colorIndex){
  /* __LOG shows a console.debug with colors.
   *   creates a group and puts arguments and this
  
    usage:  
  __LOG('method()', this, arguments, 1);
  
  /**
   * @param  {[string]}     message      [message to show]
   * @param  {[object]}     thisObj      [this object, holds the context]
   * @param  {[arguments]}  args         [arguments]
   * @param  {[integer]}    colorIndex   [1,2,3,4,5,6]
   */
  var groupName
    , groupColor

    , rpad = function (str, padString, length) {
            while (str.length < length) {
                str = str + padString;
            }
            return str;
        }

    , truncate = function (str, length, truncateStr) {
            if (str === null) {
                return '';
            }
            str = String(str);
            truncateStr = truncateStr || '...';
            length = ~~length;
            return str.length > length ? str.slice(0, length) + truncateStr : str;
        }

    , _isObject = function(obj) {
            return obj === Object(obj);
    }

    , _has = function(obj, key) {
            return hasOwnProperty.call(obj, key);
    }

    , getName = function (options) {
            var nameParts
                , name = ''
                , method = ''
            ;

            if (options.name) {
                nameParts = options.name.split('.');
            }
            else {
                return '';
            }
            
            // get the first part
            name = nameParts.shift();
            name = truncate(name, (options.nameSize - 2), '..');

            if (nameParts.length > 0) {
                var fullMethodName = nameParts.join('.');
                fullMethodName = getDetailsByMethodName(fullMethodName);
                method = truncate(fullMethodName, (options.methodSize - 2), '..');

                var hasId = _isObject(thisObj) && _has(thisObj, 'id');
                if (hasId) {
                    name = name + '[' + thisObj.id + ']';
                }

                name   = rpad(name,   ' ', options.nameSize);
                method = rpad(method, ' ', options.methodSize);
            }
            else {
                throw new Error('getName :: cant find "." to split method');
            }

            return name + method;
        }

    , getDetailsByMethodName = function (name) {
        if(args && typeof args === 'object' &&args.length > 0){
          return rpad(name,   ' ', 20) + getArgs(args);
        }
        return name;
      }

    , getArgs = function(args) {
        var result = '';
        for (var i = 0; i < args.length; i++) {
          if(typeof args[i] === 'string'){
            result += ' ["' + args[i] + '"]';
          }
        }
        return result;
      }

    , colors = {
        10: {  backgroundColor: '#eee'
             , foregroundColor: '#600'
        },

        11: {  backgroundColor: '#eee'
             , foregroundColor: '#330'
        },

        12: {  backgroundColor: '#eee'
             , foregroundColor: '#033'
        },

        20: {  backgroundColor: '#ded'
            , foregroundColor: '#260'
        },

        21: {  backgroundColor: '#ded'
            , foregroundColor: '#243'
        },

        22: {  backgroundColor: '#ded'
            , foregroundColor: '#225'
        },

        3: {  backgroundColor: '#eee'
            , foregroundColor: '#21460F'
        },

        4: {  backgroundColor: '#eee'
            , foregroundColor: '#6700B9'
        },
        
        5: {  backgroundColor: '#eee'
            , foregroundColor: '#284'
        },
        
        6: {  backgroundColor: '#eee'
            , foregroundColor: '#7653C1'
        },
        
        99: {  backgroundColor: '#222'
            , foregroundColor: '#FBB'
        }
    }

    , logGroup = function ()
        {
            console.groupCollapsed(groupName, groupColor);
            console.dir(thisObj);
            console.dir(args);
            console.groupEnd();
        }
  ;

  var ignores = message.search(/\bgetWildcardCallbacks\b/) >= 0;
  if (ignores) {
      return;
  }

  groupName = '%c' + getName({
      name      : message,
      nameSize  : 40,
      methodSize: 100
  });

  groupColor =  ' background  : ' +
                colors[colorIndex].backgroundColor +
                ';color       : ' +
                colors[colorIndex].foregroundColor;

  logGroup();

  // show -------pause----------
  clearTimeout(__LOG.globalTimeoutLogId);
  __LOG.globalTimeoutLogId = setTimeout(function () {
      // if is not canceled, shows line bellow
      console.debug('----------------------------------pause--------------------------');
  }, 100);
};


var __MELD_LOG = function(appName, app, colorIndex){
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

module.export = __MELD_LOG;