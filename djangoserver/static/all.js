
var body = document.querySelector('body');
var head = document.querySelector('head');
var url_origin = 'http://127.0.0.1:8012'

//my object custom by Makin 2020
Node.prototype.appendChildSr = function(el) {
  this.appendChild(el);
  return el;
}


function makin_addscript(url) {
  'use strict';
  var script = document.createElement('script');
  script.setAttribute('src', url);
  document.querySelector('head').appendChild(script);
}
function makin_addstyle(url) {
  var styling = document.createElement('link');
  styling.setAttribute('rel','stylesheet');
  styling.setAttribute('href',url);
  head.appendChild(styling);
}

makin_addstyle(url_origin+'/all.css');


var sleep = function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var ready = function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var log = function log(text, line_class) {
  var log_box = document.getElementById('makin-testscript-logbox');
  var new_line = document.createElement('li');
  var date = new Date();
  new_line.innerHTML = '<span class="time">'+date.toISOString()+'</span> '+text;
  if (line_class) {
    new_line.classList.add(line_class);
  }
  log_box.appendChild(new_line);

  // save to storage
  window.localStorage.setItem('makin-testscript-log', log_box.innerHTML);
  // scroll to bottom
  log_box.scrollTop = 9999999999999999;
};

var downloadString = function downloadString(filename, data) {
    var blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}


// remove old log item, stop when found title
var log_remove_group = function remove_old_log() {
  var num = 0;
  while (true) {
    var node = document.querySelector('#makin-testscript-logbox li');
    if (node===null || node.classList.contains('title')) {
      if (node){
        node.remove();
      }
      num += 1;
      log(num+' old logs removed');
      return;
    }
    else {
      num += 1;
      node.remove();
    }
  }
}
var log_download = function download_log() {
  downloadString('makin_log.txt', document.getElementById('makin-testscript-logbox').innerText);
}

function createMenu(cb, classname) {
  var bt = document.createElement('button');
  if (classname) {
    bt.setAttribute('class', classname);
  }
  bt.id = cb.name;
  bt.innerHTML = cb.name;
  bt.setAttribute('type', 'button');
  bt.addEventListener('click', cb);
  return bt;
}
ready(function(){
  var host = document.location.host;
  if (host == 'yourwebsite.com') {
    makin_addscript(url_origin+'/yourwebsite_script.js');
  }

  // draw menu box
  var menu_box = document.createElement('div');
  body.appendChild(menu_box);
  menu_box.id = 'makin-testscript-menubox';
  menu_box.style = '';

  // draw log box
  var log_box = document.createElement('ol');
  log_box.id = 'makin-testscript-logbox';
  menu_box.appendChild(log_box);
  // load last log_box
  var old_log = window.localStorage.getItem('makin-testscript-log');
  log_box.innerHTML = old_log;

  menu_box.appendChild(createMenu(function log_box_toggle(){
    document.getElementById('makin-testscript-menubox').classList.toggle('log-shown');
  },'all'))
  menu_box.appendChild(createMenu(function log_time_toggle(){
    document.getElementById('makin-testscript-logbox').classList.toggle('time-shown');
  },'all'))

  menu_box.appendChild(createMenu(log_remove_group, 'all'));
  menu_box.appendChild(createMenu(log_download, 'all'));
});
