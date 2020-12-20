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
    // $bottomBar.classList.add('hidden');
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
    // $bottomBar.classList.add('hidden');
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
    // $bottomBar.classList.remove('hidden');
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
    // $bottomBar.classList.remove('hidden');
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
    // $bottomBar.classList.remove('hidden');
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
    // $bottomBar.classList.remove('hidden');
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





function domCreate(e) {
  var container = document.createElement('div');
  container.setAttribute('class', 'container');
  var imgRow = document.createElement('row');
  imgRow.setAttribute('class','row');
  container.appendChild(imgRow);
  var imgCol = document.createElement('div');
  imgCol.setAttribute('class','col text-center');
  imgRow.appendChild(imgCol);
  var image = document.createElement('img');
  image.setAttribute('class','img-thumbnail explore-img');
  image.setAttribute('src', e.image);
  image.setAttribute('alt', e.tagline);
  imgCol.appendChild(image);
  var nameRow = document.createElement('div');
  nameRow.setAttribute('class','row');
  container.appendChild(nameRow);
  var nameCol = document.createElement('div');
  nameCol.setAttribute('class','col');
  nameRow.appendChild(nameCol);
  var name = document.createElement('h1');
  name.textContent = e.name;
  nameCol.appendChild(name);
  var tagRow = document.createElement('div');
  tagRow.setAttribute('class','row');
  container.appendChild(tagRow);
  var tagCol = document.createElement('div');
  tagCol.setAttribute('class','col');
  tagRow.appendChild(tagCol);
  var tag = document.createElement('p');
  tag.textContent = e.tagline;
  tagCol.appendChild(tag);
  var infoStarRow = document.createElement('div');
  infoStarRow.setAttribute('class','row');
  container.appendChild(infoStarRow);
  var infoCol = document.createElement('div');
  infoCol.setAttribute('class','col-lg');
  infoStarRow.appendChild(infoCol);
  var infoBtn = document.createElement('button');
  infoBtn.setAttribute('type','submit')
  infoBtn.setAttribute('data-view',e.beerId);
  infoBtn.setAttribute('data-click','notesEdit');
  infoBtn.setAttribute('class','btn btn-primary btn-sm');
  infoBtn.textContent = 'More Information';
  infoCol.appendChild(infoBtn);
  var starCol = document.createElement('div');
  starCol.setAttribute('class','col');
  infoStarRow.appendChild(starCol);
  var star = document.createElement('i');
  star.setAttribute('class', 'far fa-star');
  star.setAttribute('data-star', 'favorite');
  star.setAttribute('data-fav', e.beerId);
  starCol.appendChild(star);
  var moreInfoRow = document.createElement('div');
  moreInfoRow.setAttribute('class','row hidden');
  moreInfoRow.setAttribute('id', e.beerId);
  moreInfoRow.setAttribute('data-boolean', 'false');
  container.appendChild(moreInfoRow);
  // Could possibly separate into hops and yeast row and then food pairaings row if you want
  var hopsCol = document.createElement('div');
  hopsCol.setAttribute('class','col');
  moreInfoRow.appendChild(hopsCol);
  var hops = document.createElement('p');
  hops.textContent = 'Hops: ' + e.hops;
  hopsCol.appendChild(hops);
  yeastCol = document.createElement('div');
  yeastCol.setAttribute('class','col');
  moreInfoRow.appendChild(yeastCol);
  var yeast = document.createElement('p');
  yeast.textContent = 'Yeast: ' + e.yeast;
  yeastCol.appendChild(yeast);
  var abvCol = document.createElement('div');
  abvCol.setAttribute('class','col');
  moreInfoRow.appendChild(abvCol);
  var abv = document.createElement('p');
  abv.textContent = 'ABV: ' + e.abv;
  abvCol.appendChild(abv);
  // you can do one col here or serparte them into multipile depending on the look
  var foodCol = document.createElement('div');
  foodCol.setAttribute('class','col');
  moreInfoRow.appendChild(foodCol);
  var foodOne = document.createElement('p');
  foodOne.textContent = 'Food Pairing(s): ' + e.food[0];
  foodCol.appendChild(foodOne);
  var foodTwo = document.createElement('p');
  foodTwo.textContent = 'Food Pairing(s): ' + e.food[1];
  foodCol.appendChild(foodTwo);
  var foodThree = document.createElement('p');
  foodThree.textContent = 'Food Pairing(s): ' + e.food[2];
  foodCol.appendChild(foodThree);
  return container;
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
  var container = document.createElement('div');
  container.setAttribute('class', 'container');
  var imgRow = document.createElement('row');
  imgRow.setAttribute('class', 'row');
  container.appendChild(imgRow);
  var imgCol = document.createElement('div');
  imgCol.setAttribute('class', 'col text-center');
  imgRow.appendChild(imgCol);
  var image = document.createElement('img');
  image.setAttribute('class', 'img-thumbnail explore-img');
  image.setAttribute('src', e.image);
  image.setAttribute('alt', e.tagline);
  imgCol.appendChild(image);
  var nameRow = document.createElement('div');
  nameRow.setAttribute('class', 'row');
  container.appendChild(nameRow);
  var nameCol = document.createElement('div');
  nameCol.setAttribute('class', 'col');
  nameRow.appendChild(nameCol);
  var name = document.createElement('h1');
  name.textContent = e.name;
  nameCol.appendChild(name);
  var tagRow = document.createElement('div');
  tagRow.setAttribute('class', 'row');
  container.appendChild(tagRow);
  var tagCol = document.createElement('div');
  tagCol.setAttribute('class', 'col');
  tagRow.appendChild(tagCol);
  var tag = document.createElement('p');
  tag.textContent = e.tagline;
  tagCol.appendChild(tag);
  var infoStarRow = document.createElement('div');
  infoStarRow.setAttribute('class', 'row');
  container.appendChild(infoStarRow);
  var infoCol = document.createElement('div');
  infoCol.setAttribute('class', 'col-lg');
  infoStarRow.appendChild(infoCol);
  var infoBtn = document.createElement('button');
  infoBtn.setAttribute('type', 'submit')
  infoBtn.setAttribute('data-view', e.beerId);
  infoBtn.setAttribute('data-click', 'notesEdit');
  infoBtn.setAttribute('class', 'btn btn-primary btn-sm');
  infoBtn.textContent = 'More Information';
  infoCol.appendChild(infoBtn);
  // var starCol = document.createElement('div');
  // starCol.setAttribute('class', 'col');
  // infoStarRow.appendChild(starCol);
  // var star = document.createElement('i');
  // star.setAttribute('class', 'far fa-star');
  // star.setAttribute('data-star', 'favorite');
  // star.setAttribute('data-fav', e.beerId);
  // starCol.appendChild(star);
  var moreInfoRow = document.createElement('div');
  moreInfoRow.setAttribute('class', 'row hidden');
  moreInfoRow.setAttribute('id', e.beerId);
  moreInfoRow.setAttribute('data-boolean', 'false');
  container.appendChild(moreInfoRow);
  // Could possibly separate into hops and yeast row and then food pairaings row if you want
  var hopsCol = document.createElement('div');
  hopsCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(hopsCol);
  var hops = document.createElement('p');
  hops.textContent = 'Hops: ' + e.hops;
  hopsCol.appendChild(hops);
  yeastCol = document.createElement('div');
  yeastCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(yeastCol);
  var yeast = document.createElement('p');
  yeast.textContent = 'Yeast: ' + e.yeast;
  yeastCol.appendChild(yeast);
  var abvCol = document.createElement('div');
  abvCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(abvCol);
  var abv = document.createElement('p');
  abv.textContent = 'ABV: ' + e.abv;
  abvCol.appendChild(abv);
  // you can do one col here or serparte them into multipile depending on the look
  var foodCol = document.createElement('div');
  foodCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(foodCol);
  var foodOne = document.createElement('p');
  foodOne.textContent = 'Food Pairing(s): ' + e.food[0];
  foodCol.appendChild(foodOne);
  var foodTwo = document.createElement('p');
  foodTwo.textContent = 'Food Pairing(s): ' + e.food[1];
  foodCol.appendChild(foodTwo);
  var foodThree = document.createElement('p');
  foodThree.textContent = 'Food Pairing(s): ' + e.food[2];
  foodCol.appendChild(foodThree);

  var notesBtnRow = document.createElement('div');
  notesBtnRow.setAttribute('class','row');
  container.appendChild(notesBtnRow);

  var notesBtnCol = document.createElement('div');
  notesBtnCol.setAttribute('class','col');
  notesBtnRow.appendChild(notesBtnCol);

  var notesBtn = document.createElement('button');
  notesBtn.setAttribute('class','btn btn-sm btn-secondary');
  notesBtn.textContent = 'Add Notes';
  notesBtn.setAttribute('data-edit', 'editMe');
  notesBtn.setAttribute('data-find', e.beerId);
  notesBtn.setAttribute('data-boolean', 'false');
  notesBtnCol.appendChild(notesBtn);

  var notesRow = document.createElement('div');
  notesRow.setAttribute('class','row');
  notesRow.setAttribute('data-notes', e.beerId);
  container.appendChild(notesRow);

  var notesCol = document.createElement('div');
  notesCol.setAttribute('class','col');
  notesCol.setAttribute('data-notes',e.beerId);
  notesRow.appendChild(notesCol);

  var notes = document.createElement('p');
  notes.textContent = e.notes;
  notes.setAttribute('data-update', e.beerId);
  notesCol.appendChild(notes);

  var editNotesRow = document.createElement('div');
  editNotesRow.setAttribute('class','row hidden');
  editNotesRow.setAttribute('data-input', e.beerId);
  container.appendChild(editNotesRow);

  var editNotesCol = document.createElement('div');
  editNotesCol.setAttribute('class','col');
  editNotesRow.appendChild(editNotesCol);

  var form = document.createElement('form');
  form.setAttribute('data-form', e.beerId)
  editNotesCol.appendChild(form);

  var textField = document.createElement('textarea');
  textField.value = e.notes;
  textField.setAttribute('class', 'column-full');
  textField.setAttribute('name', 'notes');
  form.appendChild(textField);

  var submitFormButton = document.createElement('button');
  submitFormButton.textContent = 'Save';
  submitFormButton.setAttribute('data-submit', 'save');
  submitFormButton.setAttribute('data-sub', e.beerId);
  submitFormButton.setAttribute('class', 'btn btn-sm btn-secondary');
  form.appendChild(submitFormButton);

  return container;
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
    var notesRow = document.querySelectorAll('[data-notes]');
    var editNotesRow = document.querySelectorAll('[data-input]');
    var form = document.querySelectorAll('[data-form]');

    for (var i = 0; i < form.length; i++) {
      if (notesRow[i] === e.target.dataset.find)
        notesRow[i].classList.add('hidden');
      editNotesRow[i].classList.remove('hidden');
      // edit note sbutton becomes hidden as well
    }
  }
  if (e.target.dataset.submit === 'save') {
    var num = e.target.dataset.sub - 1;
    var notesRow = document.querySelectorAll('[data-notes]');
    var editNotesRow = document.querySelectorAll('[data-input]');
    var updateNotes = document.querySelectorAll('[data-update]');
    var form = document.querySelectorAll('[data-form]');

    for (var i = 0; i < notesRow.length; i++) {
      if (notesRow[i].dataset.notes === e.target.dataset.sub) {
        user.favorites[num].notes = form[i].elements.notes.value;
        notesRow[i].classList.remove('hidden');
        editNotesRow[i].classList.add('hidden');
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
    // change later
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
