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
var $profileImage = document.querySelector('#profileImage');
var $profileName = document.querySelector('#profileName');
var $profileBio = document.querySelector('#profileBio');
var $favPosition = document.querySelector('#favorites');
var $eatTonight = document.querySelector('#eatTonight');
var $imageTonight = document.querySelector('#imageTonight');
var $beerTonight = document.querySelector('#beerTonight');
var random = [];
var current = 0;
var beerId = 1;



// This function changes the views
function view(e) {
  if (e === 'newUser') {
    $welcome.classList.remove('hidden');
    $signup.classList.add('hidden');
    $bottomBar.classList.add('hidden');
    $explore.classList.add('hidden');
    $profile.classList.add('hidden');
    $planMeal.classList.add('hidden');
    $results.classList.add('hidden');
    $joinNow.classList.remove('hidden');
    $signForm.classList.add('hidden');

  }
  if (e === 'signUp') {
    $welcome.classList.add('hidden');
    $signup.classList.remove('hidden');
    $bottomBar.classList.add('hidden');
    $explore.classList.add('hidden');
    $profile.classList.add('hidden');
    $planMeal.classList.add('hidden');
    $results.classList.add('hidden');
    $joinNow.classList.add('hidden');
    $signForm.classList.remove('hidden');
    $signForm.elements.url.value = user.profile.imgUrl;
    $signForm.elements.name.value = user.profile.name;
    $signForm.elements.bio.value = user.profile.bio;

  }
  if (e === 'explore') {
    $welcome.classList.add('hidden');
    $signup.classList.add('hidden');
    $bottomBar.classList.remove('hidden');
    $explore.classList.remove('hidden');
    $profile.classList.add('hidden');
    $planMeal.classList.add('hidden');
    $results.classList.add('hidden');
    $joinNow.classList.add('hidden');
    $signForm.classList.add('hidden');
    loadExplore();

  }
  if (e === 'results') {
    $welcome.classList.add('hidden');
    $signup.classList.add('hidden');
    $bottomBar.classList.remove('hidden');
    $explore.classList.add('hidden');
    $profile.classList.add('hidden');
    $planMeal.classList.add('hidden');
    $results.classList.remove('hidden');
    $joinNow.classList.add('hidden');
    $signForm.classList.add('hidden');
    mealTonight();
  }
  if (e === 'plan') {
    $welcome.classList.add('hidden');
    $signup.classList.add('hidden');
    $bottomBar.classList.remove('hidden');
    $explore.classList.add('hidden');
    $profile.classList.add('hidden');
    $planMeal.classList.remove('hidden');
    $results.classList.add('hidden');
    $joinNow.classList.add('hidden');
    $signForm.classList.add('hidden');
  }
  if (e === 'profile') {
    $welcome.classList.add('hidden');
    $signup.classList.add('hidden');
    $bottomBar.classList.remove('hidden');
    $explore.classList.add('hidden');
    $profile.classList.remove('hidden');
    $planMeal.classList.add('hidden');
    $results.classList.add('hidden');
    $joinNow.classList.add('hidden');
    $signForm.classList.add('hidden');
    profileLoad();
  }
}


// This function returns a random beer
function randomBeers() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.punkapi.com/v2/beers/random');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var toRender = xhr.response[0];
    if (toRender.image_url !== null && toRender.tagline !== null && toRender.name !== null
      && toRender.ingredients.hops[0].name !== null && toRender.ingredients.yeast !== null
      && toRender.abv !== null && toRender.food_pairing !== null) {
      var image = toRender.image_url;
      var tagline = toRender.tagline;
      var name = toRender.name;
      var hops = toRender.ingredients.hops[0].name;
      var yeast = toRender.ingredients.yeast;
      var abv = toRender.abv;
      var food = toRender.food_pairing;
      var notes = '';
      var theId = beerId;
      var singleObject = { image, tagline, name, hops, yeast, abv, food, beerId, notes };
      beerId++
      random.push(singleObject);
    } else {
      randomBeers();
    }
  })
  xhr.send();
}



// this function returns dom element to append
function domCreate(e) {
  var main = document.createElement('div');
  main.setAttribute('class', 'margin-top-bottom');
  var col = document.createElement('div');
  col.setAttribute('class', 'column-full flex center-content');
  main.appendChild(col);
  var image = document.createElement('img');
  image.setAttribute('src', e.image);
  image.setAttribute('alt', e.tagline);
  col.appendChild(image);
  var name = document.createElement('div');
  name.setAttribute('class', 'column-full flex-column flex center-content');
  main.appendChild(name);
  var nameText = document.createElement('h1');
  nameText.setAttribute('class', 'beer-name');
  nameText.textContent = e.name;
  name.appendChild(nameText);
  var tag = document.createElement('p');
  tag.setAttribute('class', 'margin-five text-center');
  tag.textContent = e.tagline;
  name.appendChild(tag);
  var starDiv = document.createElement('div');
  name.appendChild(starDiv);
  var star = document.createElement('i');
  star.setAttribute('class', 'far fa-star');
  star.setAttribute('data-star', 'favorite');
  star.setAttribute('data-fav', e.beerId);
  starDiv.appendChild(star);
  var more = document.createElement('div');
  more.setAttribute('class', 'flex center-content');
  main.appendChild(more);
  var moreLink = document.createElement('button');
  // moreLink.setAttribute('class', ''); add a button class here
  moreLink.setAttribute('type', 'submit');
  moreLink.setAttribute('data-view', e.beerId);
  moreLink.setAttribute('data-click', 'notesEdit');
  moreLink.textContent = 'More Information';
  more.appendChild(moreLink);
  var theInfoDiv = document.createElement('div');
  theInfoDiv.setAttribute('class', 'hidden row flex flex-column center-content');
  theInfoDiv.setAttribute('id', e.beerId);
  theInfoDiv.setAttribute('data-boolean', 'false');
  main.appendChild(theInfoDiv);
  var hops = document.createElement('p');
  hops.setAttribute('class', 'margin-five text-center');
  hops.textContent = 'Hops: ' + e.hops;
  theInfoDiv.appendChild(hops);
  // var taste = document.createElement('p');
  // taste.setAttribute('class', 'margin-five text-center');
  // taste.textContent = 'Taste: ' + e.hops.attribute;
  // theInfoDiv.appendChild(taste);
  var yeast = document.createElement('p');
  yeast.setAttribute('class', 'margin-five text-center');
  yeast.textContent = 'Yeast: ' + e.yeast;
  theInfoDiv.appendChild(yeast);
  var abv = document.createElement('p');
  abv.setAttribute('class', 'margin-five text-center');
  abv.textContent = 'ABV: ' + e.abv;
  theInfoDiv.appendChild(abv);
  var food = document.createElement('p');
  food.setAttribute('class', 'margin-five text-center');
  food.textContent = 'Food Pairing(s): ' + e.food[0];
  theInfoDiv.appendChild(food);
  var foodTwo = document.createElement('p');
  foodTwo.setAttribute('class', 'margin-five text-center');
  foodTwo.textContent = 'Food Pairing(s): ' + e.food[1];
  theInfoDiv.appendChild(foodTwo);
  var foodThree = document.createElement('p');
  foodThree.setAttribute('class', 'margin-five text-center');
  foodThree.textContent = 'Food Pairing(s): ' + e.food[2];
  theInfoDiv.appendChild(foodThree);
  return main;
}





// this function loads 25 beers with ima s into the explorer page
function loadExplore() {
  for (i = 0; i < 26; i++) {
    var holdEl = domCreate(random[i])
    $explore.appendChild(holdEl);
  }
  current = current + 25;
}



function profileDom(e) {
  var main = document.createElement('div');
  main.setAttribute('class', 'margin-top-bottom');
  var col = document.createElement('div');
  col.setAttribute('class', 'column-full flex center-content');
  main.appendChild(col);
  var image = document.createElement('img');
  image.setAttribute('src', e.image);
  image.setAttribute('alt', e.tagline);
  col.appendChild(image);
  var name = document.createElement('div');
  name.setAttribute('class', 'column-full flex-column flex center-content');
  main.appendChild(name);
  var nameText = document.createElement('h1');
  nameText.setAttribute('class', 'beer-name');
  nameText.textContent = e.name;
  name.appendChild(nameText);
  var tag = document.createElement('p');
  tag.setAttribute('class', 'margin-five text-center');
  tag.textContent = e.tagline;
  name.appendChild(tag);
  var more = document.createElement('div');
  var theInfoDiv = document.createElement('div');
  theInfoDiv.setAttribute('class', 'row flex flex-column center-content');
  theInfoDiv.setAttribute('id', e.beerId);
  theInfoDiv.setAttribute('data-boolean', 'false');
  main.appendChild(theInfoDiv);
  var hops = document.createElement('p');
  hops.setAttribute('class', 'margin-five text-center');
  hops.textContent = 'Hops: ' + e.hops;
  theInfoDiv.appendChild(hops);
  var yeast = document.createElement('p');
  yeast.setAttribute('class', 'margin-five text-center');
  yeast.textContent = 'Yeast: ' + e.yeast;
  theInfoDiv.appendChild(yeast);
  var abv = document.createElement('p');
  abv.setAttribute('class', 'margin-five text-center');
  abv.textContent = 'ABV: ' + e.abv;
  theInfoDiv.appendChild(abv);
  var food = document.createElement('p');
  food.setAttribute('class', 'margin-five text-center');
  food.textContent = 'Food Pairing(s): ' + e.food[0];
  theInfoDiv.appendChild(food);
  var foodTwo = document.createElement('p');
  foodTwo.setAttribute('class', 'margin-five text-center');
  foodTwo.textContent = 'Food Pairing(s): ' + e.food[1];
  theInfoDiv.appendChild(foodTwo);
  var foodThree = document.createElement('p');
  foodThree.setAttribute('class', 'margin-five text-center');
  foodThree.textContent = 'Food Pairing(s): ' + e.food[2];
  theInfoDiv.appendChild(foodThree);


  var notesButton = document.createElement('button');
  notesButton.textContent = 'Add Notes';
  notesButton.setAttribute('data-edit', 'editMe');
  notesButton.setAttribute('data-find', e.beerId);
  notesButton.setAttribute('data-boolean', 'false');
  theInfoDiv.appendChild(notesButton);

  var notesHolderDiv = document.createElement('div');
  notesHolderDiv.setAttribute('class', 'column-full');
  notesHolderDiv.setAttribute('data-notes', e.beerId);
  main.appendChild(notesHolderDiv);
  var notes = document.createElement('p');
  notes.textContent = e.notes;
  notes.setAttribute('data-update',e.beerId);
  notesHolderDiv.appendChild(notes);

  var editNotesDiv = document.createElement('div');
  editNotesDiv.setAttribute('class', 'hidden');
  editNotesDiv.setAttribute('data-input', e.beerId);
  main.appendChild(editNotesDiv);
  var form = document.createElement('form');
  form.setAttribute('data-form', e.beerId)
  editNotesDiv.appendChild(form);
  var textField = document.createElement('textarea');
  textField.value = e.notes;
  textField.setAttribute('class', 'column-full');
  textField.setAttribute('name', 'notes');
  form.appendChild(textField);
  var submitFormButton = document.createElement('button');
  submitFormButton.textContent = 'Save';
  submitFormButton.setAttribute('data-submit', 'save');
  submitFormButton.setAttribute('data-sub', e.beerId);
  submitFormButton.setAttribute('class', 'column-full');
  form.appendChild(submitFormButton);



  return main;
}



// this function loads the profile onto the profile page
function profileLoad() {
  $profileImage.src = user.profile.imgUrl;
  $profileName.textContent = user.profile.name;
  $profileBio.textContent = user.profile.bio;
  for (i = 0; i < user.favorites.length; i++) {
    var append = profileDom(user.favorites[i]);
    $favPosition.appendChild(append);
  }
}




window.addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.id === 'joinNow') {
    view('signUp')
  }

  if (e.target.id === 'eat') {
    view('results');
  };

  if (e.target.id === 'navProfile') {
    view('profile')

  }
  if (e.target.id === 'navPlan') {
    view('plan')

  }
  if (e.target.id === 'navExplore') {
    view('explore')
  }

  if (e.target.dataset.click === 'notesEdit') {
    var infoDiv = document.getElementById(e.target.dataset.view);
    if (infoDiv.dataset.boolean === 'false') {
      infoDiv.classList.remove('hidden');
      infoDiv.dataset.boolean = 'true';
      e.target.textContent = 'Less Information'
    } else {
      infoDiv.classList.add('hidden');
      infoDiv.dataset.boolean = 'false';
      e.target.textContent = 'More Information'
    }
  }

  if (e.target.dataset.star === 'favorite') {
    var num = e.target.dataset.fav - 1;
    console.log(num);
    user.favorites.push(random[num]);
    e.target.className = 'fas fa-star';
  }

  if (e.target.id === 'editProfile') {
    view('signUp');
  }

  if (e.target.dataset.edit === 'editMe') {
    var notesDiv = document.querySelectorAll('[data-notes]');
    var editNotes = document.querySelectorAll('[data-input]');
    var form = document.querySelectorAll('[data-form]');
    for (var i = 0; i < form.length; i++) {
      if (notesDiv[i] === e.target.dataset.find)
        notesDiv[i].classList.add('hidden');
      editNotes[i].classList.remove('hidden');
      // edit note sbutton becomes hidden as well
    }
  }
  if (e.target.dataset.submit === 'save') {
    var num = e.target.dataset.sub - 1;
    var notesDiv = document.querySelectorAll('[data-notes]');
    var editNotes = document.querySelectorAll('[data-input]');
    var updateNotes = document.querySelectorAll('[data-update]');
    var form = document.querySelectorAll('[data-form]');
    for (var i = 0; i < notesDiv.length; i++) {
      if (notesDiv[i].dataset.notes === e.target.dataset.sub) {
        console.log('working here');
        user.favorites[num].notes = form[i].elements.notes.value;
        notesDiv[i].classList.remove('hidden');
        editNotes[i].classList.add('hidden');
        updateNotes[i].textContent = form[i].elements.notes.value;
      }
    }
  }
})


window.addEventListener('DOMContentLoaded', function (e) {


  if (user.profile.name === '') {
    view('newUser')
  } else {
    view('plan');
  }

  for (var i = 0; i < 50; i++) {
    randomBeers();
  }

})




document.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(e.target.id);
  var imgUrl = $signForm.elements.url.value;
  var name = $signForm.elements.name.value;
  var bio = $signForm.elements.bio.value;
  user.profile = { name, imgUrl, bio };
  if (e.target.id === 'signForm') {
    view('explore');
  }


})


function mealTonight() {
  var toRender = random[30];
  $imageTonight.src = toRender.image;
  $imageTonight.alt = 'A random beer and food selection for tonight';
  $beerTonight.textContent = toRender.name;
  var food1 = document.createElement('li');
  food1.textContent = toRender.food[0];
  $eatTonight.appendChild(food1);
  var food2 = document.createElement('li');
  food2.textContent = toRender.food[1];
  $eatTonight.appendChild(food2);
  var food3 = document.createElement('li');
  food3.textContent = toRender.food[2];
  $eatTonight.appendChild(food3);
};
