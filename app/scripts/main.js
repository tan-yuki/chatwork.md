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
      var $el = $(this);
      $el = $(e).find('.chatTimeLineMessageArea pre');
      if ($el.length) {
        var html = $el.html();
        html = html.replace(/(<\/?[^>]+>)|([^<]+)/g, function(str, p1, p2) {
          if (p1) {
            return str;
          }

          if (p2) {
            return marked(p2);
          }
        });
        $el.html(html);
      }
    });
    renderTimeLine.apply(TimeLineView, [a, b]);
  };
})();
