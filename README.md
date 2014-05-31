#meld-trace-logger 
###[beta 0.0.1]
meld + trace + colorfull console.log

##AMD (require.js)
###install with bower
```
bower install git@github.com:saitodisse/meld-trace-logger.git --save
```

###configure
```javascript
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		ColorfullLogger: {
			deps: ['lodash']
		}
	},
	paths: {
		lodash: '../bower_components/lodash/dist/lodash',
		ColorfullLogger: '../bower_components/meld-trace-logger/src/colorfull-logger'
	}
});
```

###call
```javascript
define([
	'ColorfullLogger'
], function (ColorfullLogger) {
	var logger = new ColorfullLogger.create();

	// a simple usage, not fun
	logger.log('Welcome to Meld Trace Logger');

	// here it is a green colored message
	logger.log({
		message: 'this message must be green',
		color: '#0A0'
	});
});
```

##tests
###pre-requirements
```
sudo npm i jshint nodeunit supervisor grunt-cli -g
```

###test + jshint
```
grunt
```

###watch for changes: test + jshint
```
grunt test
```

###nodeunit + node-debug
from: http://stackoverflow.com/questions/16652358/how-to-debug-nodeunit-using-node-inspector
```
npm -g install supervisor node-inspector

# console 1: supervisor restarts node-inspector when it quits, ignores file changes
supervisor -i . -x node-inspector .

# console 2
supervisor --debug-brk -- `which nodeunit` tests/
```


