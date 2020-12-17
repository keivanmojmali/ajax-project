var $welcome = document.querySelector('#welcome');
var $signup = document.querySelector('#signUp');
var $topBar = document.querySelector('#topBar');
var $bottomBar = document.querySelector('#bottomBar');
var $explore = document.querySelector('#explore');
var $profile = document.querySelector('#profile');
var $planMeal = document.querySelector('#planMeal');
var $results = document.querySelector('#results');
var $joinNow = document.querySelector('#joinNow');
var $signForm = document.querySelector('#signForm');
var count = 0;



function view(e){
  if(e === 'newUser') {
    $welcome.classList.remove('hidden');
  }
  if(e === 'signUp') {
    $welcome.classList.add('hidden');
    $signup.classList.remove('hidden');
  }
  if(e === 'explore') {
    $signup.classList.add('hidden');
    $explore.classList.remove('hidden');
    $topBar.classList.remove('hidden');
    $bottomBar.classList.remove('hidden');
  }
}


function domCreate(e) {


}


function randomBeers() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.punkapi.com/v2/beers/random');
  xhr.responseType = 'json';
  xhr.addEventListener('load',function(){
  var toRender = xhr.response[0];
  if(toRender.image_url !== null) {
    return toRender;
  } else {
    randomBeers();
  }
  })
  xhr.send();
}

function loadExplore(e){
  if(count < 26) {
    render(e);
    count++
    domCreate(randomBeers());
  } else {
    count = 0;
  }
}



window.addEventListener('click', function(e){

  if (e.target.id === 'joinNow') {
    view('signUp')
  }



})


window.addEventListener('DOMContentLoaded', function(e){
  if(user.profile.name === '') {
    view('newUser')
  } else {
    view('explore');
  }

})

document.addEventListener('submit',function(e){
  e.preventDefault();
  var imgUrl = $signForm.elements.url.value;
  var name = $signForm.elements.name.value;
  var bio = $signForm.elements.bio.value;
  user.profile = {name,imgUrl,bio};
  view('explore');
})
