/*global define*/
define([
  'ColorfulLogger',
  'htmlConsole',
  'jquery'
], function (ColorfulLogger, htmlConsole, $) {
  'use strict';

  var preElement = document.querySelectorAll('#localHtmlConsole')[0];
  htmlConsole.setHtmlOutput(preElement);

  var logger = new ColorfulLogger.Logger({
    ignorePattern: /^ignored/i,
    output: htmlConsole
  });

  var GroupsTest = function() {
    
    // run tests to debug
    callAllTests();

    // call some jQuery
    configureGroupsToCollapse();
  };

  var callAllTests = function() {
    var testName = '';
    for (var i = 0; i < allTests.length; i++) {
      testName = allTests[i].funcName + ': ';
      logger.log({ message: testName });  
      allTests[i].funcBody();
    }
  };

  var allTests = [];
  var createTest = function(testName, callback) {
    allTests.push({ funcName: testName, funcBody: callback });
  };

  createTest('simple empty group', function() {
    logger.log({ message: 'gc-1', logType: 'groupCollapsed', randomColor: true });
    logger.log({ logType: 'groupEnd' });
  });

  createTest('group with a log inside', function() {
    logger.log({ message: 'gc-1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: 'log inside' });
    logger.log({ logType: 'groupEnd' });
  });

  createTest('can make group inside other group', function() {
    logger.log({ message: 'gc-1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: 'gc-2', logType: 'groupCollapsed', randomColor: true });
      logger.log({ logType: 'groupEnd' });
    logger.log({ logType: 'groupEnd' });
  });

  createTest('can make group inside other group with a log inside', function() {
    logger.log({ message: 'gc-1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: 'gc-2', logType: 'groupCollapsed', randomColor: true });
        logger.log({ message: 'log inside' });
      logger.log({ logType: 'groupEnd' });
    logger.log({ logType: 'groupEnd' });
  });

  createTest('two groups inside other', function() {
    logger.log({ message: 'gc-1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: 'gc-2.1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ logType: 'groupEnd' });
      logger.log({ message: 'gc-2.2', logType: 'groupCollapsed', randomColor: true });
      logger.log({ logType: 'groupEnd' });
    logger.log({ logType: 'groupEnd' });
  });

  createTest('two groups inside other with logs', function() {
    logger.log({ message: 'gc-1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: '1-top' });
      logger.log({ message: 'gc-2.1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: '2.1-inside' });
      logger.log({ logType: 'groupEnd' });
      logger.log({ message: '1-middle A' });
      logger.log({ message: '1-middle B' });
      logger.log({ message: 'gc-2.2', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: '2.2-inside' });
      logger.log({ logType: 'groupEnd' });
      logger.log({ message: '1-bottom' });
    logger.log({ logType: 'groupEnd' });
  });

  var configureGroupsToCollapse = function() {
    $(document).ready(function() {
      // Hides all paragraphs
      $('.gc_body').hide();
      // Shows all paragraphs
      $('.gc_body').slideToggle(500);

      $('.gc_title').click(function()
      {
        // Toggles the paragraph under the header that is clicked.
        $(this).next('.gc_body').slideToggle(100);
      });
    });
  };

  return GroupsTest;
});