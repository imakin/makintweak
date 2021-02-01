var makin_makintweak_activated = false;

//kirim ke contentscript.js
//pesantext = string
//will be formed into object {message: pesantext} because why not
function kirim(pesantext) {

  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, {message: pesantext});
    });
  });
}

(()=>{
  var target = document.getElementById('peoplename');

  chrome.storage.sync.get('people-name', function(result) {
    var people = result['people-name'];
    if (people!=undefined) {
      target.value = people;
      chrome.browserAction.setBadgeText({"text":people})
    }
  });

  update_name_timer = null;
  function update_name_soon() {
    clearTimeout(update_name_timer);
    target.style.borderColor = "red";
    update_name_timer = setTimeout( ()=>{
      chrome.storage.sync.set({'people-name':target.value}, ()=>{
        target.style.borderColor = "green";
        chrome.browserAction.setBadgeText({"text":target.value});
      });
    }, 500);
  }

  target.addEventListener('input', update_name_soon);
  
  
  var youtubeads = document.getElementById('youtubeads');
  youtubeads.addEventListener('change',function(){
    if (this.checked) {
      kirim("youtube on");
      console.log("kirim youtube on");
      chrome.storage.sync.set({'youtube':true}, ()=>{
        
      });
    }
    else {
      kirim("youtube off");
      console.log("kirim youtube on");
      chrome.storage.sync.set({'youtube':false}, ()=>{
        
      });
    }
  });
  //check storage 
  
  chrome.storage.sync.get('youtube', (v)=>{
    if (v['youtube']) {
      youtubeads.checked = true;
    }
  });
  
  var playbackmin = document.getElementById('playbackmin');
  var playbackspeed_current = 1;
  var playbackspeed_display = document.getElementById('playbackcurrent');
  function playbackspeed_show(){
    playbackspeed_display.innerHTML = playbackspeed_current;
  }
  playbackmin.addEventListener('click', function(){
    if (playbackspeed_current>0.5) {      
      kirim('playbackadd-0.5');
      playbackspeed_current -= 0.5;
      playbackspeed_show();
    }
  });
  document.getElementById('playbackplus').
  addEventListener('click', function(){
    kirim('playbackadd+0.5');
    playbackspeed_current += 0.5;
    playbackspeed_show();
  });
  document.getElementById('playbackreset').
  addEventListener('click', function(){
    kirim('playbackset1');
    playbackspeed_current = 1;
    playbackspeed_show();
  });
  document.getElementById('hideimages').addEventListener('click',function(){
    kirim('hideimages');
  });
})();

