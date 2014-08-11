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
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  var renderTimeLine = TimeLineView.prototype.renderTimeLine;
  TimeLineView.prototype.renderTimeLine = function (a, b) {
    b = util.onRenderTimeLine(b);
    renderTimeLine.apply(TimeLineView, [a, b]);
  };
})();
