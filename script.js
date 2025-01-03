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
    // Update question numbering after shuffle
    array.forEach((item, index) => {
        item.question = `${index + 1}.請選擇號誌含意`;
    });
}



function saveResultsToFirebase() {
    let allResults = {
        date: new Date().toLocaleString(),
        userInfo: userInfo,
        answers: answers
    };

    // 將結果保存到 Firebase
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




let isDemo = true; // 加入示範模式的標記
let currentQuestionIndex = 0;
let answers = [];
let startTime;
let videoEndTime;
let apiEndpoint;
let userInfo = {}; // 保存用户基本資料

document.addEventListener("DOMContentLoaded", () => {
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

    
    // 當按下同意按鈕後，隱藏問卷說明並顯示基本資料表單
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
            
            // 在這裡初始化 userStatusDatabaseRef 並設定連線狀態
            userStatusDatabaseRef = firebase.database().ref('/status/' + userInfo.email);

            const connectedRef = firebase.database().ref('.info/connected');
            connectedRef.on('value', (snapshot) => {
                if (snapshot.val() === true) {
                    // 當使用者斷線時自動將狀態設為離線
                    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                        // 當使用者連線時將狀態設為在線
                        userStatusDatabaseRef.set(isOnlineForDatabase);
                    });
                }
            });
            // 在頁面關閉或重新整理時將使用者設為離線
            window.onbeforeunload = function() {
                userStatusDatabaseRef.set(isOfflineForDatabase);
            };

            
        } else {
            alert("請填寫所有資料！");
        }
    };
    


    // Function to check if all checkboxes are checked
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
            // 當影片第一次完整播放後，回到第3秒並開始循環播放直到按下選項
            videoElement.currentTime = 3;
            videoElement.play().catch((error) => {
                console.error("影片無法自動播放: ", error);
            });
        };
    
        // 每當影片播放到第3秒時顯示選項
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
                // 當受訪者按下選項後，停止影片播放並取消循環
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
    
        // 保存結果到 Firebase
        saveResultsToFirebase();
    }
});
