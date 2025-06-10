const rulesData = [
  // 定義交通號誌規則數據陣列，包含8個規則，每個規則有標籤、主描述、圖片路徑、左轉描述、左轉圖片路徑和含義
  { label: '(a)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '黃色箭頭長亮', leftImg: '直_黃箭.jpg', meaning: '非保護左轉(需讓行)' },
  { label: '(b)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '黃色箭頭閃爍', leftImg: '直_黃箭_閃.gif', meaning: '非保護左轉(需讓行)' },
  { label: '(c)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色箭頭閃爍', leftImg: '直_綠箭_閃.gif', meaning: '非保護左轉(需讓行)' },
  { label: '(d)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色圓型閃爍', leftImg: '直_綠圓_閃.gif', meaning: '非保護左轉(需讓行)' },
  { label: '(e)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色箭頭長亮', leftImg: '直_綠箭.jpg', meaning: '保護左轉' },
  { label: '(f)', mainDesc: '直行右轉號誌', mainImg: '橫4_直行右轉.jpg', leftDesc: '綠色圓型長亮', leftImg: '直_綠圓.png', meaning: '保護左轉' },
  { label: '(g)', mainDesc: '紅燈號誌', mainImg: '橫4_紅圓.jpg', leftDesc: '綠色箭頭長亮', leftImg: '直_綠箭.jpg', meaning: '保護左轉' },
  { label: '(h)', mainDesc: '紅燈號誌', mainImg: '橫4_紅圓.jpg', leftDesc: '綠色箭頭長亮', leftImg: '直_綠圓.png', meaning: '保護左轉' },
];

const likertData = rulesData.map(item => ({
  // 從 rulesData 映射出子集數據，僅保留標籤、主描述、圖片路徑、左轉描述和左轉圖片路徑，用於 Likert 量表問題
  label: item.label,
  mainDesc: item.mainDesc,
  mainImg: item.mainImg,
  leftDesc: item.leftDesc,
  leftImg: item.leftImg
}));

function generateRulesTable() {
  // 生成規則表格函數，動態創建 HTML 表格以顯示 rulesData 內容
  const tbody = document.getElementById('rules-table-body'); // 獲取表格主體元素
  rulesData.forEach(item => {
    const tr = document.createElement('tr'); // 創建表格行
    tr.innerHTML = `
      <td>${item.label}</td>          
      <td>${item.mainDesc}</td>       
      <td><img src="${item.mainImg}" alt="${item.mainDesc}" style="width:50px;"></td>
      <td>${item.leftDesc}</td>
      <td><img src="${item.leftImg}" alt="${item.leftDesc}" style="width:20px;"></td>
      <td>${item.meaning}</td>
      <td><input type="checkbox"></td>
    `;
    tbody.appendChild(tr); // 將行添加到表格主體
  });
}

function generateLikertQuestions() {
  // 生成 Likert 量表問題函數，動態創建問卷問題塊
  const container = document.getElementById('likert-container'); // 獲取 Likert 容器元素
  likertData.forEach((item, idx) => {
    const qNum = idx + 1; // 問題編號，從 1 開始
    const block = document.createElement('div'); // 創建問題塊
    block.classList.add('question-block'); // 添加樣式類
    const lbl = document.createElement('label'); // 創建標籤
    lbl.style.textAlign = 'center'; // 文字居中
    lbl.style.display = 'block'; // 塊級顯示
    lbl.innerHTML = `
      ${item.label} ${item.mainDesc}
      <img src="${item.mainImg}" alt="${item.mainDesc}" style="width:50px; display:inline-block; margin-right:10px;">
      + 左轉${item.leftDesc}
      <img src="${item.leftImg}" alt="${item.leftDesc}" style="width:16px; display:inline-block; vertical-align:middle;">
    `;
    block.appendChild(lbl); // 添加標籤到問題塊
    const optsDiv = document.createElement('div'); // 創建選項容器
    optsDiv.classList.add('options'); // 添加樣式類
    const groupName = `likert${qNum}`; // 選項組名稱，確保單選
    const options = [
      { v: '5', t: '非常理解（完全理解）' },
      { v: '4', t: '有點理解（大致上理解）' },
      { v: '3', t: '中立（有些理解，也有些困惑）' },
      { v: '2', t: '有點困惑（不太理解）' },
      { v: '1', t: '非常困惑（完全不理解）' }
    ];
    options.forEach(opt => {
      const optLbl = document.createElement('label'); // 創建每個選項的標籤
      optLbl.innerHTML = `<input type="radio" name="${groupName}" value="${opt.v}"> ${opt.t}`; // 單選按鈕和文字
      optsDiv.appendChild(optLbl); // 添加選項到容器
    });
    block.appendChild(optsDiv); // 添加選項容器到問題塊
    container.appendChild(block); // 添加問題塊到容器
  });
}

const firebaseConfig = {
  // Firebase 配置，包含 API 金鑰、認證域名、數據庫 URL 等，用於連接 Firebase 服務
  apiKey: "AIzaSyCMj_nn2sCMcSx7-BXKoIp03VhgwR7Bx6Y",
  authDomain: "signalsavvytest-11c08.firebaseapp.com",
  databaseURL: "https://signalsavvytest-11c08-default-rtdb.firebaseio.com",
  projectId: "signalsavvytest-11c08",
  storageBucket: "signalsavvytest-11c08.appspot.com",
  messagingSenderId: "370537364030",
  appId: "1:370537364030:web:acf61139c600736b5baf6f"
};
firebase.initializeApp(firebaseConfig); // 初始化 Firebase 應用
const analytics = firebase.analytics(); // 初始化 Firebase 分析
const signalsavvytestDB = firebase.database().ref('signalsavvytest'); // 參考 Firebase Realtime Database 的根節點
let userStatusDatabaseRef; // 用戶狀態數據庫引用，延遲初始化

const isOfflineForDatabase = {
  // 定義離線狀態數據，包含狀態和最後更新時間
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const isOnlineForDatabase = {
  // 定義在線狀態數據，包含狀態和最後更新時間
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const questions = [
    // 定義 21 個測驗問題，每個問題包含問題文字、選項、清單、正確答案索引和影片路徑
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
  // 定義示範問題，包含問題文字、選項、清單、正確答案索引和影片路徑
  question: "示範例題:請選擇號誌含意...",
  options: ["保護左轉", "非保護左轉", "不能左轉"],
  answer: 2,  
  video: "video0.mp4"
};

function shuffle(array) {
  // 打亂陣列順序的函數，使用 Fisher-Yates 演算法
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  array.forEach((item, index) => {
    item.question = `${index + 1}.請選擇號誌含意`; // 更新問題文字，添加題號
  });
}

function saveResultsToFirebase() {
  // 將測驗結果保存到 Firebase 的函數
  let allResults = {
    date: new Date().toLocaleString(), // 記錄提交時間
    userInfo: userInfo, // 用戶基本信息
    answers: answers, // 答案數據
    isWinner: lotteryResult // 抽獎結果
  };
  const resultsRef = signalsavvytestDB.push(); // 創建新的數據節點
  resultsRef.set(allResults)
    .then(() => {
      alert("結果已成功提交！"); // 提交成功提示
    })
    .catch((error) => {
      alert("提交失敗，請重試。"); // 提交失敗提示
      console.error("提交結果時發生錯誤：", error); // 記錄錯誤
    });
}

function renderChart(correct, incorrect) {
  // 渲染結果圖表的函數，使用 Chart.js 創建圓環圖
  const ctx = document.getElementById("result-chart").getContext("2d"); // 獲取畫布上下文
  if (window.resultChart) { window.resultChart.destroy(); } // 如果已有圖表，銷毀舊圖表
  window.resultChart = new Chart(ctx, {
    type: "doughnut", // 圖表類型為圓環圖
    data: {
      labels: ["答對", "答錯"], // 圖表標籤
      datasets: [{
        data: [correct, incorrect], // 數據值
        backgroundColor: ["#2ecc71", "#e74c3c"] // 顏色，綠色表示答對，紅色表示答錯
      }]
    },
    options: {
      responsive: true, // 圖表自適應
      plugins: { legend: { position: "bottom" } } // 圖例顯示在底部
    }
  });
}

let isDemo = true; // 標記當前是否為示範模式，初始為 true
let currentQuestionIndex = 0; // 當前問題索引，初始為 0
let answers = []; // 儲存用戶答案的陣列
let startTime; // 開始時間，用於計算反應時間
let videoEndTime; // 影片結束時間（未使用，留空）
let apiEndpoint; // API 端點（未使用，留空）
let userInfo = {}; // 儲存用戶基本信息的物件

document.addEventListener("DOMContentLoaded", () => {
  // 頁面加載完成後執行的主事件監聽器
  generateRulesTable(); // 生成規則表格
  generateLikertQuestions(); // 生成 Likert 量表問題

  const basicInfoForm = document.getElementById("basic-info-form"); // 基本信息表單
  const mainMenu = document.getElementById("main-menu"); // 主選單
  const quizContainer = document.getElementById("quiz-container"); // 測驗容器
  const submitInfoButton = document.getElementById("submit-info-button"); // 提交信息按鈕
  const startButton = document.getElementById("start-button"); // 開始測驗按鈕
  const questionElement = document.getElementById("question"); // 問題文字元素
  const optionsContainer = document.getElementById("options-container"); // 選項容器
  const videoElement = document.getElementById("video"); // 影片元素
  const agreeButton = document.getElementById("agree-button"); // 同意按鈕
  const surveyIntro = document.getElementById("survey-intro"); // 介紹頁面
  const checkboxes = document.querySelectorAll('.styled-table input[type="checkbox"]'); // 所有勾選框

  agreeButton.addEventListener("click", () => {
    // 點擊同意按鈕，隱藏介紹頁面，顯示基本信息表單
    surveyIntro.classList.add("hidden");
    basicInfoForm.classList.remove("hidden");
  });

  submitInfoButton.onclick = () => {
    // 提交基本信息表單的處理邏輯
    const email = document.getElementById("email").value; // 獲取電子郵件
    const gender = document.getElementById("gender").value; // 獲取性別
    const age = document.getElementById("age").value; // 獲取年齡
    const frequency = document.getElementById("frequency").value; // 獲取駕駛頻率
    const experience = document.getElementById("experience").value; // 獲取駕駛經驗
    const commute = document.getElementById("commute").value; // 獲取通勤方式
    if (email && gender && age && frequency && experience && commute) {
      // 驗證所有字段是否填寫
      userInfo.email = email;
      userInfo.gender = gender;
      userInfo.age = age;
      userInfo.frequency = frequency;
      userInfo.experience = experience;
      userInfo.commute = commute;
      basicInfoForm.classList.add("hidden"); // 隱藏表單
      mainMenu.classList.remove("hidden"); // 顯示主選單
      userStatusDatabaseRef = firebase.database().ref('/status/' + userInfo.email); // 初始化用戶狀態參考
      const connectedRef = firebase.database().ref('.info/connected'); // 監聽連接狀態
      connectedRef.on('value', (snapshot) => {
        if (snapshot.val() === true) {
          userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
            userStatusDatabaseRef.set(isOnlineForDatabase); // 設置在線狀態
          });
        }
      });
      window.onbeforeunload = function() {
        userStatusDatabaseRef.set(isOfflineForDatabase); // 頁面關閉時設置離線狀態
      };
    } else {
      alert("請填寫所有資料！"); // 提示未填寫所有字段
    }
  };

  function areAllCheckboxesChecked() {
    // 檢查所有勾選框是否已勾選
    return Array.from(checkboxes).every(checkbox => checkbox.checked);
  }

  startButton.onclick = () => {
    // 點擊開始測驗按鈕的處理邏輯
    if (areAllCheckboxesChecked()) {
      isDemo = true; // 設置為示範模式
      mainMenu.classList.add("hidden"); // 隱藏主選單
      quizContainer.classList.remove("hidden"); // 顯示測驗容器
      loadDemoQuestion(); // 加載示範問題
    } else {
      alert("請先閱讀並勾選所有的規則。"); // 提示未勾選所有規則
    }
  };

  function loadDemoQuestion() {
    // 加載示範問題的輔助函數
    loadQuestionContent(demoQuestion, true); // 傳遞示範問題和標記
  }

  function loadQuestion(index) {
    // 加載指定索引的正式問題
    const currentQuestion = questions[index];
    loadQuestionContent(currentQuestion, false); // 傳遞問題和標記
  }

  function loadQuestionContent(questionData, isDemoQuestion) {
    // 加載問題內容和影片的函數
    let hasOptionsShown = false; // 標記是否已顯示選項
    let firstplay = false; // 標記是否為第一次播放
    questionElement.textContent = questionData.question; // 設置問題文字
    optionsContainer.innerHTML = ""; // 清空選項容器
    optionsContainer.classList.add("hidden"); // 隱藏選項
    videoElement.src = questionData.video; // 設置影片來源
    videoElement.removeAttribute("controls"); // 移除影片控制條
    videoElement.setAttribute("autoplay", "true"); // 設置自動播放
    videoElement.setAttribute("muted", "true"); // 靜音
    videoElement.setAttribute("playsinline", "true"); // 支援內聯播放
    videoElement.setAttribute("webkit-playsinline", "true"); // 支援 Webkit 瀏覽器內聯播放
    videoElement.controls = false; // 禁用控制條

    videoElement.addEventListener("keydown", (event) => {
      event.preventDefault(); // 阻止鍵盤事件
    });

    videoElement.onplaying = () => {
      // 影片開始播放時觸發
      if (!firstplay) {
        startTime = new Date(); // 記錄開始時間
        firstplay = true;
      }
    };

    videoElement.onended = () => {
      // 影片結束時觸發
      if (!hasOptionsShown) {
        displayOptions(questionData, isDemoQuestion); // 顯示選項
        hasOptionsShown = true;
      }
      videoElement.currentTime = 3; // 從 3 秒處重新播放
      videoElement.play().catch((error) => {
        console.error("影片無法自動播放: ", error); // 記錄播放錯誤
      });
    };

    videoElement.ontimeupdate = () => {
      // 影片播放時間更新時觸發
      if (videoElement.currentTime >= 3 && !hasOptionsShown) {
        displayOptions(questionData, isDemoQuestion); // 3 秒後顯示選項
        hasOptionsShown = true;
      }
    };

    videoElement.addEventListener("timeupdate", () => {
      // 影片時間更新時觸發
      if (videoElement.loop && videoElement.currentTime >= videoElement.duration) {
        videoElement.currentTime = 3; // 循環播放從 3 秒開始
        videoElement.play().catch((error) => {
          console.error("影片無法自動播放: ", error); // 記錄播放錯誤
        });
      }
    });

    videoElement.play().catch((error) => {
      console.error("影片無法自動播放: ", error); // 嘗試播放影片
    });
  }

  function displayOptions(currentQuestion, isDemoQuestion) {
    // 顯示選項按鈕的函數
    optionsContainer.innerHTML = ""; // 清空選項容器
    currentQuestion.options.forEach((option, i) => {
      const button = document.createElement("button"); // 創建按鈕
      button.textContent = option; // 設置按鈕文字
      button.onclick = () => {
        videoElement.pause(); // 暫停影片
        videoElement.loop = false; // 關閉循環
        selectOption(i, isDemoQuestion); // 處理選項選擇
      };
      optionsContainer.appendChild(button); // 添加按鈕到容器
    });
    optionsContainer.classList.remove("hidden"); // 顯示選項容器
  }

  function selectOption(selectedIndex, isDemoQuestion) {
    // 處理選項選擇的函數
    const endTime = new Date(); // 記錄結束時間
    const timeTaken = (endTime - startTime) / 1000 - 3.0; // 計算反應時間（減去 3 秒黑屏）
    const correct = selectedIndex === (isDemoQuestion ? demoQuestion.answer : questions[currentQuestionIndex].answer); // 判斷是否正確
    if (isDemoQuestion) {
      showDemoResult(correct, timeTaken); // 顯示示範結果
    } else {
      answers.push({
        question: questions[currentQuestionIndex].video, // 問題影片
        selectedOption: questions[currentQuestionIndex].options[selectedIndex], // 選中選項
        correct: correct, // 是否正確
        timeTaken: timeTaken.toFixed(2) // 反應時間，保留兩位小數
      });
      currentQuestionIndex++; // 移動到下一個問題
      if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex); // 加載下一題
      } else {
        showOpenEndedQuestions(); // 顯示 Likert 問卷
      }
    }
  }

  function showDemoResult(correct, timeTaken) {
    // 顯示示範問題結果的函數
    quizContainer.classList.add("hidden"); // 隱藏測驗容器
    const demoResultContainer = document.createElement("div"); // 創建結果容器
    demoResultContainer.id = "demo-result-container";
    demoResultContainer.innerHTML = `
      <h2>您的作答結果</h2>
      <p>${correct ? "答對了！" : "答錯了！正確答案是：停下"}</p> <!-- 顯示結果 -->
      <p>您的反應時間是: ${timeTaken.toFixed(2)} 秒</p> <!-- 顯示反應時間 -->
      <button id="start-real-quiz-button">開始正式測驗</button> <!-- 開始正式測驗按鈕 -->
    `;
    document.body.appendChild(demoResultContainer); // 添加到頁面
    document.getElementById("start-real-quiz-button").onclick = () => {
      document.body.removeChild(demoResultContainer); // 移除結果容器
      isDemo = false; // 切換到正式模式
      answers = []; // 重置答案陣列
      currentQuestionIndex = 0; // 重置問題索引
      shuffle(questions); // 打亂問題順序並更新題號
      quizContainer.classList.remove("hidden"); // 顯示測驗容器
      loadQuestion(currentQuestionIndex); // 加載第一題
    };
  }

  function showOpenEndedQuestions() {
    // 顯示 Likert 量表問卷的函數
    document.getElementById("quiz-container").classList.add("hidden"); // 隱藏測驗容器
    document.getElementById("open-ended-questions").classList.remove("hidden"); // 顯示 Likert 問卷
    const openEndedQuestions = document.querySelectorAll('.question-block'); // 獲取所有問題塊
    openEndedQuestions.forEach((block, index) => {
      const radioButtons = block.querySelectorAll('input[type="radio"]'); // 獲取單選按鈕
      const textarea = block.querySelector('textarea'); // 獲取文本區域
      radioButtons.forEach((button) => {
        button.onclick = () => {
          if (button.value === 'other') {
            textarea.classList.remove('hidden'); // 選擇 "other" 時顯示文本區域
          } else {
            textarea.classList.add('hidden'); // 否則隱藏文本區域
          }
        };
      });
    });
    const submitOpenEndedButton = document.getElementById("submit-open-ended-button"); // 提交按鈕
    submitOpenEndedButton.onclick = () => {
      let allAnswered = true; // 標記是否所有問題已回答
      let openEndedAnswers = {}; // 儲存 Likert 答案
      openEndedQuestions.forEach((block, index) => {
        const radioButtons = block.querySelectorAll('input[type="radio"]');
        const textarea = block.querySelector('textarea');
        let selectedValue;

        radioButtons.forEach((button) => {
          if (button.checked) {
            selectedValue = button.value; // 獲取選中值
          }
        });
        if (!selectedValue) {
          allAnswered = false; // 若無選中，標記未完成
        } else {
          if (selectedValue === 'other') {
            openEndedAnswers[`u${index + 1}`] = textarea.value; // 儲存 "other" 的文本
          } else {
            openEndedAnswers[`u${index + 1}`] = selectedValue; // 儲存選中值
          }
        }
      });
      if (allAnswered) {
        userInfo.openEndedAnswers = openEndedAnswers; // 將答案添加到用戶信息
        document.getElementById("open-ended-questions").classList.add("hidden"); // 隱藏 Likert 問卷
        showResults(); // 顯示結果
      } else {
        alert("請完成所有問題的回答！"); // 提示未完成
      }
    };
  }

  function showResults() {
    // 顯示測驗結果的函數
    questionElement.textContent = "測驗結束！"; // 設置提示文字
    optionsContainer.innerHTML = ""; // 清空選項容器
    videoElement.classList.add("hidden"); // 隱藏影片
    document.getElementById("result-container").classList.remove("hidden"); // 顯示結果容器
    const resultTableBody = document.querySelector("#result-table tbody"); // 獲取結果表格主體
    resultTableBody.innerHTML = ""; // 清空表格
    let correctCount = 0; // 答對數量
    answers.forEach((answer, index) => {
      const row = document.createElement("tr"); // 創建表格行
      const questionNumberCell = document.createElement("td");
      questionNumberCell.textContent = `第 ${index + 1} 題`; // 題號
      row.appendChild(questionNumberCell);
      const selectedOptionCell = document.createElement("td");
      selectedOptionCell.textContent = answer.selectedOption; // 用戶選擇
      row.appendChild(selectedOptionCell);
      const correctOptionCell = document.createElement("td");
      correctOptionCell.textContent = questions[index].options[questions[index].answer]; // 正確答案
      row.appendChild(correctOptionCell);
      const timeTakenCell = document.createElement("td");
      timeTakenCell.textContent = answer.timeTaken + " 秒"; // 反應時間
      row.appendChild(timeTakenCell);
      resultTableBody.appendChild(row); // 添加行到表格
      if (answer.correct) {
        correctCount++; // 統計答對數量
      }
    });
    const correctCountText = `你答對了 ${correctCount} 題`; // 答對數提示
    const score = (correctCount / questions.length) * 100; // 計算答對率
    const scoreText = `答對率為: ${score.toFixed(2)}%`; // 格式化答對率
    document.getElementById("summary").innerHTML = `
      <p>${correctCountText}</p>
      <p>${scoreText}</p>
    `;
    lotteryResult = Math.random() < 0.10; // 10% 機率抽獎
    const winnerDiv = document.createElement("div"); // 創建中獎提示容器
    winnerDiv.id = "winner-message";
    winnerDiv.classList.toggle("fail", !lotteryResult); // 根據結果添加樣式
    winnerDiv.textContent = lotteryResult ?
      "🎉 恭喜您中獎！請截圖此畫面並依研究人員指示領獎。" :
      "很可惜，本次未中獎，仍感謝您的熱心參與！"; // 顯示中獎或未中獎信息
    document.getElementById("summary").appendChild(winnerDiv); // 添加到總結
    renderChart(correctCount, answers.length - correctCount); // 渲染圖表
    saveResultsToFirebase(); // 保存結果到 Firebase
  }
});
