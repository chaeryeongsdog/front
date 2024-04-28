const container = document.getElementById("container");//框框
const answerEl = document.querySelectorAll(".answer");//input
const questionEl = document.getElementById("question");//題目
const a_text = document.getElementById("a-text");//選項內容
const b_text = document.getElementById("b-text");
const c_text = document.getElementById("c-text");
const d_text = document.getElementById("d-text");
const correct = document.getElementById("correct");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const star = document.getElementById("star");
var yes = '../image/Done_round.png';
var wrong = '../image/Close_round.png';
let currentQuiz = 0; //當前測驗
let quizs = [
  {
    question: "1. 下列文句何者有語病？",
    A: "(A) 他不但才華出眾，而且和藹可親",
    B: "(B) 幸虧你事先做好準備，否則災情慘重",
    C: "(C) 原來他有難言之隱，難怪總是愁眉不展",
    D: "(D) 與其讓你在事後落淚，難道讓你犯錯懊悔",
    correct: "D",
  },
  {
    question: "2. 正方形是有角的圖形，這個圖形沒有角，所以，",
    A: "(A) 這個圖形是個圓。",
    B: "(B) 這個圖形是橢圓。",
    C: "(C) 這個圖形不是正方形。",
    D: "(D) 無確切的結論。",
    correct: "C",
  },
  {
    question: "3. 下列文句何者有語病？",
    A: "(A) 他不但才華出眾，而且和藹可親",
    B: "(B) 幸虧你事先做好準備，否則災情慘重",
    C: "(C) 原來他有難言之隱，難怪總是愁眉不展",
    D: "(D) 與其讓你在事後落淚，難道讓你犯錯懊悔",
    correct: "D",
  },
  {
    question: "4. 正方形是有角的圖形，這個圖形沒有角，所以，",
    A: "(A) 這個圖形是個圓。",
    B: "(B) 這個圖形是橢圓。",
    C: "(C) 這個圖形不是正方形。",
    D: "(D) 無確切的結論。",
    correct: "C",
  },
  {
    question: "5. 下列文句何者有語病？",
    A: "(A) 他不但才華出眾，而且和藹可親",
    B: "(B) 幸虧你事先做好準備，否則災情慘重",
    C: "(C) 原來他有難言之隱，難怪總是愁眉不展",
    D: "(D) 與其讓你在事後落淚，難道讓你犯錯懊悔",
    correct: "D",
  },
  {
    question: "6. 正方形是有角的圖形，這個圖形沒有角，所以，",
    A: "(A) 這個圖形是個圓。",
    B: "(B) 這個圖形是橢圓。",
    C: "(C) 這個圖形不是正方形。",
    D: "(D) 無確切的結論。",
    correct: "C",
  },
  {
    question: "7. 下列文句何者有語病？",
    A: "(A) 他不但才華出眾，而且和藹可親",
    B: "(B) 幸虧你事先做好準備，否則災情慘重",
    C: "(C) 原來他有難言之隱，難怪總是愁眉不展",
    D: "(D) 與其讓你在事後落淚，難道讓你犯錯懊悔",
    correct: "D",
  },
  {
    question: "8. 正方形是有角的圖形，這個圖形沒有角，所以，",
    A: "(A) 這個圖形是個圓。",
    B: "(B) 這個圖形是橢圓。",
    C: "(C) 這個圖形不是正方形。",
    D: "(D) 無確切的結論。",
    correct: "C",
  },
  {
    question: "9. 下列文句何者有語病？",
    A: "(A) 他不但才華出眾，而且和藹可親",
    B: "(B) 幸虧你事先做好準備，否則災情慘重",
    C: "(C) 原來他有難言之隱，難怪總是愁眉不展",
    D: "(D) 與其讓你在事後落淚，難道讓你犯錯懊悔",
    correct: "D",
  },
  {
    question: "10. 正方形是有角的圖形，這個圖形沒有角，所以，",
    A: "(A) 這個圖形是個圓。",
    B: "(B) 這個圖形是橢圓。",
    C: "(C) 這個圖形不是正方形。",
    D: "(D) 無確切的結論。",
    correct: "C",
  },
];

const testans = localStorage.getItem("testans");
const correctans = localStorage.getItem("correctans");
console.log(correctans);
var aa = correctans.split('","');
aa[0] = aa[0].slice(2);
aa[quizs.length-1] = aa[quizs.length-1].slice(0,1);
console.log(aa);

console.log(testans);
var bb = testans.split('","');
// bb[0] = bb[0].slice(2);
// bb[quizs.length-1] = bb[quizs.length-1].slice(0,1);
console.log(bb);


function countscore(){
    var score = 0;
    console.log(testans);
  for(var i = 0 ; i < quizs.length;i++)
  {
    if(testans[i] == correctans[i]){
      score+1;
    }
  }
  console.log(score);
}

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
  correct.innerText = currentQuizData.correct;
}

function checkstar(){
  var temp = document.getElementById("s"+(currentQuiz+1));
  if (temp.style.display == ""){
    star.checked = false;
  }
  else{
    star.checked = true;
  };
}

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  checkstar();
  if(currentQuiz <= quizs.length - 1){
    loadQuiz();
  }
  else if(currentQuiz >= quizs.length -1){
    correctans123();
    countscore();
  };
  if (currentQuiz >= quizs.length - 1){
    document.getElementById("next").innerHTML="交卷"
  }
  else{
    document.getElementById("next").innerHTML="下一題"
  };
})

backBtn.addEventListener("click", () => {
  currentQuiz--;
  checkstar();
  loadQuiz();
  if (currentQuiz <= quizs.length - 1){
    document.getElementById("next").innerHTML="下一題"
  }
});

star.addEventListener("click", () => {
  if(star.checked){
    document.getElementById("s"+(currentQuiz+1)).style.display="flex";
  }
  else{
    document.getElementById("s"+(currentQuiz+1)).style.display="";
  }
})

setblock();
function setblock(){
  for(var i = 1; i < quizs.length+1; i++){
    document.getElementById("n"+i).style.height="50px";
  }
}

function qwe(){
  var temp = document.getElementById('w1');
  temp.src = yes;
}

function changepage(elementId){
  var numberPart = elementId.slice(1);
  var ans = parseInt(numberPart, 10);
  getquizById(ans);
  checkstar();
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

function countscore(){
  var score = 0;
for(var i = 0 ; i < quizs.length;i++)
{
  if(testans[i] == correctans[i]){
    score+=1;
  }
}
}

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

function logout(){
    fetch("http://localhost:5062/api/member/logout",{
        method:'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('JwtToken')
        },
    })
    .then(response => {
        // 检查响应状态
        if (!response.ok) {
            // 如果响应状态不是 200 OK，则抛出错误
            throw new Error('登出失败');
        }
        else{
        // 返回 JSON 格式的响应数据
        return response.text();
        
        }
    })
    .then(data => {
        // 处理成功登出的逻辑
        console.log('response:', data);
        
        // 删除客户端上的 JwtToken 和用户信息
        localStorage.removeItem('JwtToken');
        localStorage.removeItem('userInfo');
        // 可选：重定向到登录页面或其他页面
        window.location.href = '../html/login.html';
    })
    .catch(error => {
        // 处理请求中的错误
        console.error('登出操作中发生错误:', error);
    });
    }