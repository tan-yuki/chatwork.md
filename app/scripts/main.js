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


  var renderTimeLine = TimeLineView.prototype.renderTimeLine;
  TimeLineView.prototype.renderTimeLine = function (a, b) {
    var b = $('<div></div>').html(b).find('div[id^="_messageId"]').each(function(i, e) {
      var $el = $(e).find('pre');
      if (!$el.length) {
        return;
      }

      var html = $el.html();
      var newHtml = html
        .replace(/\[m\]([\s\S]*)\[\/m\]/g, function(str, p) {
          return marked(p);
        });

      if (newHtml !== html) {
        $el.html(newHtml);
      }
    });
    renderTimeLine.apply(TimeLineView, [a, b]);
  };
})();
