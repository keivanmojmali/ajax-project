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
  var tag = document.createElement('p');
  tag.setAttribute('class', 'margin-five text-center');
  tag.textContent = e.tagline;
  name.appendChild(tag);
  var more = document.createElement('div');
  more.setAttribute('class','flex center-content');
  main.appendChild(more);
  var moreLink = document.createElement('a');
  moreLink.setAttribute('class','a-style');
  moreLink.setAttribute('href','#');
  moreLink.textContent = 'More Information';
  more.appendChild(moreLink);
  var theInfoDiv = document.createElement('div');
  theInfoDiv.setAttribute('class','hidden row flex flex-column center-content');
  main.appendChild(theInfoDiv);
  var hops = document.createElement('p');
  hops.setAttribute('class','margin-five text-center');
  hops.textContent = 'Hops: ' + e.hops.name;
  theInfoDiv.appendChild(hops);
  var taste = document.createElement('p');
  taste.setAttribute('class', 'margin-five text-center');
  taste.textContent = 'Taste: ' + e.hops.attribute;
  theInfoDiv.appendChild(taste);
  var yeast = document.createElement('p');
  yeast.setAttribute('class', 'margin-five text-center');
  yeast.textContent = 'Yeast: ' + e.yeast;
  theInfoDiv.appendChild(yeast);
  var abv = document.createElement('p');
  abv.setAttribute('class', 'margin-five text-center');
  abv.textContent = 'ABV: ' + e.abv;
  theInfoDiv.appendChild(abv);




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
