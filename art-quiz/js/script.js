import images from '../js/images.js'

// Окрашиваем инпут в настройках
document.getElementById("myinput").oninput = function () {
  var value = (this.value - this.min) / (this.max - this.min) * 100
  this.style.background = 'linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ' + value + '%, #fff ' + value + '%, white 100%)'
};

let startScr = document.getElementById('startScreen');
let settingsScr = document.getElementById('settingsScreen');
let artistsScr = document.getElementById('artistsScreen');
let picturesScr = document.getElementById('picturesScreen');

let artistQuizBtn = document.getElementById('artistsQuiz');
let picturesQuizBtn = document.getElementById('picturesQuiz');

let settingsBtn = document.getElementById('headerSettings');
let settigsBackBtn = document.getElementById('settingsBack');
let artSettingsBtn = document.getElementById('artistSettings');
let picSettingsBtn = document.getElementById('picturesSettings');


// console.log(startScr, settingsScr, settingsBtn, settigsBackBtn)

settingsBtn.addEventListener('click', () => {
  settingsScr.style.left = '0';
  document.getElementById('navbar').style.display = 'none';
});

settigsBackBtn.addEventListener('click', () => {
  settingsScr.style.left = '-6000px';
  document.getElementById('navbar').style.display = 'flex';
  document.getElementById('navbar-pic').style.display = 'flex';
});

artSettingsBtn.addEventListener('click', () => {
  settingsScr.style.left = '0';
  document.getElementById('navbar').style.display = 'none';
});

picSettingsBtn.addEventListener('click', () => {
  settingsScr.style.left = '0';
  document.getElementById('navbar-pic').style.display = 'none';
});
// function hideBlock (block1, block2) {
//   block1.classList.toggle('hide');
//   block2.classList.toggle('hide');
// }

artistQuizBtn.addEventListener ('click', () => {
  startScr.classList.toggle('hide');
  artistsScr.classList.toggle('hide');
})

picturesQuizBtn.addEventListener ('click', () => {
  startScr.classList.toggle('hide');
  picturesScr.classList.toggle('hide');
})


