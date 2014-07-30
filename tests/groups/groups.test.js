/*global define*/
define([
  'ColorfulLogger',
  'htmlConsole',
  'jquery'
], function (ColorfulLogger, htmlConsole, $) {
  'use strict';

  var preElement = document.querySelectorAll("#localHtmlConsole")[0];
  htmlConsole.setHtmlOutput(preElement);

  var logger = new ColorfulLogger.Logger({
    ignorePattern: /^ignored/i,
    output: htmlConsole
  });

  var GroupsTest = function() {
    
    // run tests to debug
    can_make_group_insede_other_group();


    // call some jQuery
    configureGroupsToCollapse();
    
  };

  var can_make_group_insede_other_group = function() {
    logger.log({ message: 'gc-1', logType: 'groupCollapsed', randomColor: true });
      logger.log({ message: 'gc-2', logType: 'groupCollapsed', randomColor: true });
      logger.log({ logType: 'groupEnd' });
    logger.log({ logType: 'groupEnd' });
  };

  var configureGroupsToCollapse = function() {
    $(document).ready(function() {
      // Hides all paragraphs
      $(".gc_body").hide();
      // Optional for showing the first paragraph. For animation use .slideDown(200) instead of .show()
      $(".gc_title").click(function()
      {
        // Toggles the paragraph under the header that is clicked. .slideToggle(200) can be changed to .slideDown(200) to make sure one paragraph is shown at all times.
        $(this).next(".gc_body").slideToggle(100);
        // Makes other pararaphes that is not under the current clicked heading dissapear
        //$(this).siblings().next(".gc_body").slideUp(200);
      });
    });
  };

  return GroupsTest;
});