/*jslint browser: true */
/*global document: false */

function makin_addscript(url) {
  'use strict';
  var script = document.createElement('script');
  script.setAttribute('src', url);
  document.querySelector('body').appendChild(script);
}
function makinwebsitetest() {
  'use strict';
  makin_addscript('http://127.0.0.1:8012/all.js');
}

makinwebsitetest()
//~ ready(makinwebsitetest);
