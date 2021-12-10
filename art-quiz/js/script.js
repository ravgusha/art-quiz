let startScr = document.getElementById('startScreen');
let settingsScr = document.getElementById('settingsScreen');
let artistsScr = document.getElementById('artistsScreen');
let picturesScr = document.getElementById('picturesScreen');
let questScr = document.getElementById('questionScreen');
let scoreScr = document.getElementById('scoreScreen');
let scrPopup = document.getElementById('scrPopup');

let artistQuizBtn = document.getElementById('artistsQuiz');
let picturesQuizBtn = document.getElementById('picturesQuiz');

let settingsBtn = document.getElementById('headerSettings');
let artSettingsBtn = document.getElementById('artistSettings');
let picSettingsBtn = document.getElementById('picturesSettings');
let settigsBackBtn = document.getElementById('settingsBack');

// BUTTONS

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

artistQuizBtn.addEventListener('click', () => {
    startScr.classList.toggle('hide');
    artistsScr.classList.toggle('hide');
})

picturesQuizBtn.addEventListener('click', () => {
    startScr.classList.toggle('hide');
    picturesScr.classList.toggle('hide');
})

let homeBtn = document.getElementById('navbarHome');
let homeBtn1 = document.getElementById('navbarHome1');

homeBtn.addEventListener('click', () => {
    artistsScr.classList.toggle('hide');
    startScr.classList.toggle('hide');
})

homeBtn1.addEventListener('click', () => {
    picturesScr.classList.toggle('hide');
    startScr.classList.toggle('hide');
})

// QUESTION GENERATION

let allQuestions;
let isRight = false;
let count = 0;

let categoryQuanityOfQuestions = 120;

async function getImages() {
    let images = './js/images.json';
    const res = await fetch(images);
    const data = await res.json();

    allQuestions = JSON.parse(JSON.stringify(data));

    const artistQuestions = [];
    const picturesQuestions = [];

    artistQuestions.push(allQuestions.pictures.slice(0, categoryQuanityOfQuestions));
    picturesQuestions.push(allQuestions.pictures.slice(categoryQuanityOfQuestions, allQuestions.length)); // Parsing the array
}

getImages();

let questTemp = document.getElementById('questionMain');
let questionNumber; // Question number
let answers = [];
let prevScreen;

const categoriesArray = ['portArt', 'landArt', 'stillArt', 'graphArt', 'antArt', 'intArt', 'renArt', 'surArt', 'kitArt', 'minArt', 'avanArt', 'indArt',
    'portPic', 'landPic', 'stillAPic', 'graphPic', 'antPic', 'intPic', 'renPic', 'surPic', 'kitPic', 'minPic', 'avanPic', 'indPic'
];

function startQuiz(category) {
    // Find the number of the first question in each category
    let index = categoriesArray.indexOf(category);

    questionNumber = index !== -1 ? index * 10 : 0;
}

function displayQuestionAndAnswers(questionNumber) {
    // Get the right answer
    rightAnswerAuthor = allQuestions.pictures[questionNumber].author;
    rightAnswerName = allQuestions.pictures[questionNumber].name;
    rightAnswerYear = allQuestions.pictures[questionNumber].year;

    // Shuffle the answers so that the right one is not always first
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    // Display question
    if (currentCategory.includes('Art')) {
        prevScreen = artistsScr;
        artistsScr.classList.add('hide');
        questScr.classList.remove('hide');

        if (isTimeGame) {
            clearInterval(countdownTimer);
            createProgressbar('progressbar', currentSeconds.value);

            seconds = currentSeconds.value;
            countdownTimer = setInterval(GameTimer, 1000);
        }

        answers.push(rightAnswerAuthor);

        // Generate 3 wrong answers
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 240);
            let answer = allQuestions.pictures[random].author;
            if (answer === rightAnswerAuthor) {
                random = Math.floor(Math.random() * 240);
                answer = allQuestions.pictures[random].author;
            }
            answers.push(answer);
            shuffle(answers);
        }

        questTemp.innerHTML = `<div class="question__title">Кто автор данной картины?</div>
        <img class="question__image" id="questImg" src="./assets/images/pictures/${questionNumber}.jpg" alt="">
        <div class="question__answers allAnswers" id="allAnswers">
        <p class="answer" id="answer1">${answers[0]}</p>
        <p class="answer" id="answer2">${answers[1]}</p>
        <p class="answer" id="answer3">${answers[2]}</p>
        <p class="answer" id="answer4">${answers[3]}</p>
        </div>`;
    }

    if (currentCategory.includes('Pic')) {
        prevScreen = picturesScr;
        picturesScr.classList.add('hide');
        questScr.classList.remove('hide');

        if (isTimeGame) {
            createProgressbar('progressbar', currentSeconds.value);
            clearInterval(countdownTimer);
            seconds = currentSeconds.value;
            countdownTimer = setInterval(GameTimer, 1000);
        }

        answers.push(questionNumber);

        // Generate 3 wrong answers
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 240);
            if (random === questionNumber) {
                random = random = Math.floor(Math.random() * 240);
            }
            answers.push(random);
            shuffle(answers);
        }

        questTemp.innerHTML = ` <div class="question__title">${rightAnswerAuthor} - автор какой из картин? </div>
        <div class="question__pictures allPictures" id="allPictures">
        <img class="question__picture" id="questPic" data-num=${answers[0]} src="./assets/images/pictures/${answers[0]}.jpg" alt="">
        <img class="question__picture" id="questPic" data-num=${answers[1]} src="./assets/images/pictures/${answers[1]}.jpg" alt="">
        <img class="question__picture" id="questPic" data-num=${answers[2]} src="./assets/images/pictures/${answers[2]}.jpg" alt="">
        <img class="question__picture" id="questPic" data-num=${answers[3]} src="./assets/images/pictures/${answers[3]}.jpg" alt="">
        </div>`;
    }
    //  Prepare popup with right answer
    answerPopupCont.innerHTML = `<img class="answer__image" id="ansImg" src="./assets/images/pictures/${questionNumber}.jpg" alt="">
    <img class="answer__icon" id="answerIcon"src="./assets/images/${isRight}.png">
    <p class="answer__name">${rightAnswerName}</p>
    <p class="answer__author">${rightAnswerAuthor},  ${rightAnswerYear}</p>
    <button class="answer__next" id="nextBtn">Next</button>`
}

let rightAnswerAuthor;
let rightAnswerName;
let rightAnswerYear;

let answerPopupCont = document.getElementById('answPopupCont')
let answerPopup = document.getElementById('answPopup')

let audioRight = document.getElementById('audioRight');
let audioWrong = document.getElementById('audioWrong');
let audioComplete = document.getElementById('audioComplete');

// GET THE USER'S SELECTED ANSWER AND GO TO THE NEXT QUESTION

document.querySelector('body').addEventListener('click', function (event) {
    let target = event.target;

    // Get answer text
    if (target.parentElement.classList.contains('allAnswers')) {
        let chosenAnswer = target.textContent;
        if (chosenAnswer === rightAnswerAuthor) {
            isRight = true;
            if (isMute == 'false') {
                audioRight.play();
            }
            localStorage.setItem([currentCategory] + questionNumber, null);
            count++;
        } else {
            isRight = false;
            if (isMute == 'false') {
                audioWrong.play();
            }
            localStorage.setItem([currentCategory] + questionNumber, 'grayscale(100%)');

        }
        clearInterval(countdownTimer);
        document.getElementById('answerIcon').src = `./assets/images/${isRight}.png`;
        answerPopup.style.left = '0';
    }

    if (target.parentElement.classList.contains('allPictures')) {
        let chosenAnswer = target.getAttribute('data-num');

        if (chosenAnswer == questionNumber) {
            isRight = true;
            if (isMute == 'false') {
                audioRight.play();
            }
            localStorage.setItem([currentCategory] + questionNumber, 'grayscale(100%)')
            count++;
        } else {
            isRight = false;
            if (isMute == 'false') {
                audioWrong.play();
            }
            localStorage.setItem([currentCategory] + questionNumber, null)
        }
        clearInterval(countdownTimer);
        document.getElementById('answerIcon').src = `./assets/images/${isRight}.png`;
        answerPopup.style.left = '0';
    }

    if (target.classList.contains('answer__next')) {
        // Finish the game if the question is the last in the category
        if (questionNumber % 10 == 9) {
            answerPopup.style.left = '-6000px';
            displayScore();
            if (isMute == 'false') {
                audioComplete.play();
            }
            // Go to the next question
        } else {
            questionNumber++;
            answerPopup.style.left = '-6000px';
            displayQuestionAndAnswers(questionNumber);
            answers = [];
        }
    }
    // Display the result on the category card 
    function displayScore() {
        scrPopup.style.left = '0';
        document.getElementById('endScore').innerHTML = `${count}/10`;
        document.getElementById(`${currentCategory}`).innerHTML = `${count}/10`;
        document.getElementById(`${currentCategory}`).parentElement.parentElement.classList.remove('grey');
        document.getElementById(`${currentCategory}`).parentElement.parentElement.querySelector('.category__results').classList.remove('hide')

    }

    // Go from the results screen to the main screen
    document.getElementById('scoreHomeBtn').addEventListener('click', () => {
        questScr.classList.add('hide');
        startScr.classList.remove('hide');
        scrPopup.style.left = '-6000px';
        count = 0;
    })

    // Go from the results screen to the category selection screen
    document.getElementById('nextQuizBtn').addEventListener('click', () => {
        if (currentCategory.includes('Pic')) {
            picturesScr.classList.remove('hide');
            questScr.classList.add('hide');
        } else if (currentCategory.includes('Art')) {
            artistsScr.classList.remove('hide');
            questScr.classList.add('hide');
        }

        scrPopup.style.left = '-6000px';
        count = 0;
    })

    var imagesInfo = document.getElementsByClassName("score__item");

    Array.from(imagesInfo).forEach(function (element) {
        element.addEventListener('click', () => {
            element.lastChild.previousElementSibling.classList.remove('hide');
        })
    })
});

let allCategoriesArt = document.getElementById('artCtgrs');
let allCategoriesPic = document.getElementById('picCtgrs');
let currentCategory;

// GET CATEGORY NAMES

allCategoriesArt.addEventListener('click', getCategory);
allCategoriesPic.addEventListener('click', getCategory);

function getCategory(event) {
    // Get clicked element
    let target = (event.target);
    // Get its attribute (category name)
    currentCategory = target.parentElement.getAttribute('data-cat');
    startQuiz(currentCategory);
    displayQuestionAndAnswers(questionNumber);
}

var results = document.getElementsByClassName("category__results");

Array.from(results).forEach(function (element) {
    let category = element.parentElement.getAttribute('data-cat');

    element.addEventListener('click', function myFunction(event) {
        scoreScr.classList.remove('hide');
        artistsScr.classList.add('hide');
        picturesScr.classList.add('hide');

        event.stopPropagation();

        let index = categoriesArray.indexOf(category);

        questionNumber = index !== -1 ? index * 10 : 0;

        let fullCategoryName = element.getAttribute('data-fullcat');

        scoreScr.innerHTML = `
        <div class="score__header">
            <img class="logo score__logo" src="./assets/images/logo.svg" alt="logo">
            <button class="settings__back score__back" id="scoreBack"></button>
            <p class="score__category">${fullCategoryName}</p>
            
        </div>
        <div class="score__images allScoreImages" id="allScoreImages">
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+1}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+1].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+1].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+1].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+2}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+2].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+2].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+2].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+3}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+3].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+3].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+3].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+4}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+4].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+4].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+4].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+5}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+5].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+5].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+5].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+6}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+6].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+6].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+6].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+7}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+7].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+7].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+7].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+8}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+8].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+8].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+8].year}</p>
            </div>
        </div>
        <div class="score__item">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+9}.jpg">
            <div class="image__info hide">
                <p class="image__name">${allQuestions.pictures[questionNumber+9].name}</p>
                <p class="image__author">${allQuestions.pictures[questionNumber+9].author}</p>
                <p class="image__year">${allQuestions.pictures[questionNumber+9].year}</p>
            </div>
        </div>
        </div>`

        var scoreImages = document.getElementsByClassName("score__image");

        // Color guessed pictures
        let max = questionNumber + 9;

        Array.from(scoreImages).forEach(function (element) {
            if (localStorage.getItem([category] + questionNumber) != null) {

                element.style.filter = localStorage.getItem([category] + questionNumber);
                questionNumber++;
            }
        })

        document.getElementById('scoreBack').addEventListener('click', () => {
            scoreScr.classList.add('hide');
            if (currentCategory.includes('Art')) {
                artistsScr.classList.remove('hide');
            } else {
                picturesScr.classList.remove('hide');
            }
        })
    })
});



// MUTE

let isMute = localStorage.getItem('isMute') || 'false';

document.getElementById('mute').addEventListener('click', () => {
    if (isMute == false) {
        document.getElementById('mute').style.backgroundImage = 'url(./assets/images/volume-off.png)';
        isMute = true;
        audioWrong.muted == true;
        audioRight.muted == true;
        audioComplete.muted == true;
        localStorage.setItem('isMute', true);
    } else {
        isMute = false;
        document.getElementById('mute').style.backgroundImage = 'url(./assets/images/volume-on.png)';
        audioWrong.muted == false;
        audioRight.muted == false;
        audioComplete.muted == false;
        localStorage.setItem('isMute', false);
    }
})

//  MOVE THE VOLUME

let volume = document.getElementById("myinput");
volume.value = localStorage.getItem('volume');

function setVolume() {
    audioWrong.volume = volume.value;
    audioRight.volume = volume.value;
    audioComplete.volume = volume.value;
    localStorage.setItem('volume', volume.value);
}

// TIMER

let currentSeconds = document.getElementById('timeCount');
currentSeconds.value = localStorage.getItem('currentSeconds') || 15;

var isWaiting = false;
var isRunning = false;
var seconds = currentSeconds.value;
var countdownTimer;

function GameTimer() {
    var minutes = Math.round((seconds - 30) / 60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('progressTime').innerHTML = minutes + ":" + remainingSeconds;
    if (seconds == 1) {
        isRunning = true;
        isRight = false;
        if (isMute == 'false') {
            audioWrong.play();
        }
        answerPopup.style.left = '0';
        localStorage.setItem([currentCategory] + questionNumber, null);
        seconds = currentSeconds.value;
        clearInterval(countdownTimer);
    } else {

        isWaiting = true;
        seconds--;
    }
}

let isTimeGame = localStorage.getItem('isTimeGame');
if (localStorage.getItem('isTimeGame') == 'false') {
    document.getElementById('timeSwitcher').checked = false;
    document.getElementById('headerTime').style.opacity = 0;
    isTimeGame = false;
} else {
    document.getElementById('timeSwitcher').checked = true;
    isTimeGame = true;

}

document.getElementById('timeSwitcher').addEventListener('click', () => {
    if (isTimeGame) {
        isTimeGame = false;
        document.getElementById('headerTime').style.opacity = 0;
        localStorage.setItem('isTimeGame', isTimeGame)
    } else {
        isTimeGame = true;
        localStorage.setItem('isTimeGame', isTimeGame)
    }
})

// SETTING THE GAME TIME IN THE SETTINGS

document.getElementById('minus').addEventListener('click', event => {
    event.preventDefault();
    const currentValue = Number(currentSeconds.value) || 0;
    currentSeconds.value = currentValue - 5;
    if (currentSeconds.value < 0) currentSeconds.value = 0;
    localStorage.setItem('currentSeconds', currentSeconds.value);
});

document.getElementById('plus').addEventListener('click', event => {
    event.preventDefault();
    const currentValue = Number(currentSeconds.value) || 0;
    currentSeconds.value = currentValue + 5;
    if (currentSeconds.value > 30) currentSeconds.value = 30;
    localStorage.setItem('currentSeconds', currentSeconds.value);
});

// TIMER PROGRESS BAR

function createProgressbar(id, duration) {
    var progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';

    var progressbarinner = document.querySelector('.inner');
    progressbarinner.style.animationDuration = duration + 's';
    progressbar.appendChild(progressbarinner);

    progressbarinner.style.animationPlayState = 'running';
}

// GOING BACK DURING THE GAME

document.getElementById('exit').addEventListener('click', () => {
    prevScreen.classList.remove('hide');
    questScr.classList.add('hide');
    clearInterval(countdownTimer);
})