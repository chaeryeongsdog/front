const container = document.getElementById("container");//框框
const answerEl = document.querySelectorAll(".answer");//input
const questionEl = document.getElementById("question");//題目
const a_text = document.getElementById("a-text");//選項內容
const b_text = document.getElementById("b-text");
const c_text = document.getElementById("c-text");
const d_text = document.getElementById("d-text");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const testans = [];
const star = document.getElementById("star");
let currentQuiz = 0; //當前測驗

var quizData =JSON.parse(localStorage.getItem('QUIZ'));
var quizs=[];
for(var i=0 ; i<quizData.length; i++){
    var aa =quizData[i].content.split('%');
    var a = {
      question:aa[0],
      A:aa[1],
      B:aa[2],
      C:aa[3],
      D:aa[4],
      correct:quizData[i].answer
    }
    quizs.push(a);
}
testans.length = quizs.length;
var sideBarContainer = document.getElementById('SideBarContainer');
for (var i=0 ; i<quizs.length;i++){
  var productDiv = document.createElement('div');
  productDiv.innerHTML=`
        <div class="block">
            <span class="num" id="n${i+1}" onclick="changepage('n${i+1}')"></span>
            <span class="opt" id="o${i+1}"></span>
            <img src="../image/Star_fill.png" alt="" id="s${i+1}">
        </div>
  `
  sideBarContainer.appendChild(productDiv);
}

// let quizs = [
//   {
//     question: "1. 下列文句何者有語病？",
//     A: "(A) 他不但才華出眾，而且和藹可親",
//     B: "(B) 幸虧你事先做好準備，否則災情慘重",
//     C: "(C) 原來他有難言之隱，難怪總是愁眉不展",
//     D: "(D) 與其讓你在事後落淚，難道讓你犯錯懊悔",
//     correct: "D",
//   },
// ];

loadnum();
function loadnum() {
  for (var i = 1; i < quizs.length+1; i++) {
    document.getElementById("n"+i).innerHTML = i+".";
  }
}

loadQuiz();
function loadQuiz() {

  let currentQuizData = quizs[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.A;
  b_text.innerText = currentQuizData.B;
  c_text.innerText = currentQuizData.C;
  d_text.innerText = currentQuizData.D;
}

function checkstar(){
  var aab = document.getElementById("s"+(currentQuiz+1));
  if (aab.style.display === "flex"){
    star.checked = true;
  }
  else{
    star.checked = false;
  };
}

function sendStar(){
  var starArray = [];
  for(var i = 1; i < quizs.length+1; i++){
    if(document.getElementById("s"+i).style.display == "flex"){
      starArray.push("Y");
    }
    else{
      starArray.push("N");
    }
  }
  console.log(starArray);
  localStorage.setItem("starArray",starArray);
}

function checkSelected(){
  temp = document.getElementById("o"+(currentQuiz+1)).innerText;
  console.log(temp);
  answerEl.forEach((answerEl) => {
    if(temp == answerEl.id){
      answerEl.checked = true;
    }
  });
}

function deselectAnswer() {
  answerEl.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function getSelected() {
  let answer;
  answerEl.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
      testans[currentQuiz]=answer;
      document.getElementById("o"+(currentQuiz+1)).innerHTML=answer;
    }
  });
  return answer;
}

var correctans = [];

function correctans123() {
  for(var i = 0; i < quizs.length; i++){
    currentQuiz = i;
    let currentQuizData = quizs[currentQuiz];
    correctans.push(currentQuizData.correct);
  }
  if(correctans.length > quizs.length){
    correctans.length = quizs.length;
  }
};

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if(currentQuiz <= quizs.length - 1){
  loadQuiz();
  checkstar();
  deselectAnswer();
  checkSelected();
  }
  else if(currentQuiz == quizs.length){
    correctans123();
    if(quizs.length == correctans.length){    
    console.log(correctans);
    var anstemp = JSON.stringify(testans);
    localStorage.setItem("correctans",JSON.stringify(correctans));
    localStorage.setItem("testans",anstemp);
    window.location.href = "../html/result.html";
    sendStar();
    }
    else{
      alert('未作答完畢')
    }
  };
  if (currentQuiz == quizs.length - 1){
    document.getElementById("next").innerHTML="交卷"
  }
  else{
    document.getElementById("next").innerHTML="下一題"
  };
})

backBtn.addEventListener("click", () => {
  currentQuiz--;
  checkstar();
  deselectAnswer();
  checkSelected();
  if (currentQuiz <= quizs.length - 1){
    document.getElementById("next").innerHTML="下一題"
  }
});

star.addEventListener("click", () => {
  if(star.checked){
    document.getElementById("s"+(currentQuiz+1)).style.display="flex";
  }
  else{
    document.getElementById("s"+(currentQuiz+1)).style.display="none";
  }
})

// setblock();
// function setblock(){
//   for(var i = 1; i < quizs.length+1; i++){
//     document.getElementById("n"+i).style.height="50px";
//   }
// }

const Abutton = document.getElementById("A");
const Bbutton = document.getElementById("B");
const Cbutton = document.getElementById("C");
const Dbutton = document.getElementById("D");

Abutton.addEventListener("click", () =>{
  getSelected();
})
Bbutton.addEventListener("click", () =>{
  getSelected();
})
Cbutton.addEventListener("click", () =>{
  getSelected();
})
Dbutton.addEventListener("click", () =>{
  getSelected();
})

function changepage(elementId){
  var numberPart = elementId.slice(1);
  var ans = parseInt(numberPart, 10);
  getquizById(ans);
  checkstar();
  deselectAnswer();
  checkSelected();
}

function getquizById(ans) {
  currentQuiz = ans-1;
  let currentQuizData = quizs[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.A;
  b_text.innerText = currentQuizData.B;
  c_text.innerText = currentQuizData.C;
  d_text.innerText = currentQuizData.D;
  if(currentQuiz >= quizs.length - 1){
    document.getElementById("next").innerHTML="交卷"
  }
  else{
    document.getElementById("next").innerHTML="下一題"
  };
};



document.addEventListener('DOMContentLoaded',function(){
  var token = localStorage.getItem('JwtToken');
  var userInfo = localStorage.getItem('userInfo');
  const login = document.getElementById("login");
  const register = document.getElementById("register");

  if(userInfo){
      var user = JSON.parse(userInfo);

      if(login) login.style.display = 'none';
      if(register) register.style.display ='none';
      document.getElementById('userid').innerHTML=("歡迎:")+user.account;
      // localStorage.removeItem('userInfo');
      // localStorage.removeItem('JwtToken');
  }

});