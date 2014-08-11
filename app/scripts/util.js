(function(root) {
  'use strict';

  var util = {};

  /**
   * Return true if this message has own markdown tag.
   * 
   * @param {String} Chat message.
   */
  util.hasMarkdownTag = function(str) {
    return (/\[m\]([\s\S]*)\[\/m\]/g).test(str);
  };

  /**
   * Revert <a> tag link to URL string.
   * 
   * @param {String} Chat message.
   * @return {String} Chat message that has been converted.
   */
  util.revertHtmlLink= function(str) {
    var newStr = str.replace(/\[m\]([\s\S]*)<a href="([\s\S]*)" title="[\s\S]*" target="_blank"[\s\S]*>[\s\S]*<\/a>([\s\S]*)*\[\/m\]/g, '[m]$1$2$3[/m]');
    if (newStr !== str) {
      return this.revertHtmlLink(newStr);
    }

    return str;
  }

  /**
   * Revert emoticon tags to original string.
   * 
   * @param {String} Chat message.
   * @return {String} Chat message that has been converted.
   */
  util.revertEmoticon = function(str) {
    var newStr = str.replace(/\[m\]([\s\S]*)<[\s\S]*alt="(.*)"[\s\S]*class="ui_emoticon"[\s\S]*>([\s\S]*)*\[\/m\]/g, '[m]$1$2$3[/m]');

    if (newStr !== str) {
      return this.revertEmoticon(newStr);
    }
    return str;
  };

  /**
   * Remove all html tags.
   * 
   * @param {String} Chat message.
   * @return {String} Chat message that has been converted.
   */
  util.removeHtmlTag = (function() {
    var $div = $('<div></div>');
    return function(str) {
      return $div.empty().html(str).text();
    };
  })();

  /**
   * Convert own markdown tag to html.
   * 
   * @param {String} Chat message.
   * @return {String} Chat message that has been converted.
   */
  util.parseMarkdownTag = function(str) {
    var $div = $('<div></div>');
    return str.replace(/\[m\]([\s\S]*)\[\/m\]/g, function(str, p) {
      var $pre = $('<pre></pre>').append(marked(p));
      $pre.addClass('markdown');
      return $div.empty().append($pre).html()
    });
  };

  /**
   * Convert message to markdown.
   * 
   * @param {Object} Chat message.
   * @return {String} Chat message that has been converted.
   */
  util.convertMessage = function(str) {
      str = util.revertHtmlLink(str);
      str = util.revertEmoticon(str);
      str = util.removeHtmlTag(str);
      return util.parseMarkdownTag(str);
  }

  /**
   * This function is called when chat timeline renderred.
   * 
   * @param {String} Timeline html.
   * @return {String} Timeline html that has been converted.
   */
  util.onRenderTimeLine = function(timeline) {
    var $timeline = $('<div></div>').html(timeline);
    var $messages = $timeline.find('.chatTimeLineMessage');
    if (!$messages.length) {
      return;
    }

    $messages.find('pre').each(function() {
      var $this = $(this);
      var m = $this.html();

      if (!util.hasMarkdownTag(m)) {
        return;
      }

      $this.html(util.convertMessage(m));
    });

    return $timeline.html();
  };

  root.util = util;
})(this);
