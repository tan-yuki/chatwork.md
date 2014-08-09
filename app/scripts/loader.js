(function() {
  'use strict';

  var loadJs = function(path) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', chrome.extension.getURL(path));
    return document.documentElement.appendChild(scriptElement);
  }

  // Pathes of js libraries
  var libraries = [
    'bower_components/marked/lib/marked.js',
    'bower_components/underscore/underscore.js'
  ];

  // Entry point js file path
  var entryPoint = 'scripts/main.js'

  // Load libraries.
  var promises = []
  libraries.forEach(function(js){
    promises.push(loadJs(js));
  });

  // Then, load entry point javascript
  Promise.all(promises).then(function() {
    loadJs(entryPoint);
  });

})();
