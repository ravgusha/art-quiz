let startScr = document.getElementById('startScreen');
let settingsScr = document.getElementById('settingsScreen');
let artistsScr = document.getElementById('artistsScreen');
let picturesScr = document.getElementById('picturesScreen');
let questScr = document.getElementById('questionScreen');
let scoreScr = document.getElementById('scoreScreen');

let artistQuizBtn = document.getElementById('artistsQuiz');
let picturesQuizBtn = document.getElementById('picturesQuiz');

let settingsBtn = document.getElementById('headerSettings');
let artSettingsBtn = document.getElementById('artistSettings');
let picSettingsBtn = document.getElementById('picturesSettings');
let settigsBackBtn = document.getElementById('settingsBack');


// console.log(startScr, settingsScr, settingsBtn, settigsBackBtn)

// КНОПКИ
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

// ОКРАШИВАНИЕ ИНПУТА В НАСТРОЙКАХ
document.getElementById("myinput").oninput = function () {
    var value = (this.value - this.min) / (this.max - this.min) * 100
    this.style.background = 'linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ' + value + '%, #fff ' + value + '%, white 100%)'
};


// ГЕНЕРАЦИЯ ВОПРОСОВ
let allQuestions;
let isRight;
let count = 0;

async function getImages() {
    let images = './js/images.json';
    const res = await fetch(images);
    const data = await res.json();

    allQuestions = JSON.parse(JSON.stringify(data));

    const artistQuestions = [];
    const picturesQuestions = [];

    artistQuestions.push(allQuestions.pictures.slice(0, 120));
    picturesQuestions.push(allQuestions.pictures.slice(120, 240)); // Разбираем массив

}

getImages();


let questTemp = document.getElementById('questionMain');
let questionNumber; // Номер вопроса
let answers = [];


const categoriesArray = ['portArt', 'landArt', 'stillArt', 'graphArt', 'antArt', 'intArt', 'renArt', 'surArt', 'kitArt', 'minArt', 'avanArt', 'indArt',
    'portPic', 'landPic', 'stillAPic', 'graphPic', 'antPic', 'intPic', 'renPic', 'surPic', 'kitPic', 'minPic', 'avanPic', 'indPic'
];

function startQuiz(category) {


    // Определяем номер первого вопроса в каждой категории
    let index = categoriesArray.indexOf(category);

    questionNumber = index !== -1 ? index * 10 : 0;
    console.log(questionNumber)
}

function displayQuestionAndAnswers(questionNumber) {
    // console.log(questionNumber, currentCategory)

    // Получаем правильный ответ
    rightAnswerAuthor = allQuestions.pictures[questionNumber].author;
    rightAnswerName = allQuestions.pictures[questionNumber].name;
    rightAnswerYear = allQuestions.pictures[questionNumber].year;
    // rightAnswerPicture = `<img class="question__image" id="questImg" src="./assets/images/pictures/${questionNumber}.jpg" alt=""></img>`


    // Перемешиваем варианты ответов, чтобы правильный не всегда был первым
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    // Отображаем вопрос
    if (currentCategory.includes('Art')) {
        artistsScr.classList.add('hide');
        questScr.classList.remove('hide');

        answers.push(rightAnswerAuthor);

        // Генерируем 3 неправильных ответа
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 240);
            let answer = allQuestions.pictures[random].author;
            if (answer === rightAnswerAuthor) {
                answer = allQuestions.pictures[random + 1].author;
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
        picturesScr.classList.add('hide');
        questScr.classList.remove('hide');

        answers.push(questionNumber);

        // Генерируем 3 неправильных ответа
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 240);
            if (random === questionNumber) {
                random = random + 1;
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
    //  Готовим попап с правильным ответом
    answerPopupCont.innerHTML = `<img class="answer__image" id="ansImg" src="./assets/images/pictures/${questionNumber}.jpg" alt="">
    <img class="answer__icon" id="answerIcon"src="./assets/images/${isRight}.png">
    <p class="answer__name">${rightAnswerName}</p>
    <p class="answer__author">${rightAnswerAuthor},  ${rightAnswerYear}</p>
    <button class="answer__next" id="nextBtn">Next</button>
    `

}

let rightAnswerAuthor;
let rightAnswerName;
let rightAnswerYear;

let allAnswers = document.getElementById('allAnswers');
let answerPopupCont = document.getElementById('answPopupCont')
let answerPopup = document.getElementById('answPopup')
let scrPopupCont = document.getElementById('scorePopupCont');



// ПОЛУЧАЕМ ВЫБРАННЫЙ ПОЛЬЗОВАТЕЛЕМ ВАРИАНТ ОТВЕТА И ПЕРЕХОДИМ К СЛЕД.ВОПРОСУ
document.querySelector('body').addEventListener('click', function (event) {
    // console.log(questionNumber)

    let target = event.target;
    // console.log(target);
    // Получаем текст ответа
    if (target.parentElement.classList.contains('allAnswers')) {
        let chosenAnswer = target.textContent;
        if (chosenAnswer === rightAnswerAuthor) {
            isRight = 'right';
            localStorage.setItem([currentCategory] + questionNumber, 'grayscale(100%)')
            count++;
        } else {
            isRight = 'wrong';
            localStorage.setItem([currentCategory] + questionNumber, null)
        }
        document.getElementById('answerIcon').src = `./assets/images/${isRight}.png`;
        answerPopup.style.left = '0';

    }

    if (target.parentElement.classList.contains('allPictures')) {
        let chosenAnswer = target.getAttribute('data-num');
        console.log(chosenAnswer)
        console.log(questionNumber)
        if (chosenAnswer == questionNumber) {
            isRight = 'right';
            localStorage.setItem([currentCategory] + questionNumber, 'grayscale(100%)')
            count++;
        } else {
            isRight = 'wrong';
            localStorage.setItem([currentCategory] + questionNumber, null)
        }
        document.getElementById('answerIcon').src = `./assets/images/${isRight}.png`;
        answerPopup.style.left = '0';

    }


    if (target.classList.contains('answer__next')) {
        console.log(questionNumber, currentCategory)
        // Заканчиваем, если вопрос последний в категории
        if (questionNumber % 10 == 9) {
            answerPopup.style.left = '-600px';
            displayScore();
            // Переходим к следующему вопросу
        } else {
            questionNumber++;
            // console.log(questionNumber);
            answerPopup.style.left = '-600px';
            displayQuestionAndAnswers(questionNumber);
            answers = [];
            // console.log(questionNumber);
        }
    }

    function displayScore() {
        console.log(currentCategory)
        scrPopup.style.left = '0';
        document.getElementById('endScore').innerHTML = `${count}/10`;
        document.getElementById(`${currentCategory}`).innerHTML = `${count}/10`;
        document.getElementById(`${currentCategory}`).parentElement.classList.remove('grey');
        document.getElementById(`${currentCategory}`).parentElement.querySelector('.category__results').classList.remove('hide')

        // console.log(document.getElementById(' + currentCategory + '))
    }

    // Переход с экрана результатов на главный экран
    document.getElementById('scoreHomeBtn').addEventListener('click', () => {
        questScr.classList.add('hide');
        startScr.classList.remove('hide');
        scrPopup.style.left = '-600px';
        count = 0;
    })

    // Переход с экрана результатов на экран выбора категории
    document.getElementById('nextQuizBtn').addEventListener('click', () => {
        if (currentCategory.includes('Pic')) {
            picturesScr.classList.remove('hide');
            questScr.classList.add('hide');
        } else if (currentCategory.includes('Art')) {
            artistsScr.classList.remove('hide');
            questScr.classList.add('hide');
        }

        scrPopup.style.left = '-600px';
        count = 0;
    })

});


let allCategoriesArt = document.getElementById('artCtgrs');
let allCategoriesPic = document.getElementById('picCtgrs');
let currentCategory;

// ПОЛУЧАЕМ НАЗВАНИЕ КАТЕГОРИЙ

allCategoriesArt.addEventListener('click', getCategory);
allCategoriesPic.addEventListener('click', getCategory);


function getCategory(event) {
    // Получаем элемент, по которому произошел клик
    let target = (event.target);
    // Получаем его атрибут(название категории)
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
        console.log(element)
        let fullCategoryName = element.getAttribute('data-fullcat');


        scoreScr.innerHTML = `
        <div class="score__header">
            <img class="logo score__logo" src="./assets/images/logo.svg" alt="logo">
            <button class="settings__back score__back" id="scoreBack"></button>
            <p class="score__category">${fullCategoryName}</p>
            
        </div>
        <div class="score__images allScoreImages" id="allScoreImages">
            <img class="score__image" style=${localStorage.getItem([category] + questionNumber)} id="scrImg "src="./assets/images/pictures/${questionNumber}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+1}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+2}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+3}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+4}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+5}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+6}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+7}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+8}.jpg">
            <img class="score__image" id="scrImg "src="./assets/images/pictures/${questionNumber+9}.jpg">
            </div>`


        var scoreImages = document.getElementsByClassName("score__image");

        // Отделяем цветом угаданные картины
        let max = questionNumber + 9;
        console.log(questionNumber, max)
        Array.from(scoreImages).forEach(function (element) {
            if (localStorage.getItem([category] + questionNumber) != null) {

                console.log([category] + questionNumber)
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