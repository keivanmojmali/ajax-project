/* exported data */


var user = {
  profile: {
    username: '',
    imgUrl: '',
    bio: '',
  },
  favorites = []
};


returningUser = localStorage.getItem('data');
user = JSON.parse(returningUser);


window.addEventListener('beforeunload', function(e){
  localStorage.setItem('data',JSON.stringify(user));
})
