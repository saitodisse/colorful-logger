var utility = require('./utility');

module.exports = function colorfulLogger(message, thisObj, args, colorIndex){
  /* colorfulLogger shows a console.debug with colors.
   *   creates a group and puts arguments and this
  
    usage:  
  colorfulLogger('method()', this, arguments, 1);
  
  /**
   * @param  {[string]}     message      [message to show]
   * @param  {[object]}     thisObj      [this object, holds the context]
   * @param  {[arguments]}  args         [arguments]
   * @param  {[integer]}    colorIndex   [1,2,3,4,5,6]
   */
  var groupName
    , groupColor

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
        name = utility.truncate(name, (options.nameSize - 2), '..');

        if (nameParts.length > 0) {
            var fullMethodName = nameParts.join('.');
            fullMethodName = getDetailsByMethodName(fullMethodName);
            method = utility.truncate(fullMethodName, (options.methodSize - 2), '..');

            var hasId = utility._isObject(thisObj) && utility._has(thisObj, 'id');
            if (hasId) {
                name = name + '[' + thisObj.id + ']';
            }

            name   = utility.rpad(name,   ' ', options.nameSize);
            method = utility.rpad(method, ' ', options.methodSize);
        }
        else {
            throw new Error('getName :: cant find "." to split method');
        }

        return name + method;
    }

    , getDetailsByMethodName = function (name) {
        if(args && typeof args === 'object' && args.length > 0){
          return utility.rpad(name,   ' ', 20) + getArgs(args);
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

    , logGroup = function (){
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
  clearTimeout(colorfulLogger.globalTimeoutLogId);
  colorfulLogger.globalTimeoutLogId = setTimeout(function () {
      // if is not canceled, shows line bellow
      console.debug('----------------------------------pause--------------------------');
  }, 100);
};