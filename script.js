// Select Elements
let countSpan = document.querySelector('.quiz-app .count span')
let bulletsSpansContainer = document.querySelector('.bullets .spans')
let quizArea = document.querySelector('.quiz-area');
let answersArea = document.querySelector('.answers-area');
let submitButton = document.querySelector(".submit-button");
let bulletsElement = document.querySelector('.quiz-app .bullets')
let results = document.querySelector('.results');
let countDownElement = document.querySelector('.countDown')

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countDownIntervral;

function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if(this.readyState === 4 && this.status ===200){
      let questionsObject = JSON.parse(this.responseText)
      let questionsCount = questionsObject.questions.length;

      // Create Bullets + Set Questions  Count
      CreateBullets(questionsCount);
      
      // Add questions Data
      addQuestionData(questionsObject.questions[currentIndex], questionsCount);
      // console.log(questionsObject.questions[currentIndex], questionsCount);
      
      // Start Count Down
      countDown(160,questionsCount);

      // Click on Submit 
      submitButton.onclick = function () {
        // Get Right Answer
        let theRightAnswer = questionsObject.questions[currentIndex].answer;
        // console.log(theRightAnswer);

        // increase index 
        currentIndex++;

        // check the answer
        checkAnswer(theRightAnswer,questionsCount);

        // Empty Previous Questions
        quizArea.innerHTML = '';
        answersArea.innerHTML = '';

        // Add questions Data
        addQuestionData(questionsObject.questions[currentIndex], questionsCount);
        
        //Hendle Bullets Classes
        handelBullets();

        clearInterval(countDownIntervral);
        // Start Count Down
        countDown(160,questionsCount);

        // Show Results
        showResults(questionsCount);
      }
    };;
  };
  myRequest.open('GET','questions.JSON',true);
  myRequest.send();
};
getQuestions() ;

function CreateBullets (num){
  countSpan.innerHTML = num;
  // create spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement('span');
    // Check if its first span
    if (i === 0) {
      theBullet.className = 'on';
    };
    // append bullets to main bullet container 
    bulletsSpansContainer.appendChild(theBullet);
  };
};


function addQuestionData(obj, count){
  if(currentIndex < count){
     // Create H2 Question Title
  let questionTitle =document.createElement('h2');
  // create question text 
  let questionText = document.createTextNode(obj.question)
  // append text to H2 title
  questionTitle.appendChild(questionText)
  // append H2 to  quiz Area
  quizArea.appendChild(questionTitle)
  
  // Create the Answers
  for (let i = 1; i <= 4; i++) {
    // creat Main Answers Div
    let mainDiv = document.createElement('div');
    // Add class to main div
    mainDiv.className = 'answer';
    // create Radio input 
    let radioInput = document.createElement('input');
    // add Attribute Type + name + id = data-Attribute
    radioInput.setAttribute('type','radio');
    radioInput.setAttribute('name','questions');
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer = obj.options[i -1]

    // Make First Option Selected
    if (i === 1) {
      radioInput.checked = true
    }

    // Create Label
    let theLabel = document.createElement('label');
    // add for Attribute
    theLabel.htmlFor = `answer_${i}`;
    // create label text 
    let theLabelText = document.createTextNode(obj.options[i -1])
    // add the text to label
    theLabel.appendChild(theLabelText)

    // append input + label to Main div
    mainDiv.appendChild(radioInput)
    mainDiv.appendChild(theLabel)

    // append Main div to answers Area
    answersArea.appendChild(mainDiv)
  }
  }
}

function checkAnswer(ranswer,count){
  let answer = document.getElementsByName('questions');
  let theChoosenAnswer;
  for (let i = 0; i < answer.length; i++) {
    if(answer[i].checked){
      // 
      theChoosenAnswer = answer[i].dataset.answer;
      //  
    };
  };

  if(ranswer === theChoosenAnswer){
    rightAnswers++;
    console.log("good");
  }
};

function handelBullets(){
  let handelSpan = document.querySelectorAll('.bullets .spans span')
  let arrayOfSpans = Array.from(handelSpan);
  arrayOfSpans.forEach((span,index)=>{
    if(currentIndex === index){
      span.classList.add('on')
    }
  })
}


function showResults(count){
  let theResult;
  if (currentIndex === count) {
    quizArea.remove()
    answersArea.remove()
    submitButton.remove()
    bulletsElement.remove()
    
    if(rightAnswers > count / 2 && rightAnswers < count){
      theResult = `<span class="good">Good</span>,${rightAnswers} From ${count}`;
    } else if (rightAnswers === count){
      theResult = `<span class="perfect">Perfect</span>, All Answers Is perfect`;
    } else {
      theResult = `<span class="bad">Don't be sad. Try to look and read more.</span>, ${rightAnswers} From ${count}`;
    }
    results.innerHTML = theResult;
  };
};

function countDown(duration, count){
  if (currentIndex < count){
    let mainuts,seconds;
    countDownIntervral =setInterval(function() {
      mainuts = parseInt(duration / 60 );
      seconds = parseInt(duration % 60 );

      mainuts = mainuts  < 10 ? `0${mainuts}` : mainuts;
      seconds = seconds  < 10 ? `0${seconds}` : seconds;

      countDownElement.innerHTML = `${mainuts}:${seconds}`;
      if(--duration < 0){
        clearInterval(countDownIntervral);
        submitButton.click();
      }
    }, 1000);
  }
}










