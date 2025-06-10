const rulesData = [
  { label: '(a)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '黃色箭頭長亮', leftImg: '直_黃箭.jpg', meaning: '非保護左轉(需讓行)' },
  { label: '(b)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '黃色箭頭閃爍', leftImg: '直_黃箭_閃.gif', meaning: '非保護左轉(需讓行)' },
  { label: '(c)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色箭頭閃爍', leftImg: '直_綠箭_閃.gif', meaning: '非保護左轉(需讓行)' },
  { label: '(d)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色圓型閃爍', leftImg: '直_綠圓_閃.gif', meaning: '非保護左轉(需讓行)' },
  { label: '(e)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色箭頭長亮', leftImg: '直_綠箭.jpg', meaning: '保護左轉' },
  { label: '(f)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色圓型長亮', leftImg: '直_綠圓.png', meaning: '保護左轉' },
  { label: '(g)', mainDesc: '紅燈號誌',       mainImg: '橫4_紅圓.jpg',     leftDesc: '綠色箭頭長亮', leftImg: '直_綠箭.jpg', meaning: '保護左轉' },
  { label: '(h)', mainDesc: '紅燈號誌',       mainImg: '橫4_紅圓.jpg',     leftDesc: '綠色箭頭長亮', leftImg: '直_綠圓.png', meaning: '保護左轉' },
];
const likertData = rulesData.map(item => ({
  label: item.label,
  mainDesc: item.mainDesc,
  mainImg: item.mainImg,
  leftDesc: item.leftDesc,
  leftImg: item.leftImg
}));
function generateRulesTable() {
  const tbody = document.getElementById('rules-table-body');
  rulesData.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.label}</td>
      <td>${item.mainDesc}</td>
      <td><img src="${item.mainImg}" alt="${item.mainDesc}" style="width:50px;"></td>
      <td>${item.leftDesc}</td>
      <td><img src="${item.leftImg}" alt="${item.leftDesc}" style="width:20px;"></td>
      <td>${item.meaning}</td>
      <td><input type="checkbox"></td>
    `;
    tbody.appendChild(tr);
  });
}
function generateLikertQuestions() {
  const container = document.getElementById('likert-container');
  likertData.forEach((item, idx) => {
    const qNum = idx + 1;
    const block = document.createElement('div');
    block.classList.add('question-block');
    const lbl = document.createElement('label');
    lbl.style.textAlign = 'center';
    lbl.style.display = 'block';
    lbl.innerHTML = `
      ${item.label} ${item.mainDesc}
      <img src="${item.mainImg}" alt="${item.mainDesc}" style="width:50px; display:inline-block; margin-right:10px;">
      + 左轉${item.leftDesc}
      <img src="${item.leftImg}" alt="${item.leftDesc}" style="width:16px; display:inline-block; vertical-align:middle;">
    `;
    block.appendChild(lbl);
    const optsDiv = document.createElement('div');
    optsDiv.classList.add('options');
    const groupName = `likert${qNum}`;
    const options = [
      { v: '5', t: '非常理解（完全理解）' },
      { v: '4', t: '有點理解（大致上理解）' },
      { v: '3', t: '中立（有些理解，也有些困惑）' },
      { v: '2', t: '有點困惑（不太理解）' },
      { v: '1', t: '非常困惑（完全不理解）' }
    ];
    options.forEach(opt => {
      const optLbl = document.createElement('label');
      optLbl.innerHTML = `<input type="radio" name="${groupName}" value="${opt.v}"> ${opt.t}`;
      optsDiv.appendChild(optLbl);
    });
    block.appendChild(optsDiv);
    container.appendChild(block);
  });
}
const firebaseConfig = {
    apiKey: "AIzaSyCMj_nn2sCMcSx7-BXKoIp03VhgwR7Bx6Y",
    authDomain: "signalsavvytest-11c08.firebaseapp.com",
    databaseURL: "https://signalsavvytest-11c08-default-rtdb.firebaseio.com",
    projectId: "signalsavvytest-11c08",
    storageBucket: "signalsavvytest-11c08.appspot.com",
    messagingSenderId: "370537364030",
    appId: "1:370537364030:web:acf61139c600736b5baf6f"
  };
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const signalsavvytestDB = firebase.database().ref('signalsavvytest');
let userStatusDatabaseRef; // 延遲初始化
const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const questions = [
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video1.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video2.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 0,
        video: "video3.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 0,
        video: "video4.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 0,
        video: "video5.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video6.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video7.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video8.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video9.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video10.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video11.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video12.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 1,
        video: "video13.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 0,
        video: "video14.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 0,
        video: "video15.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 0,
        video: "video16.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 0,
        video: "video17.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 2,
        video: "video18.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 2,
        video: "video19.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 2,
        video: "video20.mp4"
    },
    {
        question: "請選擇號誌含意...",
        options: ["保護左轉", "非保護左轉", "不能左轉"],
        answer: 2,
        video: "video21.mp4"
    }
];
const demoQuestion = {
    question: "示範例題:請選擇號誌含意...",
    options: ["保護左轉", "非保護左轉", "不能左轉"],
    answer: 2,  
    video: "video0.mp4"
};
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.forEach((item, index) => {
        item.question = `${index + 1}.請選擇號誌含意`;
    });
}
function saveResultsToFirebase() {
    let allResults = {
    date: new Date().toLocaleString(),
    userInfo: userInfo,
    answers: answers,
    isWinner: lotteryResult    // ← 新增欄位
    };
    const resultsRef = signalsavvytestDB.push();
    resultsRef.set(allResults)
    .then(() => {
        alert("結果已成功提交！");
    })
    .catch((error) => {
        alert("提交失敗，請重試。");
        console.error("提交結果時發生錯誤：", error);
    });
}
function renderChart(correct, incorrect){
  const ctx = document.getElementById("result-chart").getContext("2d");
  if(window.resultChart){ window.resultChart.destroy(); }
  window.resultChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["答對", "答錯"],
      datasets: [{
        data: [correct, incorrect],
        backgroundColor: ["#2ecc71","#e74c3c"]
      }]
    },
    options: {
      responsive: true,
      plugins:{ legend:{ position:"bottom" } }
    }
  });
}
let isDemo = true; // 加入示範模式的標記
let currentQuestionIndex = 0;
let answers = [];
let startTime;
let videoEndTime;
let apiEndpoint;
let userInfo = {}; // 保存用户基本資料
document.addEventListener("DOMContentLoaded", () => {
    generateRulesTable();
    generateLikertQuestions();
    const basicInfoForm = document.getElementById("basic-info-form");
    const mainMenu = document.getElementById("main-menu");
    const quizContainer = document.getElementById("quiz-container");
    const submitInfoButton = document.getElementById("submit-info-button");
    const startButton = document.getElementById("start-button");
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const videoElement = document.getElementById("video");
    const agreeButton = document.getElementById("agree-button");
    const surveyIntro = document.getElementById("survey-intro");
    const checkboxes = document.querySelectorAll('.styled-table input[type="checkbox"]');
    agreeButton.addEventListener("click", () => {
        surveyIntro.classList.add("hidden");
        basicInfoForm.classList.remove("hidden");
    });
    submitInfoButton.onclick = () => {
        const email = document.getElementById("email").value;
        const gender = document.getElementById("gender").value;
        const age = document.getElementById("age").value;
        const frequency = document.getElementById("frequency").value;
        const experience = document.getElementById("experience").value;
        const commute = document.getElementById("commute").value;
        if (email && gender && age && frequency && experience && commute) {
            userInfo.email = email;
            userInfo.gender = gender;
            userInfo.age = age;
            userInfo.frequency = frequency;
            userInfo.experience = experience;
            userInfo.commute = commute;
            basicInfoForm.classList.add("hidden");
            mainMenu.classList.remove("hidden");
            userStatusDatabaseRef = firebase.database().ref('/status/' + userInfo.email);
            const connectedRef = firebase.database().ref('.info/connected');
            connectedRef.on('value', (snapshot) => {
                if (snapshot.val() === true) {
                    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                        userStatusDatabaseRef.set(isOnlineForDatabase);
                    });
                }
            });
            window.onbeforeunload = function() {
                userStatusDatabaseRef.set(isOfflineForDatabase);
            };
        } else {
            alert("請填寫所有資料！");
        }
    };
    function areAllCheckboxesChecked() {
        return Array.from(checkboxes).every(checkbox => checkbox.checked);
    }
    startButton.onclick = () => {
        if (areAllCheckboxesChecked()) {
            isDemo = true;
            mainMenu.classList.add("hidden");
            quizContainer.classList.remove("hidden");
            loadDemoQuestion();
        } else {
            alert("請先閱讀並勾選所有的規則。");
        }
    };
    function loadDemoQuestion() {
        loadQuestionContent(demoQuestion, true);
    }
    function loadQuestion(index) {
        const currentQuestion = questions[index];
        loadQuestionContent(currentQuestion, false);
    }
    function loadQuestionContent(questionData, isDemoQuestion) {
        let hasOptionsShown = false;
        let firstplay = false;
        questionElement.textContent = questionData.question;
        optionsContainer.innerHTML = "";
        optionsContainer.classList.add("hidden");
        videoElement.src = questionData.video;
        videoElement.removeAttribute("controls");
        videoElement.setAttribute("autoplay", "true");
        videoElement.setAttribute("muted", "true");
        videoElement.setAttribute("playsinline", "true");
        videoElement.setAttribute("webkit-playsinline", "true");
        videoElement.controls = false;
        videoElement.addEventListener("keydown", (event) => {
            event.preventDefault();
        });
        videoElement.onplaying = () => {
            if (!firstplay) {
                startTime = new Date();
                firstplay = true;
            }
        };
        videoElement.onended = () => {
            if (!hasOptionsShown) {
                displayOptions(questionData, isDemoQuestion);
                hasOptionsShown = true;
            }
            videoElement.currentTime = 3;
            videoElement.play().catch((error) => {
                console.error("影片無法自動播放: ", error);
            });
        };
        videoElement.ontimeupdate = () => {
            if (videoElement.currentTime >= 3 && !hasOptionsShown) {
                displayOptions(questionData, isDemoQuestion);
                hasOptionsShown = true;
            }
        };
        videoElement.addEventListener("timeupdate", () => {
            if (videoElement.loop && videoElement.currentTime >= videoElement.duration) {
                videoElement.currentTime = 3;
                videoElement.play().catch((error) => {
                    console.error("影片無法自動播放: ", error);
                });
            }
        });
        videoElement.play().catch((error) => {
            console.error("影片無法自動播放: ", error);
        });
    }
    function displayOptions(currentQuestion, isDemoQuestion) {
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, i) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => {
                videoElement.pause();
                videoElement.loop = false;
                selectOption(i, isDemoQuestion);
            };
            optionsContainer.appendChild(button);
        });
        optionsContainer.classList.remove("hidden");
    }
    function selectOption(selectedIndex, isDemoQuestion) {
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000 - 3.0;
        const correct = selectedIndex === (isDemoQuestion ? demoQuestion.answer : questions[currentQuestionIndex].answer);
        if (isDemoQuestion) {
            showDemoResult(correct, timeTaken);
        } else {
            answers.push({
                question: questions[currentQuestionIndex].video,
                selectedOption: questions[currentQuestionIndex].options[selectedIndex],
                correct: correct,
                timeTaken: timeTaken.toFixed(2)
            });
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                showOpenEndedQuestions();
            }
        }
    }
    function showDemoResult(correct, timeTaken) {
        quizContainer.classList.add("hidden");
        const demoResultContainer = document.createElement("div");
        demoResultContainer.id = "demo-result-container";
        demoResultContainer.innerHTML = `
            <h2>您的作答結果</h2>
            <p>${correct ? "答對了！" : "答錯了！正確答案是：停下"}</p>
            <p>您的反應時間是: ${timeTaken.toFixed(2)} 秒</p>
            <button id="start-real-quiz-button">開始正式測驗</button>
        `;
        document.body.appendChild(demoResultContainer);
        document.getElementById("start-real-quiz-button").onclick = () => {
            document.body.removeChild(demoResultContainer);
            isDemo = false;
            answers = [];
            currentQuestionIndex = 0;
            shuffle(questions); // 打亂問題順序並更新題號
            quizContainer.classList.remove("hidden");
            loadQuestion(currentQuestionIndex);
        };
    }
    function showOpenEndedQuestions() {
        document.getElementById("quiz-container").classList.add("hidden");
        document.getElementById("open-ended-questions").classList.remove("hidden");
        const openEndedQuestions = document.querySelectorAll('.question-block');
        openEndedQuestions.forEach((block, index) => {
            const radioButtons = block.querySelectorAll('input[type="radio"]');
            const textarea = block.querySelector('textarea');
            radioButtons.forEach((button) => {
                button.onclick = () => {
                    if (button.value === 'other') {
                        textarea.classList.remove('hidden');
                    } else {
                        textarea.classList.add('hidden');
                    }
                };
            });
        });
        const submitOpenEndedButton = document.getElementById("submit-open-ended-button");
        submitOpenEndedButton.onclick = () => {
            let allAnswered = true;
            let openEndedAnswers = {};
            openEndedQuestions.forEach((block, index) => {
                const radioButtons = block.querySelectorAll('input[type="radio"]');
                const textarea = block.querySelector('textarea');
                let selectedValue;

                radioButtons.forEach((button) => {
                    if (button.checked) {
                        selectedValue = button.value;
                    }
                });
                if (!selectedValue) {
                    allAnswered = false;
                } else {
                    if (selectedValue === 'other') {
                        openEndedAnswers[`u${index + 1}`] = textarea.value;
                    } else {
                        openEndedAnswers[`u${index + 1}`] = selectedValue;
                    }
                }
            });
            if (allAnswered) {
                userInfo.openEndedAnswers = openEndedAnswers;
                document.getElementById("open-ended-questions").classList.add("hidden");
                showResults();
            } else {
                alert("請完成所有問題的回答！");
            }
        };
    }
    function showResults() {
        questionElement.textContent = "測驗結束！";
        optionsContainer.innerHTML = "";
        videoElement.classList.add("hidden");
        document.getElementById("result-container").classList.remove("hidden");
        const resultTableBody = document.querySelector("#result-table tbody");
        resultTableBody.innerHTML = "";
        let correctCount = 0;
        answers.forEach((answer, index) => {
            const row = document.createElement("tr");
            const questionNumberCell = document.createElement("td");
            questionNumberCell.textContent = `第 ${index + 1} 題`;
            row.appendChild(questionNumberCell);
            const selectedOptionCell = document.createElement("td");
            selectedOptionCell.textContent = answer.selectedOption;
            row.appendChild(selectedOptionCell);
            const correctOptionCell = document.createElement("td");
            correctOptionCell.textContent = questions[index].options[questions[index].answer];
            row.appendChild(correctOptionCell);
            const timeTakenCell = document.createElement("td");
            timeTakenCell.textContent = answer.timeTaken + " 秒";
            row.appendChild(timeTakenCell);
            resultTableBody.appendChild(row);
            if (answer.correct) {
                correctCount++;
            }
        });
        const correctCountText = `你答對了 ${correctCount} 題`;
        const score = (correctCount / questions.length) * 100;
        const scoreText = `答對率為: ${score.toFixed(2)}%`;
        document.getElementById("summary").innerHTML = `
            <p>${correctCountText}</p>
            <p>${scoreText}</p>
        `;
        lotteryResult = Math.random() < 0.10;
        const winnerDiv = document.createElement("div");
        winnerDiv.id = "winner-message";
        winnerDiv.classList.toggle("fail", !lotteryResult);
        winnerDiv.textContent = lotteryResult ?
        "🎉 恭喜您中獎！請截圖此畫面並依研究人員指示領獎。" :
        "很可惜，本次未中獎，仍感謝您的熱心參與！";
        document.getElementById("summary").appendChild(winnerDiv);
        renderChart(correctCount, answers.length - correctCount);
        saveResultsToFirebase();
    }
});
