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

// this function returns dom element to append
function domCreate(e) {
  var main = document.createElement('div');
  main.setAttribute('class','margin-top-bottom');
  var col = document.createElement('div');
  col.setAttribute('class','column-full flex center-content');
  main.appendChild(col);
  var image = document.createElement('img');
  image.setAttribute('src',e.image_url);
  image.setAttribute('alt',e.tagline);
  col.appendChild(image);
  var name = document.createElement('div');
  name.setAttribute('class','column-full flex center-content');
  main.appendChild(name);
  var nameText = document.createElement('h1');
  nameText.setAttribute('class','beer-name');
  nameText.textContent = e.name;
  name.appendChild(nameText);




}

// This function returns a random beer
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

// FIX THIS BELOW
// this function loads 25 beers with images into the explorer page
function loadExplore(e){
  if(count < 26) {

    count++
    // put return of domCreate(randomBeers()); to append onto explore page

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
