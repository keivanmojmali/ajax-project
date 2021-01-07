/* exported data */


let user = {
  profile: {
    name: '',
    imgUrl: '',
    bio: '',
  },
  favorites: []
};



returningUser = localStorage.getItem('ajax');

if (returningUser !== null) {
  user = JSON.parse(returningUser);
}

window.addEventListener('beforeunload', (e) => {
  localStorage.setItem('ajax', JSON.stringify(user));
})
