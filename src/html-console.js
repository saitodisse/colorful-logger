(function(root, factory) {
'use strict';

  // AMD
  if (typeof define === 'function' && define.amd) {
    define(['lodash', 'exports'], function (_, exports) {
      factory(root, exports, _);
    });

  // Node.js
  }
  else if (typeof exports !== 'undefined') {
    var _ = require('lodash');
    factory(root, exports, _);
  }
  // Browser globals
  else {
    root.htmlConsole = factory(root, (root.htmlConsole = {}), root._);
  }

}(this, function(root, htmlConsole, _) {

  var slice = Array.prototype.slice;

  // ------------
  // Html Output: expecting a jQuery object with <pre> element
  // ------------
  htmlConsole.setHtmlOutput = function(htmlOutput) {
    this.htmlOutput = htmlOutput;
  };

  htmlConsole.getHtmlOutput = function() {
    return this.htmlOutput;
  };


  // ------------
  // Local Console, console.log by default
  // ------------
  htmlConsole.setLocalConsole = function(localConsole) {
    this.localConsole = localConsole;
  };

  htmlConsole.getLocalConsole = function() {
    return this.localConsole || console;
  };



  // // ------------
  // // from: http://stackoverflow.com/questions/7125453/modifying-css-class-property-values-on-the-fly-with-javascript-jquery/19613731#19613731
  // // ------------
  // htmlConsole.setStyle = function(cssText) {
  //   var sheet = browserDocument.createElement('style'),
  //       head = (browserDocument.head || browserDocument.getElementsByTagName('head')[0]),
  //       isIE = false
  //   ;

  //   sheet.type = 'text/css';
  //   /* Optional */ browserWindow.customSheet = sheet;
  //   head.appendChild(sheet);
    
  //   try{
  //     sheet
  //       .cloneNode(false)
  //       .appendChild(browserDocument.createTextNode(''));
  //   }
  //   catch(err){
  //     isIE = true;
  //   }
  //   var wrapper = isIE ? browserDocument.createElement('div') : sheet;
    
  //   return (function(cssText, node) {
  //     if(!node || node.parentNode !== wrapper){
  //       node = wrapper.appendChild(browserDocument.createTextNode(cssText));
  //     }
  //     else{
  //       node.nodeValue = cssText;
  //     }
    
  //     if (isIE){
  //       sheet.styleSheet.cssText = wrapper.innerHTML;
  //     }
    
  //     return node;
    
  //   })(cssText);
  // };


  // ------------
  // console methods
  // ------------
  htmlConsole.log = function() {
    var args = slice.call(arguments),
        parts,
        i,
        afterSymbol,
        cssStyle,
        finalString = ''
    ;

    // send to build-in browser console
    this.getLocalConsole().log.apply(this.getLocalConsole(), args);

    // //send to html output
    if(_.isString(args[0])){
      parts = args[0].split('%c');
      if(parts.length > 1){
        for (i = 0; i < parts.length; i++) {
          //  Some %cText ==> the 'Text' part
          afterSymbol = parts[i+1];

          //  console.log('Some %cText', 'color:blue') ==> the 'color:blue' configuration
          cssStyle = args[i+1];

          if(!_.isUndefined(afterSymbol)){
            finalString += '<span style="'+ cssStyle +'">';
            finalString += afterSymbol;
            finalString += '</span>';
          }
        };
        finalString += '\n';
        this.getHtmlOutput().append(finalString);
      }
      else{
        this.getHtmlOutput().append(args[0] + '\n');
      }

    }
  };


  htmlConsole.info = function() {

  };


  htmlConsole.warn = function() {

  };


  htmlConsole.error = function() {

  };


  htmlConsole.trace = function() {

  };


  htmlConsole.dir = function() {

  };


  htmlConsole.group = function() {

  };


  htmlConsole.groupCollapsed = function() {
    var args = slice.call(arguments);
    this.getLocalConsole().groupCollapsed.apply(this.getLocalConsole(), args);

    //send to html output
    var no_CSS_message;
    if(typeof args[0] !== 'undefined'){
      no_CSS_message = args[0].toString().replace(/\%c/gi, '');
    }
    this.getHtmlOutput().append('<div class="colapse">' + no_CSS_message + '</div>');
  };


  htmlConsole.groupEnd = function() {
    var args = slice.call(arguments);
    this.getLocalConsole().groupEnd.apply(this.getLocalConsole(), args);
  };


  htmlConsole.time = function() {

  };


  htmlConsole.timeEnd = function() {

  };


  htmlConsole.profile = function() {

  };


  htmlConsole.profileEnd = function() {

  };


  htmlConsole.dirxml = function() {

  };


  htmlConsole.assert = function() {

  };


  htmlConsole.count = function() {

  };


  htmlConsole.markTimeline = function() {

  };


  htmlConsole.timeStamp = function() {

  };


  htmlConsole.clear = function() {

  };

  return htmlConsole;

}));
