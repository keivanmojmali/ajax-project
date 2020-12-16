/* exported data */


var user = {
  profile: {
    username: '',
    imgUrl: '',
    bio: '',
  },
  favorites: []
};


returningUser = localStorage.getItem('ajax');
user = JSON.parse(returningUser);


window.addEventListener('beforeunload', function(e){
  localStorage.setItem('ajax',JSON.stringify(user));
})
