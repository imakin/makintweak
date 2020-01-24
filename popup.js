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
          chrome.browserAction.setBadgeText({"text":target.value})
        });
      }, 500);
    }
    
    target.addEventListener('input', update_name_soon);
})();
