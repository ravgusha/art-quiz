let startScr = document.getElementById('startScreen');
let settingsScr = document.getElementById('settingsScreen');
let artistsScr = document.getElementById('artistsScreen');
let picturesScr = document.getElementById('picturesScreen');

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
// function hideBlock (block1, block2) {
//   block1.classList.toggle('hide');
//   block2.classList.toggle('hide');
// }

artistQuizBtn.addEventListener('click', () => {
    startScr.classList.toggle('hide');
    artistsScr.classList.toggle('hide');
})

picturesQuizBtn.addEventListener('click', () => {
    startScr.classList.toggle('hide');
    picturesScr.classList.toggle('hide');
})

let homeBtn = document.getElementById('navbarHome');
homeBtn.addEventListener('click', () => {
    artistsScr.classList.toggle('hide');
    startScr.classList.toggle('hide');
})

// ОКРАШИВАНИЕ ИНПУТА В НАСТРОЙКАХ
document.getElementById("myinput").oninput = function () {
    var value = (this.value - this.min) / (this.max - this.min) * 100
    this.style.background = 'linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ' + value + '%, #fff ' + value + '%, white 100%)'
};


// ГЕНЕРАЦИЯ ВОПРОСОВ

let portArt = [];
let landArt = [],
    stillArt = [],
    graphArt = [],
    antArt = [],
    intArt = [],
    renArt = [],
    surArt = [],
    minArt = [],
    kitArt = [],
    avanArt = [],
    indArt = [];

let allQuestions;

async function getImages() {
    let images = './js/images.json';
    const res = await fetch(images);
    const data = await res.json();

    allQuestions = JSON.parse(JSON.stringify(data));

    const artistQuestions = [];
    const picturesQuestions = [];

    artistQuestions.push(allQuestions.pictures.slice(0, 120));
    picturesQuestions.push(allQuestions.pictures.slice(120, 240)); // Разбираем массив
    console.log(artistQuestions, picturesQuestions)

    // portArt.push(allQuestions.pictures.slice(0, 10));
    // landArt.push(allQuestions.pictures.slice(10, 20));
    // stillArt.push(allQuestions.pictures.slice(20, 30));
    // graphArt.push(allQuestions.pictures.slice(30, 40));
    // antArt.push(allQuestions.pictures.slice(40, 50));
    // intArt.push(allQuestions.pictures.slice(50, 60));
    // renArt.push(allQuestions.pictures.slice(60, 70));
    // surArt.push(allQuestions.pictures.slice(70, 80));
    // kitArt.push(allQuestions.pictures.slice(80, 90));
    // minArt.push(allQuestions.pictures.slice(90, 100));
    // avanArt.push(allQuestions.pictures.slice(100, 110));
    // indArt.push(allQuestions.pictures.slice(110, 120));

    // const portPic = allQuestions.pictures.slice(120, 130);
    // const landPic = allQuestions.pictures.slice(130, 140);
    // const stillPic = allQuestions.pictures.slice(140, 150);
    // const impPic = allQuestions.pictures.slice(150, 160);
    // const expPic = allQuestions.pictures.slice(160, 170);
    // const avantPic = allQuestions.pictures.slice(170, 180);
    // const renPic = allQuestions.pictures.slice(180, 190);
    // const surPic = allQuestions.pictures.slice(290, 200);
    // const kitPic = allQuestions.pictures.slice(200, 210);
    // const minPic = allQuestions.pictures.slice(210, 220);
    // const intPic = allQuestions.pictures.slice(220, 230);
    // const nudePic = allQuestions.pictures.slice(230, 240);


    // console.log(allQuestions)
    // 

    // function chunkArray(arr, chunk_size) {
    //   var index = 0;
    //   var arrayLength = arr.length;


    //   for (index = 0; index < arrayLength; index += chunk_size) {
    //     myChunk = myArray.slice(index, index + chunk_size);
    //     // Do something if you want with the group
    //     tempArray.push(myChunk);
    //   }

    //   console.log(tempArray);
    // }
    // chunkArray(allQuestions, 10)

}
let idd = 0;
// console.log(portArt)
// console.log(portArt.idd)
getImages();

let questScr = document.getElementById('questionScreen');
let questTemp = document.getElementById('questionMain');

async function startQuiz(category) {
    artistsScr.classList.toggle('hide');
    questScr.classList.toggle('hide');
    console.log(category)
    console.log(allQuestions);

    let questionNumber;
    if (category === 'portArt') {
        questionNumber = 0;
    } else if (category === 'landArt') {
        questionNumber = 10;
    } else if (category === 'stillArt') {
        questionNumber = 20;
    } else if (category === 'graphArt') {
        questionNumber = 30;
    } else if (category === 'antArt') {
        questionNumber = 40;
    } else if (category === 'intArt') {
        questionNumber = 50;
    } else if (category === 'renArt') {
        questionNumber = 60;
    } else if (category === 'surArt') {
        questionNumber = 70;
    } else if (category === 'kitArt') {
        questionNumber = 80;
    } else if (category === 'minArt') {
        questionNumber = 90;
    } else if (category === 'avanArt') {
        questionNumber = 100;
    } else if (category === 'indArt') {
        questionNumber = 110;
    }
    let answers = [];

    await getAnswers(questionNumber);
    function getAnswers(questionNumber) {

        // Получаем правильный ответ
        let rightAnswer = allQuestions.pictures[questionNumber].author;
        answers.push(rightAnswer);

        // Генерируем 3 неправильных ответа
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 240);
            let answer = allQuestions.pictures[random].author;
            answers.push(answer);
        }

        // Перемешиваем варианты ответов, чтобы правильный не всегда был первым
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        shuffle(answers);
        console.log(answers)
        return answers;
    }

    console.log(answers)
    if (category.includes('Art')) {
        questTemp.innerHTML = `<div class="question__title">Who is the author of this picture?</div>
    <img class="question__image" id="questImg" src="./assets/images/pictures/${questionNumber}.jpg" alt="">
    <div class="question__answers">
        <p class="answer" id="answer1">${answers[0]}</p>
        <p class="answer" id="answer2">${answers[1]}</p>
        <p class="answer" id="answer3">${answers[2]}</p>
        <p class="answer" id="answer4">${answers[3]}</p>
    </div>`;
    }
    // document.getElementById('questImg').src = './images/';

}





let allCategories = document.getElementById('artCtgrs');
// ПОЛУЧАЕМ НАЗВАНИЕ КАТЕГОРИЙ
allCategories.onclick = (event) => {
    // Получаем элемент, по которому произошел клик
    let target = event.target;
    // Получаем его атрибут(название категории)
    if (target.parentElement.classList.contains('artist__category')) {
        let categoryName = target.parentElement.getAttribute('data-cat');

        startQuiz(categoryName);
    }
}