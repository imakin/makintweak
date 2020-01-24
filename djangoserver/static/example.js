//this script loaded after document ready
//from all.js:
//  #makin-testscript-menubox
//  log()
//  createMenu()
//  makin_addscript(url)
//  makin_addstyle(url)

//example creating menu

var menu_box = document.getElementById('makin-testscript-menubox');

menu_box.appendChild(createMenu(function say_hello(ev){
  alert('halo');
}), 'my-menu-button-class');

//you can display log (visible on frontend above menu_box)
menu_box.appendChild(createMenu(function fill_form_for_me(ev){
  log('login form test!', true);//log can be grouped, 2nd argument to indicate a new log-group
  document.querySelector('input[name=user]').value = 'myusername';
  log('filling username');
  document.querySelector('input[name=password]').value = 'mysecretpass';
  log('typing pass####');
  document.querySelector('button[name=submit]').click();
  log('submitting login form!');
}), 'my-menu-button-class');


//creating test script when aiming performance, using your javascript skills

//simple no url-change testscript
menu_box.appendChild(createMenu(async function test_add_to_cart(ev){
  document.querySelector('#a').click();
  await sleep(1000);//wait 1 second before doing next statement
  document.querySelector('#b').click();
  await sleep(1000);
  assert
}));

//multiple page scripting

var step_key = 'posisisekarang'
function step(new_step) {
  if (new_step) {
    localStorage.setItem(step_key, new_step);
  }
  else {
    var current_step = localStorage.getItem(step_key);
    return current_step?current_step:1;
  }
}
// ugh  the localStorage is not cross page but at least works at the same domain
