/* exported data */


var user = {
  profile: {
    name: '',
    imgUrl: '',
    bio: '',
  },
  favorites: []
};



returningUser = localStorage.getItem('ajax');

if(returningUser !== null) {
user = JSON.parse(returningUser);
}

window.addEventListener('beforeunload', function(e){
  localStorage.setItem('ajax',JSON.stringify(user));
})
