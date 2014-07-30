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
  // firstGroupCollapsed[]
  // ------------
  // store groupCollapsed content
  // when groupEnd is called output each group
  //  -----------------------
  //  group: {
  //    title: '',
  //    body:  ''
  //  }
  //  -----------------------
  htmlConsole.firstGroupCollapsed = undefined;
  htmlConsole.currentGroup = undefined;
  htmlConsole.createGroupCollapsed = function(title) {
    var groupCollapsed = {
      title: title,
      body: '',
      finalInnerHTML: '<div class="gc"><div class="gc_title">' + title + '</div><div class="gc_body">',
      childGroups: [],
      parent: undefined
    };

    if(_.isUndefined(htmlConsole.firstGroupCollapsed)){
      // ------------------
      // first group
      // ------------------
      htmlConsole.firstGroupCollapsed = groupCollapsed;
      htmlConsole.currentGroup        = groupCollapsed;
    }
    else{
      // ------------------
      // group inside other
      // ------------------

      // set parent as the current
      groupCollapsed.parent = htmlConsole.currentGroup;

      // add a child to current
      htmlConsole.currentGroup.childGroups.push(groupCollapsed);

      // current group is this group, now
      htmlConsole.currentGroup = groupCollapsed;
    }

    return groupCollapsed;
  };


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






  // ------------
  // create span with embeded CSS style
  // ------------
  htmlConsole.createColoredSpan = function(args) {
    var parts = args[0].split('%c'),
        i,
        afterSymbol,
        cssStyle,
        finalString = ''
    ;

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
      }
      return(finalString);
    }
    else{
      return(args[0]);
    }
  };






  // ------------
  // console methods
  // ------------
  htmlConsole.log = function() {
    var args = slice.call(arguments),
        outputElement = this.getHtmlOutput()
    ;

    // send to build-in browser console
    this.getLocalConsole().log.apply(this.getLocalConsole(), args);

    // send to html output
    if(_.isString(args[0])){
      
      if(!htmlConsole.firstGroupCollapsed){
        // no group
        outputElement.innerHTML += htmlConsole.createColoredSpan(args) + '\n';
      }
      else{
        // send to groupItem.body string
        htmlConsole.currentGroup.body += htmlConsole.createColoredSpan(args);
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
    var args = slice.call(arguments),
        title = htmlConsole.createColoredSpan(args);

    // send to build-in browser console
    this.getLocalConsole().groupCollapsed.apply(this.getLocalConsole(), args);

    if ( _.isString(args[0] ) ){
      htmlConsole.createGroupCollapsed( title );
    }

  };

  htmlConsole.groupEnd = function() {
    var outputElement = this.getHtmlOutput(),
        currentGroup = htmlConsole.currentGroup,
        finalInnerHTML = currentGroup.finalInnerHTML
    ;

    // send to build-in browser console
    this.getLocalConsole().groupEnd.apply(this.getLocalConsole());

    // body
    finalInnerHTML += currentGroup.body;
    
    // check children/ parent, i dont know!!! :P
    // var hasParent = (!_.isUndefined(htmlConsole.parent));
    // if (hasChilds) {
    // }

    finalInnerHTML += '</div></div>';
    
    // rendered HTML
    currentGroup.finalInnerHTML = finalInnerHTML;
    // rendered HTML to parent
    if(currentGroup.parent){
      currentGroup.parent.body += currentGroup.finalInnerHTML;
    }

    var isTheLastGroupToClose = (htmlConsole.firstGroupCollapsed === currentGroup);
    if(isTheLastGroupToClose){
      // send to output
      outputElement.innerHTML += finalInnerHTML + '\n';

      // reset
      htmlConsole.firstGroupCollapsed = undefined;
      currentGroup = undefined;
    }
    else{
      currentGroup = currentGroup.parent;
    }

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