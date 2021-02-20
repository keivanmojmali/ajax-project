const $welcome = document.querySelector('#welcome');
const $topBar = document.querySelector('#topBar');
const $bottomBar = document.querySelector('#bottomBar');
const $explore = document.querySelector('#explore');
const $exploreResults = document.querySelector('#exploreResults');
const $planMeal = document.querySelector('#planMeal');
const $profile = document.querySelector('#profile');
const $results = document.querySelector('#results');
const $joinNow = document.querySelector('#joinNow');
const $signForm = document.querySelector('#signForm');
const $profileImage = document.querySelector('#profileImage');
const $profileName = document.querySelector('#profileName');
const $profileBio = document.querySelector('#profileBio');
const $favPosition = document.querySelector('#favorites');
const $eatTonight = document.querySelector('#eatTonight');
const $imageTonight = document.querySelector('#imageTonight');
const $beerTonight = document.querySelector('#beerTonight');
const $planheadlineOne = document.querySelector('#planHeadlineOne')
const $planHeadlineTwo = document.querySelector('#planHeadlineTwo');
const $navLinks = document.querySelector('#navLinks')
const $bottomNavLinks = document.querySelector('#bottomNavLinks');
const $edituserForm = document.querySelector('#editUserForm');
const $editProfileCol = document.querySelector('#editProfileCol');
const $profileView = document.querySelector('#profileView');
const $plan = document.querySelector('#plan');
const $collapseButton = document.querySelector('#collapseButton');
let mealPlanBoolean = true;
const random = [];
const planFeatureHoldArray = [];
let favNum = 0
let current = 0;
let pageCount = 1;
let beerId = 1;


function view(e) {
  if (e === 'explore') {
    $exploreResults.innerHTML = " ";
    $welcome.classList.add('hidden');
    $explore.classList.remove('hidden');
    $navLinks.classList.remove('hidden');
    $bottomNavLinks.classList.remove('hidden');
    $profile.classList.add('hidden');
    $favPosition.innerHTML = '';
    $plan.classList.add('hidden');
    loadExplore();
    window.scroll(0,0);
    window.scroll({ behavior: 'smooth' });
  }
  if (e === 'profile') {
    $favPosition.innerHTML = '';
    $welcome.classList.add('hidden');
    $explore.classList.add('hidden');
    $navLinks.classList.remove('hidden');
    $bottomNavLinks.classList.remove('hidden');
    $profile.classList.remove('hidden');
    $plan.classList.add('hidden');
    profileLoad();
    window.scroll(0, 0);
    window.scroll({ behavior: 'smooth' });
  }
  if (e === 'plan') {
    $welcome.classList.add('hidden');
    $explore.classList.add('hidden');
    $navLinks.classList.remove('hidden');
    $bottomNavLinks.classList.remove('hidden');
    $profile.classList.add('hidden');
    $favPosition.innerHTML = '';
    $plan.classList.remove('hidden');
    window.scroll(0, 0);
    window.scroll({ behavior: 'smooth' });
  }

}


function randomBeers() {
  pageCount++
  if (pageCount > 7) {
    pageCount = 0
  }
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.punkapi.com/v2/beers?page=${pageCount}&per_page=80`);
  xhr.responseText = 'json';
  xhr.addEventListener('load', () => {
    const toRender = JSON.parse(xhr.response);
    for (let i = 0; i < toRender.length; i++) {
      if (toRender[i].image_url !== null && toRender[i].tagline !== null && toRender[i].name !== null
        && toRender[i].ingredients.hops !== null && toRender[i].ingredients.yeast !== null
        && toRender[i].abv !== null && toRender[i].food_pairing !== null && toRender[i].name.length < 16) {
        let image = toRender[i].image_url;
        let tagline = toRender[i].tagline;
        let name = toRender[i].name;
        let hops = toRender[i].ingredients.hops[0].name;
        let yeast = toRender[i].ingredients.yeast;
        let abv = toRender[i].abv;
        let food = toRender[i].food_pairing;
        let notes = '';
        let theId = beerId;
        let singleObject = { image, tagline, name, hops, yeast, abv, food, beerId, notes };
        beerId++
        random.push(singleObject);
      }
    }
  })
  xhr.send();

}



function planFeatureHold() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.punkapi.com/v2/beers/random');
  xhr.responseText = 'json';
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.response);
    const toRender = response[0];
    if (toRender.image_url !== null && toRender.tagline !== null && toRender.name !== null
      && toRender.ingredients.hops!== null && toRender.ingredients.yeast !== null
      && toRender.abv !== null && toRender.food_pairing !== null && toRender.name.length < 16) {
      let image = toRender.image_url;
      let tagline = toRender.tagline;
      let name = toRender.name;
      let hops = toRender.ingredients.hops[0].name;
      let yeast = toRender.ingredients.yeast;
      let abv = toRender.abv;
      let food = toRender.food_pairing;
      let notes = '';
      let theId = beerId;
      let singleObject = { image, tagline, name, hops, yeast, abv, food, beerId, notes };
      planFeatureHoldArray.push(singleObject);
    } else {
      planFeatureHold();
    }
  })
  xhr.send();

}



function domCreate(e) {
  const container = document.createElement('div');
  container.setAttribute('class', 'col-lg-4 col-md-6 col-xs-12 d-flex flex-column justify-content-between align-items-center black-border content-padding');
  const imgRow = document.createElement('row');
  imgRow.setAttribute('class', 'row');
  container.appendChild(imgRow);
  const imgCol = document.createElement('div');
  imgCol.setAttribute('class', 'col rem-pic d-flex align-items-center justify-content-center');
  imgRow.appendChild(imgCol);
  const image = document.createElement('img');
  image.setAttribute('class', 'twenty-img');
  image.setAttribute('src', e.image);
  image.setAttribute('alt', e.tagline);
  imgCol.appendChild(image);
  const nameRow = document.createElement('div');
  nameRow.setAttribute('class', 'row');
  container.appendChild(nameRow);
  const nameCol = document.createElement('div');
  nameCol.setAttribute('class', 'col');
  nameRow.appendChild(nameCol);
  const name = document.createElement('h1');
  name.textContent = e.name;
  nameCol.appendChild(name);
  const tagRow = document.createElement('div');
  tagRow.setAttribute('class', 'row');
  container.appendChild(tagRow);
  const tagCol = document.createElement('div');
  tagCol.setAttribute('class', 'col');
  tagRow.appendChild(tagCol);
  const tag = document.createElement('p');
  tag.textContent = e.tagline;
  tagCol.appendChild(tag);
  const infoStarRow = document.createElement('div');
  infoStarRow.setAttribute('class', 'row');
  container.appendChild(infoStarRow);
  const infoCol = document.createElement('div');
  infoCol.setAttribute('class', 'col');
  infoStarRow.appendChild(infoCol);
  const infoBtn = document.createElement('button');
  infoBtn.setAttribute('type', 'button')
  infoBtn.setAttribute('data-view', e.beerId);
  infoBtn.setAttribute('data-click', 'exploreEdit');
  infoBtn.setAttribute('class', 'btn btn-primary btn-sm');
  infoBtn.textContent = 'More Information';
  infoCol.appendChild(infoBtn);
  const starCol = document.createElement('div');
  starCol.setAttribute('class', 'col d-flex small-margin');
  infoStarRow.appendChild(starCol);
  const star = document.createElement('i');
  star.setAttribute('class', 'far fa-bookmark small-margin');
  star.setAttribute('data-star', 'favorite');
  star.setAttribute('data-fav', e.beerId);
  starCol.appendChild(star);
  const addTo = document.createElement('p');
  addTo.textContent = 'Add Me To Favorites!'
  starCol.appendChild(addTo);
  const moreInfoRow = document.createElement('div');
  moreInfoRow.setAttribute('class', 'row hidden position-relative');
  moreInfoRow.setAttribute('id', e.beerId);
  moreInfoRow.setAttribute('data-boolean', 'false');
  imgRow.appendChild(moreInfoRow);
  const absoluteDiv = document.createElement('div');
  absoluteDiv.setAttribute('class', 'row');
  moreInfoRow.appendChild(absoluteDiv);
  const hopsCol = document.createElement('div');
  hopsCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(hopsCol);
  const hops = document.createElement('p');
  hops.textContent = `Hops: ${e.hops}`;
  hopsCol.appendChild(hops);
  yeastCol = document.createElement('div');
  yeastCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(yeastCol);
  const yeast = document.createElement('p');
  yeast.textContent = `Yeast: ${e.yeast}`;
  yeastCol.appendChild(yeast);
  const abvCol = document.createElement('div');
  abvCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(abvCol);
  const abv = document.createElement('p');
  abv.textContent = `ABV: ${e.abv}`
  abvCol.appendChild(abv);
  const foodCol = document.createElement('div');
  foodCol.setAttribute('class', 'row');
  moreInfoRow.appendChild(foodCol);
  const foodOne = document.createElement('p');
  foodOne.textContent = `Food Pairing(s): ${e.food[0]}`;
  foodCol.appendChild(foodOne);
  const foodTwo = document.createElement('p');
  foodTwo.textContent = `Food Pairing(s): ${e.food[1]}`;
  foodCol.appendChild(foodTwo);
  const foodThree = document.createElement('p');
  foodThree.textContent = `Food Pairing(s): ${e.food[2]}`;
  foodCol.appendChild(foodThree);
  return container;
}


function loadExplore() {
  count = current + 25;

  for(let i = current; i < count; i++)  {
    const holdEl = domCreate(random[i]);
    $exploreResults.appendChild(holdEl);
  }
  current = current + 25;
  randomBeers();
}




function profileDom(e) {
  const container = document.createElement('div');
  container.setAttribute('class', 'col-lg-4 col-sm-6 col-xs-12 d-flex flex-column justify-content-between align-iitems-center black-border content-padding');
  const imgRow = document.createElement('row');
  imgRow.setAttribute('class', 'row');
  container.appendChild(imgRow);
  const imgCol = document.createElement('div');
  imgCol.setAttribute('class', 'col rem-pic d-flex align-items-center justify-content-center');
  imgRow.appendChild(imgCol);
  const image = document.createElement('img');
  image.setAttribute('class', 'twenty-img');
  image.setAttribute('src', e.image);
  image.setAttribute('alt', e.tagline);
  imgCol.appendChild(image);
  const nameRow = document.createElement('div');
  nameRow.setAttribute('class', 'row fav-height');
  container.appendChild(nameRow);
  const nameCol = document.createElement('div');
  nameCol.setAttribute('class', 'col');
  nameRow.appendChild(nameCol);
  const name = document.createElement('h1');
  name.textContent = e.name;
  nameCol.appendChild(name);
  const tagRow = document.createElement('div');
  tagRow.setAttribute('class', 'row fav-height');
  container.appendChild(tagRow);
  const tagCol = document.createElement('div');
  tagCol.setAttribute('class', 'col');
  tagRow.appendChild(tagCol);
  const tag = document.createElement('p');
  tag.textContent = e.tagline;
  tagCol.appendChild(tag);
  const infoStarRow = document.createElement('div');
  infoStarRow.setAttribute('class', 'row fav-height');
  container.appendChild(infoStarRow);
  const infoCol = document.createElement('div');
  infoCol.setAttribute('class', 'col-lg');
  infoStarRow.appendChild(infoCol);
  const infoBtn = document.createElement('button');
  infoBtn.setAttribute('type', 'button')
  infoBtn.setAttribute('data-view', e.beerId);
  infoBtn.setAttribute('data-click', 'notesEdit');
  infoBtn.setAttribute('class', 'btn btn-primary btn-sm');
  infoBtn.textContent = 'More Information';
  infoCol.appendChild(infoBtn);
  const moreInfoRow = document.createElement('div');
  moreInfoRow.setAttribute('class', 'row hidden');
  moreInfoRow.setAttribute('data-beerId', e.beerId);
  moreInfoRow.setAttribute('data-boolean', 'false');



  imgRow.appendChild(moreInfoRow);
  const hopsCol = document.createElement('div');
  hopsCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(hopsCol);
  const hops = document.createElement('p');
  hops.textContent = `Hops: ${e.hops}`;
  hopsCol.appendChild(hops);
  yeastCol = document.createElement('div');
  yeastCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(yeastCol);
  const yeast = document.createElement('p');
  yeast.textContent = `Yeast: ${e.yeast} `;
  yeastCol.appendChild(yeast);
  const abvCol = document.createElement('div');
  abvCol.setAttribute('class', 'col');
  moreInfoRow.appendChild(abvCol);
  const abv = document.createElement('p');
  abv.textContent = `ABV: ${e.abv}`;
  abvCol.appendChild(abv);
  const foodCol = document.createElement('div');
  foodCol.setAttribute('class', 'row');
  moreInfoRow.appendChild(foodCol);
  const foodOne = document.createElement('p');
  foodOne.textContent = `Food Pairing(s): ${e.food[0]}`;
  foodCol.appendChild(foodOne);
  const foodTwo = document.createElement('p');
  foodTwo.textContent = `Food Pairing(s): ${e.food[1]}`;
  foodCol.appendChild(foodTwo);
  const foodThree = document.createElement('p');
  foodThree.textContent = `Food Pairing(s): ${e.food[2]}`;
  foodCol.appendChild(foodThree);
  const notesBtnRow = document.createElement('div');
  notesBtnRow.setAttribute('class', 'row');
  container.appendChild(notesBtnRow);
  const notesBtnCol = document.createElement('div');
  notesBtnCol.setAttribute('class', 'col');
  notesBtnRow.appendChild(notesBtnCol);
  const notesBtn = document.createElement('button');
  notesBtn.setAttribute('class', 'btn btn-sm btn-secondary');
  notesBtn.textContent = 'Add Notes';
  notesBtn.setAttribute('data-edit', 'editMe');
  notesBtn.setAttribute('data-find', e.order);
  notesBtn.setAttribute('data-boolean', 'false');
  notesBtnCol.appendChild(notesBtn);
  const notesRow = document.createElement('div');
  notesRow.setAttribute('class', 'row');
  notesRow.setAttribute('data-notes', e.order);
  container.appendChild(notesRow);
  const notesCol = document.createElement('div');
  notesCol.setAttribute('class', 'col small-margin');
  notesRow.appendChild(notesCol);
  const notes = document.createElement('p');
  notes.textContent = e.notes;
  notes.setAttribute('data-update', e.order);
  notesCol.appendChild(notes);
  const editNotesRow = document.createElement('div');
  editNotesRow.setAttribute('class', 'row hidden');
  editNotesRow.setAttribute('data-input', e.order);
  container.appendChild(editNotesRow);
  const editNotesCol = document.createElement('div');
  editNotesCol.setAttribute('class', 'col');
  editNotesRow.appendChild(editNotesCol);
  const form = document.createElement('form');
  form.setAttribute('data-form', e.order)
  form.setAttribute('class', 'd-flex flex-column');
  editNotesCol.appendChild(form);
  const textField = document.createElement('textarea');
  textField.value = e.notes;
  textField.setAttribute('class', 'column-full small-margin');
  textField.setAttribute('name', 'notes');
  form.appendChild(textField);
  const submitFormButton = document.createElement('button');
  submitFormButton.textContent = 'Save';
  submitFormButton.setAttribute('data-submit', 'save');
  submitFormButton.setAttribute('data-sub', e.order);
  submitFormButton.setAttribute('data-pick', e.order);
  submitFormButton.setAttribute('class', 'btn btn-sm btn-secondary');
  form.appendChild(submitFormButton);
  return container;
}



function mealTonight() {
  if(mealPlanBoolean === false) {
    return;
  }
  const toRender = planFeatureHoldArray[0];
  $planheadlineOne.textContent = "Tonight's Beer"
  $planHeadlineTwo.textContent = 'Paired With:'
  $imageTonight.src = toRender.image;
  $imageTonight.classList.add('twenty-img');
  $imageTonight.alt = 'A random beer and food selection for tonight';
  $beerTonight.textContent = toRender.name;
  const food1 = document.createElement('li');
  food1.textContent = toRender.food[0];
  $eatTonight.appendChild(food1);
  const food2 = document.createElement('li');
  food2.textContent = toRender.food[1];
  $eatTonight.appendChild(food2);
  const food3 = document.createElement('li');
  food3.textContent = toRender.food[2];
  $eatTonight.appendChild(food3);
  window.scroll(84, 600);
  window.scroll({ behavior: 'smooth' });
  mealPlanBoolean = false;
}


function flightRender() {
  const $imgOne = document.getElementById('imgOne');
  const $beerOne = document.getElementById('beerOne');
  const $desOne = document.getElementById('descriptionOne');
  const $imgTwo = document.getElementById('imgTwo');
  const $beerTwo = document.getElementById('beerTwo');
  const $desTwo = document.getElementById('descriptionTwo');
  const $imgThree = document.getElementById('imgThree');
  const $beerThree = document.getElementById('beerThree');
  const $desThree = document.getElementById('descriptionThree');
  const $imgFour = document.getElementById('imgFour');
  const $beerFour = document.getElementById('beerFour');
  const $desFour = document.getElementById('descriptionFour');
  const $imgFive = document.getElementById('imgFive');
  const $beerFive = document.getElementById('beerFive');
  const $desFive = document.getElementById('descriptionFive');
  $imgOne.src = planFeatureHoldArray[1].image;
  $imgTwo.src = planFeatureHoldArray[2].image;
  $imgThree.src = planFeatureHoldArray[3].image;
  $imgFour.src = planFeatureHoldArray[4].image;
  $imgFive.src = planFeatureHoldArray[5].image;
  $imgOne.className = 'twenty-img';
  $imgTwo.className = 'twenty-img';
  $imgThree.className = 'twenty-img';
  $imgFour.className = 'twenty-img';
  $imgFive.className = 'twenty-img';
  $beerOne.textContent = planFeatureHoldArray[1].name;
  $beerTwo.textContent = planFeatureHoldArray[2].name;
  $beerThree.textContent = planFeatureHoldArray[3].name;
  $beerFour.textContent = planFeatureHoldArray[4].name;
  $beerFive.textContent = planFeatureHoldArray[5].name;
  $desOne.textContent = planFeatureHoldArray[1].tagline;
  $desTwo.textContent = planFeatureHoldArray[2].tagline;
  $desThree.textContent = planFeatureHoldArray[3].tagline;
  $desFour.textContent = planFeatureHoldArray[4].tagline;
  $desFive.textContent = planFeatureHoldArray[5].tagline;

}


function profileLoad() {
  $profileImage.src = user.profile.imgUrl;
  $profileName.textContent = user.profile.name;
  $profileBio.textContent = user.profile.bio;
  $favPosition.innerHTML = ''
  for (i = 0; i < user.favorites.length; i++) {
    const append = profileDom(user.favorites[i]);
    $favPosition.appendChild(append);
  }
}


window.addEventListener('click', (e) => {

  if (e.target.id === 'planForMe') {
      window.scroll(84, 557);
      window.scroll({ behavior: 'smooth' });
    mealTonight();
  }

  if (e.target.id === 'profileNav' || e.target.id === 'profileBottom') {
    view('profile')
  }

  if (e.target.id === 'planNav' || e.target.id === 'planBottom') {
    view('plan')
  }

  if (e.target.id === 'exploreNav' || e.target.id === 'exploreBottom') {
    view('explore')
  }


  if (e.target.id === 'loadMoreBeers') {
    if(count > 49) {
      e.target.classList.add('d-none');
    }
    loadExplore()
  }

  if(e.target.id === 'planMyFlight') {
    flightRender();
  }

  if (e.target.id === 'editProfileNow') {
    $editProfileCol.classList.remove('hidden');
    $edituserForm.elements.name.value = user.profile.name;
    $edituserForm.elements.url.value = user.profile.imgUrl;
    $edituserForm.elements.bio.value = user.profile.bio;
  }

  if (e.target.id === 'saveUserChanges') {
    $editProfileCol.classList.add('hidden');
    const name = $edituserForm.elements.name.value;
    const imgUrl = $edituserForm.elements.url.value;
    const bio = $edituserForm.elements.bio.value;
    const newInfo = { name, imgUrl, bio };
    user.profile = newInfo;
    $profileImage.src = user.profile.imgUrl;
    $profileName.textContent = user.profile.name;
    $profileBio.textContent = user.profile.bio;

  }


  if(e.target.dataset.click === 'exploreEdit') {
    const infoDivExplore = document.getElementById(e.target.dataset.view);
    if (infoDivExplore.dataset.boolean === 'false') {
      infoDivExplore.classList.remove('hidden');
      infoDivExplore.dataset.boolean = 'true';
      e.target.textContent = 'Less Information'
    } else {
      infoDivExplore.classList.add('hidden');
      infoDivExplore.dataset.boolean = 'false';
      e.target.textContent = 'More Information'
    }
  }


  if (e.target.dataset.click === 'notesEdit') {
    const infoDiv = document.querySelector('[data-beerId="' + e.target.dataset.view + '"]');
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
    const num = e.target.dataset.fav - 1;
    user.favorites.push(random[num]);
    user.favorites[favNum].order = favNum;
    random.splice(num,1);
    favNum++;
    e.target.className = 'fas fa-bookmark small-margin';

  }


  if (e.target.dataset.edit === 'editMe') {
    const notesRow = document.querySelectorAll('[data-notes]');
    const editNotesRow = document.querySelectorAll('[data-input]');
    const form = document.querySelectorAll('[data-form]');

    for (let i = 0; i < form.length; i++) {
      if (notesRow[i] === e.target.dataset.find)
        notesRow[i].classList.add('hidden');
      editNotesRow[i].classList.remove('hidden');

    }
  }

  if (e.target.dataset.submit === 'save') {
    const num = e.target.dataset.sub;
    const notesRow = document.querySelectorAll('[data-notes]');
    const editNotesRow = document.querySelectorAll('[data-input]');
    const updateNotes = document.querySelectorAll('[data-update]');
    const form = document.querySelectorAll('[data-form]');
    for (let i = 0; i < notesRow.length; i++) {
      if (notesRow[i].dataset.notes === e.target.dataset.pick) {
        user.favorites[num].notes = form[i].elements.notes.value;
        notesRow[i].classList.remove('hidden');
        editNotesRow[i].classList.add('hidden');
        updateNotes[i].textContent = form[i].elements.notes.value;
      }
    }
  }





})


window.addEventListener('DOMContentLoaded', (e) => {

  if (user.profile.name === '') {
    view('welcome')
  } else {
    view('profile');
  }

  randomBeers();

  for (let i = 0; i < 6; i++) {
    planFeatureHold();
  }


})




document.addEventListener('submit', (e) => {
  e.preventDefault();
  const imgUrl = $signForm.elements.url.value;
  const name = $signForm.elements.name.value;
  const bio = $signForm.elements.bio.value;
  user.profile = { name, imgUrl, bio };
  if (e.target.id === 'signForm') {
    view('explore');
  }

  window.scroll(0, 0);
  window.scroll({ behavior: 'smooth' });


})
