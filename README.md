meld-trace-logger
=================

meld + trace + colorfull console.log


##pre-requirements
```
sudo npm i jshint nodeunit supervisor -g
```

##nodeunit
```
nodeunit tests/
```

##nodeunit + node-debug
from: http://stackoverflow.com/questions/16652358/how-to-debug-nodeunit-using-node-inspector
```
npm -g install supervisor node-inspector

# console 1: supervisor restarts node-inspector when it quits, ignores file changes
supervisor -i . -x node-inspector .

# console 2
supervisor --debug-brk -- `which nodeunit` tests/
```


