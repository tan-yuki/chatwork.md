(function() {
  'use strict';
  var targets = [
    'bower_components/marked/lib/marked.js',
    'scripts/main.js'
  ];

  targets.forEach(function(js){
  var scriptElement = document.createElement('script');
  scriptElement.setAttribute('src', chrome.extension.getURL(js));
    document.documentElement.appendChild(scriptElement);
  });
})();
