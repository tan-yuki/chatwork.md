(function() {
  'use strict';

  var loadJs = function(path) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', chrome.extension.getURL(path));
    return document.documentElement.appendChild(scriptElement);
  }

  loadJs('scripts/loadee.js');
})();
