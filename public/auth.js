
firebase.auth().onAuthStateChanged(function(users) {
    if (users) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });

  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', createUser);
  
  const signupFeedback = document.querySelector('#feedback-msg-signup');
  const signupModal = new bootstrap.Modal(document.querySelector('#modal-signup'));

  var urname;
  
  function createUser(event) {
    event.preventDefault();
    const email = signupForm['input-email-signup'].value;
    const pwd = signupForm['input-password-signup'].value;
    const myname = signupForm['input-name-signup'].value;
    urname = myname;

    firebase.auth().createUserWithEmailAndPassword(email, pwd)
    .then(() => {
        signupFeedback.style = `color:green`;
        signupFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> Signup Completed.`;
        setTimeout(function(){signupModal.hide()}, 1000);
    })
    .catch((error) => {
        signupFeedback.style = `color:crimson`;
        signupFeedback.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> ${error.message}`;
        signupForm.reset();
    });
    signupForm.reset();
    signupFeedback.innerHTML = ``;

}

const btnCancel = document.querySelectorAll('.btn-cancel').forEach(btn =>{
  btn.addEventListener('click', ()=>{
      signupForm.reset();
      signupFeedback.innerHTML = ``;
      loginForm.reset();
      loginFeedback.innerHTML = ``;
  })
});

var myPix = new Array("assets/profile1.png","assets/profile2.png","assets/profile3.png","assets/profile4.png","assets/profile5.png","assets/profile6.png","assets/profile7.png","assets/profile8.png","assets/profile9.png","assets/profile10.png");


firebase.auth().onAuthStateChanged((user) => {
    console.log('User: ', user);
    setupUI(user);

    const users = firebase.auth().currentUser;
    var randomNum = Math.floor(Math.random() * myPix.length);
    if( users != null){
    var displayName = users.displayName;
    const email = users.email;
    var photoURL = users.photoURL;
    if(displayName == null){
      displayName = email;
      user.updateProfile({
        displayName: urname
      })
    }
    if(photoURL == null){
      photoURL = myPix[randomNum];
      user.updateProfile({
        photoURL: myPix[randomNum]
      })
    }
    document.getElementById('put-img').innerHTML = `<img src="${photoURL}" class="profile-img" id="profile-img" ></img> <p id=name><b>${displayName}<b></p>`;
    }
    console.log(myPix[randomNum])
});

const btnLogout = document.querySelector('#btnLogout');
btnLogout.addEventListener('click', gglogout)//=> {
  //  firebase.auth().signOut();
    //console.log('Logout completed.');
    //signupForm.reset();
    //signupFeedback.innerHTML = ``;
    //loginForm.reset();
    //loginFeedback.innerHTML = ``;
//});
function gglogout(){
    document.getElementById('name').innerHTML = ``;
    document.getElementById('put-img').innerHTML = ``;
    firebase.auth().signOut().then(() => {
        console.log("Log out")
        users.reset();
        signupForm.reset();
        signupFeedback.innerHTML = ``;
        loginForm.reset();
        loginFeedback.innerHTML = ``;
    }).catch((error) => {
        // An error happened.
      });
}

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', loginUserEmail);

function loginUserEmail(event) {
  event.preventDefault();
  const email = loginForm['input-email-login'].value;
  const pwd = loginForm['input-password-login'].value;

  firebase.auth().signInWithEmailAndPassword(email, pwd)
  .then(() => {
      loginFeedback.style = `color:green`;
      loginFeedback.innerHTML = `<i class="bi bi-check-circle-fill"></i> Login successed.`;
      setTimeout(function(){loginModal.hide()}, 1000);
      
  })
  .catch((error) => {
      loginFeedback.style = `color:crimson`;
      loginFeedback.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> ${error.message}`;
      loginForm.reset();
  });
}

const loginFeedback = document.querySelector('#feedback-msg-login');
const loginModal = new bootstrap.Modal(document.querySelector('#modal-login'));

function start(event){
  event.preventDefault();
  location.href = 'gameplay.html'; 
  console.log('Start');
}

var provider = new firebase.auth.GoogleAuthProvider();
// Login
const btnLogin = document.querySelector('#btnLogin');
btnLogin.addEventListener('click', loginUser);

//const loginFeedback = document.querySelector('#feedback-msg-login');
//const loginModal = new bootstrap.Modal(document.querySelector('#modal-login'));

function loginUser() {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
const logoutItems = document.querySelectorAll('.logged-out');
const loginItems = document.querySelectorAll('.logged-in');

function setupUI(user){
    if (user) {
        loginItems.forEach(item => item.style.display = 'inline-block');
        logoutItems.forEach(item => item.style.display = 'none');
    } 
    else {
        loginItems.forEach(item => item.style.display = 'none');
        logoutItems.forEach(item => item.style.display = 'inline-block');
    }
}
