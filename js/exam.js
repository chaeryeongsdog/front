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
let currentQuiz = 0; //當前測驗
let score = 0;

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

loadnum();
function loadnum() {
  for (var i = 1; i < quizs.length+1; i++) {
    document.getElementById("n"+i).innerHTML = i+".";
  }
}

loadQuiz();
function loadQuiz() {
  deselectAnswer();  //清除選取的選項

  let currentQuizData = quizs[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.A;
  b_text.innerText = currentQuizData.B;
  c_text.innerText = currentQuizData.C;
  d_text.innerText = currentQuizData.D;
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
      testans.push(answer)
    }
  });
  return answer;
}

nextBtn.addEventListener("click", () => {
  let answer = getSelected(); //找出被使用者選中的那個選項
  let i = testans.length;

  if (answer) {
    if (answer === quizs[currentQuiz].correct) {
      score++;
    }

    currentQuiz++; //答對了進到下一題

    if (currentQuiz < quizs.length) {
      loadQuiz();
    } else {
      container.innerHTML = `<h2>恭喜你完成此份測驗，共答對:${score} / ${quizs.length} 題</h2>`;
    }
    document.getElementById("o"+currentQuiz).innerHTML=testans[i-1];
  }
});

backBtn.addEventListener("click", () => {
  currentQuiz--;
  loadQuiz();
}
)