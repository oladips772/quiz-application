//// getting all reqired elements  
const startBtn = document.querySelector(".start-btn button");
infoBox = document.querySelector(".info-box");
exitBtn = document.querySelector(".buttons .quit");
continueBtn = document.querySelector(".buttons .restart");
quizBox = document.querySelector(".quiz-box");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const timeline = quizBox.querySelector("header .time-line");
const timeOff = quizBox.querySelector("header .time-text");


const optionList = document.querySelector(".options-list");


//// if start button is clicked                                                                               
startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo"); //// show the quiz info box
}
/// when exit button clicked
exitBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); /// hide info box and show start quiz button
}
//// when continue buttons get clicked
continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo");  /// show quiz box and hide hide info button
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    quizCounter(1);
    startTimer(15);
    startTimerLine(0);
}


let quizCount = 0;
let quizNumber = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .restart")
const quitQuiz = resultBox.querySelector(".buttons .quit")

restartQuiz.onclick = ()=>{ 
quizBox.classList.add("activeQuiz");
resultBox.classList.remove("activeResult");
// let quizCount = 0;
// let quizNumber = 1;
// let timeValue = 15;
// let widthValue = 0;
// let userScore = 0;
// showQuestions(quizCount);
// quizCounter(quizNumber);
// clearInterval(counter);
// startTimer(timeValue);
// clearInterval(counterLine);
// startTimerLine(widthValue);
// quizCount++;
// quizNumber++;
// nextBtn.style.display = "none";
// timeOff.textContent = "Time left";
window.location.reload();
}

quitQuiz.onclick = ()=>{
   window.location.reload();
}

//// if next btn is clicked in the puzzle
nextBtn.onclick = ()=>{
   if (quizCount < questions.length - 1){
       quizCount++;
       quizNumber++;
       showQuestions(quizCount);
       quizCounter(quizNumber);
       clearInterval(counter);
       startTimer(timeValue);
       clearInterval(counterLine);
       startTimerLine(widthValue);
       nextBtn.style.display = "none";
       timeOff.textContent = "Time left";
   }else{
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questions Completed");
    showResultBox();
   }
}

/// getting questions and options with answers from array []
function  showQuestions (index){
    const quizText = document.querySelector(".quiz-text");
    let quizTag = '<span>'+  questions[index].numb + "." + questions[index].question +'</span>';
    let optionTag = '<div class="options">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="options">'+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="options">'+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="options">'+ questions[index].options[3] + '<span></span></div>';
    quizText.innerHTML = quizTag;
    optionList.innerHTML = optionTag;

    const option = optionList.querySelectorAll(".options");
    for (let i = 0; i < option.length; i++) {
       option[i].setAttribute("onclick", "optionSelected(this)");

    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let wrongIcon = '<div class="icon cancel"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[quizCount].answer;
    let allOptions = optionList.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("answer is wrong");
        answer.insertAdjacentHTML("beforeend", wrongIcon);
        /// if is answer is wrong then automatically select the write answer
        for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAns){
            optionList.children[i].setAttribute("class", "options correct");
            optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);

           }
        }
    }

    /// once user select disable other options
    for (let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add("disabled");
    }
    nextBtn.style.display = "block";
}

function showResultBox(){
    infoBox.classList.remove("activeInfo");  /// show quiz box and hide hide info button
    quizBox.classList.remove("activeQuiz");  /// hide quiz box
    resultBox.classList.add("activeResult"); //show result box
    const scoreText = resultBox.querySelector(".score-text");
    if (userScore > 3){
        let scoreTag = '<span>and Congrats, You got  <p>' +userScore+ '</p> out of <p> ' +questions.length + '</p> questions</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice, You got  <p>' +userScore+ '</p> out of <p> ' +questions.length + '</p> questions</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got only <p>' +userScore+ '</p> out of <p> ' +questions.length + '</p> questions</span>';
        scoreText.innerHTML = scoreTag;
    }
}
 
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer (){
        timeCount.textContent = time;
        time--;
        if (time < 9){
          let addZero = timeCount.textContent;
          timeCount.textContent = "0" + addZero;
        }
        if (time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time off";

            let correctAns = questions[quizCount].answer;
            let allOptions  = optionList.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns){
                    optionList.children[i].setAttribute("class", "options correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add("disabled");
        }
            nextBtn.style.display = "block";
        }
    }
}




function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeline.style.width = time + "px";
        if (time > 555){
            clearInterval(counterLine);
        }
    }
}

function quizCounter (index){
    let totalQuizCounter = ' <span><p>'+ index +'</p> out of <p>' + questions.length+'</p> questions</span>';
    const bottomQuizCounter = quizBox.querySelector(".total-quiz");
    bottomQuizCounter.innerHTML = totalQuizCounter;
}