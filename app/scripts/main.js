(function() {
  'use strict';

  marked.Renderer.prototype.paragraph = function(text) {
    return text;
  };

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  /**
   * Return true if this message has own markdown tag.
   * 
   * @param {String} Chat message.
   */
  var hasMarkdownTag = function(str) {
    return (/\[m\]([\s\S]*)\[\/m\]/g).test(str);
  };

  /**
   * Revert <a> tag link to URL string.
   * 
   * @param {String} Chat message.
   * @return {String} Chat message that has been converted.
   */
  var revertHtmlLink= function(str) {
    var newStr = str.replace(/\[m\]([\s\S]*)<a href="([\s\S]*)" title="[\s\S]*" target="_blank"[\s\S]*>[\s\S]*<\/a>([\s\S]*)*\[\/m\]/g, '[m]$1$2$3[/m]');
    if (newStr !== str) {
      return revertHtmlLink(newStr);
    }

    return str;
  }

  /**
   * Revert emoticon tags to original string.
   * 
   * @param {String} Chat message.
   * @return {String} Chat message that has been converted.
   */
  var revertEmoticon = function(str) {
    var newStr = str.replace(/<[\s\S]*alt="(.*)"[\s\S]*class="ui_emoticon"[\s\S]*>/g, '$1');

    if (newStr !== str) {
      return revertEmoticon(newStr);
    }
    return str;
  };

  /**
   * Remove all html tags.
   * 
   * @param {String} Chat message.
   * @return {String} Chat message that has been converted.
   */
  var removeHtmlTag = (function() {
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
  var parseMarkdownTag = function(str) {
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
  var convertMessage = function(str) {
      str = revertHtmlLink(str);
      str = revertEmoticon(str);
      str = removeHtmlTag(str);
      return parseMarkdownTag(str);
  }

  /**
   * This function is called when chat timeline renderred.
   * 
   * @param {String} Timeline html.
   * @return {String} Timeline html that has been converted.
   */
  var onRenderTimeLine = function(timeline) {
    return $('<div></div>').html(timeline).find('.chatTimeLineMessage').each(function(i, e) {
      var $el = $(e).find('pre');
      if (!$el.length) {
        return;
      }

      var m = $el.html();

      if (!hasMarkdownTag(m)) {
        return;
      }

      m = convertMessage(m);
      $el.html(m);
    });
  };

  var renderTimeLine = TimeLineView.prototype.renderTimeLine;
  TimeLineView.prototype.renderTimeLine = function (a, b) {
    b = onRenderTimeLine(b);
    renderTimeLine.apply(TimeLineView, [a, b]);
  };
})();
