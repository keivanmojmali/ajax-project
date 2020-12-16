var $welcome = document.querySelector('#welcome');
var $signup = document.querySelector('#signUp');
var $topBar = document.querySelector('#topBar');
var $bottomBar = document.querySelector('#bottomBar');
var $explore = document.querySelector('#explore');
var $profile = document.querySelector('#profile');
var $planMeal = document.querySelector('#planMeal');
var $results = document.querySelector('#results');





function view(e){
  if(e === 'newUser') {
    $welcome.classList.remove('hidden');
  }
}


window.addEventListener('DOMContentLoaded', function(e){
  if(user === null) {
    view('newUser')
  }
})
