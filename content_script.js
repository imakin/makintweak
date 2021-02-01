/*jslint browser: true */
/*global document: false */
check_iklan_interval = 0;
function makin_addscript(url) {
  'use strict';
  var script = document.createElement('script');
  script.setAttribute('src', url);
  document.querySelector('body').appendChild(script);
}
function makin_start_makintweak() {
  'use strict';
  makin_addscript('https://localhost:8012/all.js');
}

//dapet message disini
chrome.runtime.onMessage.addListener(
 function(request, sender) {
   var msg = request.message;
   console.log("dapat pesan dari popup.js: "+msg);
   if (msg=="youtube off") {
     clearInterval(check_iklan_interval);
   }
   else if (msg=="youtube on") {
     clearInterval(check_iklan_interval);
     check_iklan_interval = setInterval(check_iklan_step, 2000);
   }
   else if (msg=="playbackadd+0.5") {
     playbackadd(0.5);
   }
   else if (msg=="playbackadd-0.5") {
     playbackadd(-0.5);
   }
   else if (msg=="playbackset1") {
     playbackset(1);
   }
   else if (msg=="hideimages") {
     document.querySelectorAll('img').forEach((it)=>{it.style.visibility="hidden";})
   }
});

makin_start_makintweak()
//~ ready(makin_start_makintweak);


var makin_ready = function makin_ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
var ytd_player = null;
var ytp_ad_module = null;
function check_iklan_step(){
  if (ytd_player===null) {
    ytd_player = document.getElementById('ytd-player');//optimizations!!
  }
  if (ytd_player===null) {
    return;//try later
  }
  if (ytp_ad_module===null) {
    ytp_ad_module = ytd_player.querySelector('.ytp-ad-module');
  }
  if (ytp_ad_module===null) {
    return;//try later;
  }
  var el = ytp_ad_module.querySelector('.ytp-ad-skip-button-slot, .ytp-ad-overlay-close-button');
  if (el!==null) {
      el.click();
      //~ console.log(el);
      //~ console.log(el.parentNode);
      //~ console.log(el.parentNode.parentNode);
      //~ console.log(el.parentNode.parentNode.parentNode);
      //~ console.log(el.parentNode.parentNode.parentNode.parentNode);
      //~ console.log(el.parentNode.parentNode.parentNode.parentNode.parentNode);
      console.log('clicking skip button. type:'+el.className+' bold');
  }
  else {
    el = ytp_ad_module.querySelector('.ytp-ad-preview-text');
    if (el!==null) {
      //~ console.log(el);
      console.log('unskippable ads, fast forward!!')
      document.querySelector('.html5-main-video').playbackRate = 8;
    }
  }
}
function makintweak_onready_cb(){
  //special yutub
  chrome.storage.sync.get('youtube',function(result){
    var active = result['youtube'];
    if (active) {
      check_iklan_interval = setInterval(check_iklan_step, 2000);
    }
  })
  console.log('youtube check_iklan active normal');
  //end yutub
  
  console.log('makin tweak!')
  
  
  // aduh page 'index of' ora trigger extension ini!
  /*
  if (document.getElementById('header').innerText.startsWith('Index of /')) {
    // opening file in harddrive
    // if there is only 1 file and it is index.html, open it
    const trs = document.querySelectorAll('body > table > tbody > tr');
    if (trs.length==1) {
      if (trs[0].innerText.startsWith('index.html')) {
        console.log('auto open index.html')
        setTimeout(
          function() {
            trs[0].querySelector('td a').click()
          }, 2000
        );
      }
    }
  }
  */
}


makin_ready(makintweak_onready_cb);


function playbackadd(x) {
  document.querySelectorAll('video').forEach(function(it){
    it.playbackRate += x
  })
}
function playbackset(x) {
  document.querySelectorAll('video').forEach(function(it){
    it.playbackRate = x
  })
}
