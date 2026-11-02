/* WATERCONVERSATION
   Every Drop Matters 💧
*/

const $ = (id) => document.getElementById(id);

const today = () => new Date().toISOString().slice(0, 10);

const defaultData = {
  name: "Water Saver",
  username: "watersaver",
  photo: "",
  goal: 100,
  usage: [],
  scores: [],
  challenges: [],
  streak: 0,
  bestStreak: 0,
  lastGoalDate: "",
  language: "en"
};

let data = loadData();

let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizCorrect = 0;
let quizAnswered = false;
let quizTimer = null;
let timeLeft = 10;
let currentLevel = "easy";

/* SAVE AND LOAD */

function loadData() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("waterConversation")
    );

    return { ...defaultData, ...(saved || {}) };
  } catch {
    return { ...defaultData };
  }
}

function saveData() {
  localStorage.setItem(
    "waterConversation",
    JSON.stringify(data)
  );
}

/* LANGUAGE */

const translations = {
  en: {
    home: "Home",
    tips: "Tips",
    rain: "Rain",
    calculator: "Calculator",
    quiz: "Quiz",
    profile: "My Profile",
    welcome: "Welcome",
    usage: "Daily Water Usage",
    goal: "Daily Saving Goal",
    history: "Usage History"
  },

  hi: {
    home: "होम",
    tips: "टिप्स",
    rain: "बारिश",
    calculator: "कैलकुलेटर",
    quiz: "क्विज़",
    profile: "मेरी प्रोफाइल",
    welcome: "स्वागत है",
    usage: "दैनिक पानी का उपयोग",
    goal: "दैनिक बचत लक्ष्य",
    history: "उपयोग का इतिहास"
  },

  hinglish: {
    home: "Home",
    tips: "Tips",
    rain: "Rain",
    calculator: "Calculator",
    quiz: "Quiz",
    profile: "My Profile",
    welcome: "Swagat hai",
    usage: "Daily Water Usage",
    goal: "Daily Saving Goal",
    history: "Usage History"
  }
};

function applyLanguage() {
  const language = data.language || "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (translations[language]?.[key]) {
      element.textContent = translations[language][key];
    }
  });

  if ($("languageSelect")) {
    $("languageSelect").value = language;
  }
}

/* NAVIGATION */

function showSection(section) {
  document.querySelectorAll(".section").forEach((item) => {
    item.classList.remove("active");
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  const target = $(section + "Section");

  if (target) {
    target.classList.add("active");
  }

  const nav = document.querySelector(
    `.nav-item[data-section="${section}"]`
  );

  if (nav) {
    nav.classList.add("active");
  }

  if (section === "home") renderHome();
  if (section === "tips") renderTips();
  if (section === "rain") renderRain();
  if (section === "profile") renderProfile();
}

/* HOME */

function greeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";

  return "Good Evening";
}

function getTodayUsage() {
  return data.usage
    .filter((item) => item.date === today())
    .reduce((total, item) => total + Number(item.amount), 0);
}

function renderHome() {
  const usage = getTodayUsage();
  const goal = Number(data.goal) || 1;
  const progress = Math.min((usage / goal) * 100, 100);

  if ($("greeting")) {
    $("greeting").textContent =
      `${greeting()}, ${data.name}!`;
  }

  if ($("todayUsage")) {
    $("todayUsage").textContent =
      `${usage.toFixed(2)} L`;
  }

  if ($("goalValue")) {
    $("goalValue").textContent = `${goal} L`;
  }

  if ($("progressBar")) {
    $("progressBar").style.width = `${progress}%`;
  }

  if ($("progressText")) {
    $("progressText").textContent =
      `${Math.round(progress)}% completed`;
  }

  if ($("streakValue")) {
    $("streakValue").textContent = data.streak;
  }

  if ($("bestStreak")) {
    $("bestStreak").textContent = data.bestStreak;
  }

  renderHistory();
}

/* USAGE HISTORY */

function renderHistory() {
  const container = $("usageHistory");

  if (!container) return;

  const recent = [...data.usage]
    .reverse()
    .slice(0, 10);

  if (!recent.length) {
    container.innerHTML =
      '<p class="empty-state">No usage records yet.</p>';
    return;
  }

  container.innerHTML = recent.map((item) => `
    <div class="history-item">
      <span>${escapeHTML(item.date)}</span>
      <strong>${Number(item.amount).toFixed(2)} L</strong>
    </div>
  `).join("");
}

/* ADD WATER USAGE */

function addUsage(event) {
  event.preventDefault();

  const amount = Number($("usageAmount")?.value);

  if (!Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  data.usage.push({
    amount,
    date: today(),
    time: new Date().toLocaleTimeString()
  });

  saveData();

  if ($("usageAmount")) {
    $("usageAmount").value = "";
  }

  checkGoal();
  renderHome();

  alert("Water usage saved successfully!");
}

/* GOAL AND STREAK */

function checkGoal() {
  const usage = getTodayUsage();

  if (
    usage >= Number(data.goal) &&
    data.lastGoalDate !== today()
  ) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayDate = yesterday.toISOString().slice(0, 10);

    if (data.lastGoalDate === yesterdayDate) {
      data.streak += 1;
    } else {
      data.streak = 1;
    }

    data.bestStreak = Math.max(
      data.bestStreak,
      data.streak
    );

    data.lastGoalDate = today();

    saveData();

    alert(
      "Congratulations! Your daily goal is completed! 🎉"
    );
  }
}

function updateGoal(event) {
  event.preventDefault();

  const goal = Number($("goalInput")?.value);

  if (!Number.isFinite(goal) || goal <= 0) {
    alert("Please enter a valid goal.");
    return;
  }

  data.goal = goal;

  saveData();
  renderHome();

  alert("Daily goal updated!");
}

/* DAILY TIPS */

const tips = [
  {
    icon: "🚿",
    title: "Take shorter showers",
    text: "Reduce shower time to avoid unnecessary water use."
  },
  {
    icon: "🚰",
    title: "Turn off unused taps",
    text: "Turn off the tap while brushing your teeth."
  },
  {
    icon: "🌱",
    title: "Water plants wisely",
    text: "Water plants in the morning or evening."
  },
  {
    icon: "🪣",
    title: "Use a bucket",
    text: "Use a bucket instead of a running hose when possible."
  },
  {
    icon: "🌧️",
    title: "Collect rainwater",
    text: "Collect rainwater for gardening and cleaning."
  },
  {
    icon: "🔧",
    title: "Fix leaking taps",
    text: "Repair leaking taps to prevent water waste."
  },
  {
    icon: "🧺",
    title: "Full laundry loads",
    text: "Run your washing machine with a full load."
  }
];

function renderTips() {
  const container = $("tipsContainer");

  if (!container) return;

  const day = Math.floor(
    new Date().setHours(0, 0, 0, 0) / 86400000
  );

  const dailyTip = tips[day % tips.length];

  container.innerHTML = `
    <div class="tip-card">
      <div class="tip-icon">${dailyTip.icon}</div>
      <h3>Today's Tip: ${dailyTip.title}</h3>
      <p>${dailyTip.text}</p>
    </div>

    ${tips.map((tip) => `
      <div class="tip-card">
        <div class="tip-icon">${tip.icon}</div>
        <h3>${tip.title}</h3>
        <p>${tip.text}</p>
      </div>
    `).join("")}
  `;
}

/* CHALLENGE */

function completeChallenge(name) {
  if (!data.challenges.includes(name)) {
    data.challenges.push(name);

    saveData();

    alert("Great job! Challenge completed! 🌱");
  } else {
    alert("You have already completed this challenge!");
  }
}

/* RAINWATER CALCULATOR */

function calculateRainwater(event) {
  event.preventDefault();

  const area = Number($("roofArea")?.value);
  const rainfall = Number($("rainfall")?.value);
  const efficiency = Number($("efficiency")?.value || 80);

  if (
    !Number.isFinite(area) ||
    !Number.isFinite(rainfall) ||
    !Number.isFinite(efficiency) ||
    area <= 0 ||
    rainfall < 0 ||
    efficiency < 0 ||
    efficiency > 100
  ) {
    alert("Please enter valid values.");
    return;
  }

  const litres = area * rainfall * efficiency / 100;

  if ($("rainResult")) {
    $("rainResult").innerHTML = `
      <div class="message">
        Estimated rainwater collection:
        <strong>${litres.toFixed(2)} L</strong>
        <br>
        ${(
          litres * 1000
        ).toFixed(0)} mL
      </div>
    `;
  }
}

function renderRain() {
  if ($("rainResult") && !$("rainResult").innerHTML) {
    $("rainResult").innerHTML = "";
  }
}

/* DAILY WATER CALCULATOR */

function calculateDailyUsage(event) {
  event.preventDefault();

  const shower = Number($("showerUsage")?.value || 0);
  const drinking = Number($("drinkingUsage")?.value || 0);
  const cleaning = Number($("cleaningUsage")?.value || 0);
  const other = Number($("otherUsage")?.value || 0);

  const values = [shower, drinking, cleaning, other];

  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    alert("Please enter valid values.");
    return;
  }

  const total = values.reduce((sum, value) => sum + value, 0);

  if ($("dailyCalcResult")) {
    $("dailyCalcResult").innerHTML = `
      <div class="message">
        Total daily usage:
        <strong>${total.toFixed(2)} L</strong>
        <br>
        ${(total * 1000).toFixed(0)} mL
      </div>
    `;
  }
}

/* WATER SAVING CALCULATOR */

function calculateSaving(event) {
  event.preventDefault();

  const current = Number($("currentUsage")?.value);
  const saved = Number($("savedUsage")?.value);

  if (
    !Number.isFinite(current) ||
    !Number.isFinite(saved) ||
    current < 0 ||
    saved < 0 ||
    saved > current
  ) {
    alert("Please enter valid values.");
    return;
  }

  const percentage =
    current > 0 ? (saved / current) * 100 : 0;

  if ($("savingResult")) {
    $("savingResult").innerHTML = `
      <div class="message">
        Water saved: <strong>${saved.toFixed(2)} L</strong>
        <br>
        ${(saved * 1000).toFixed(0)} mL
        <br>
        Saving percentage:
        <strong>${percentage.toFixed(1)}%</strong>
      </div>
    `;
  }
}

/* QUIZ QUESTIONS */

const questionBank = {
  easy: [
    {
      q: "Which planet is known as the Blue Planet?",
      options: ["Mars", "Earth", "Venus", "Jupiter"],
      answer: 1,
      explanation: "Earth looks blue from space because much of its surface is covered by water."
    },
    {
      q: "Which action saves water?",
      options: ["Leaving taps open", "Fixing leaks", "Wasting water", "Washing roads daily"],
      answer: 1,
      explanation: "Fixing leaks prevents unnecessary water loss."
    },
    {
      q: "Which is a natural source of fresh water?",
      options: ["River", "Petrol", "Smoke", "Plastic"],
      answer: 0,
      explanation: "Rivers are important sources of fresh water."
    },
    {
      q: "What do plants need to grow?",
      options: ["Plastic", "Water", "Oil", "Smoke"],
      answer: 1,
      explanation: "Plants need water, sunlight, air and nutrients."
    },
    {
      q: "What should we do while brushing?",
      options: ["Keep tap open", "Turn tap off", "Waste water", "Ignore the tap"],
      answer: 1,
      explanation: "Turning off the tap while brushing saves water."
    }
  ],

  medium: [
    {
      q: "What is rainwater harvesting?",
      options: [
        "Collecting and storing rainwater",
        "Wasting rainwater",
        "Making artificial rain",
        "Cleaning oceans"
      ],
      answer: 0,
      explanation: "Rainwater harvesting collects rainwater for later use."
    },
    {
      q: "Which gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      answer: 1,
      explanation: "Plants use carbon dioxide during photosynthesis."
    },
    {
      q: "Which practice helps protect soil?",
      options: ["Deforestation", "Planting trees", "Burning forests", "Overgrazing"],
      answer: 1,
      explanation: "Tree roots help hold soil together."
    },
    {
      q: "What is groundwater?",
      options: [
        "Water stored beneath Earth's surface",
        "Water in clouds",
        "Ocean waves",
        "Water vapour"
      ],
      answer: 0,
      explanation: "Groundwater is water found below the ground."
    },
    {
      q: "Which is a renewable resource?",
      options: ["Coal", "Petroleum", "Sunlight", "Natural gas"],
      answer: 2,
      explanation: "Sunlight is naturally replenished."
    }
  ],

  hard: [
    {
      q: "Which process changes water vapour into liquid water?",
      options: ["Evaporation", "Condensation", "Melting", "Sublimation"],
      answer: 1,
      explanation: "Condensation changes water vapour into liquid droplets."
    },
    {
      q: "Which layer protects Earth from much harmful UV radiation?",
      options: ["Ozone layer", "Cloud layer", "Soil layer", "Ocean layer"],
      answer: 0,
      explanation: "The ozone layer absorbs much of the Sun's harmful UV radiation."
    },
    {
      q: "What is a major cause of ocean acidification?",
      options: [
        "Carbon dioxide absorption",
        "More sunlight",
        "Wind",
        "Freshwater"
      ],
      answer: 0,
      explanation: "Oceans absorb carbon dioxide, changing seawater chemistry."
    },
    {
      q: "Which method can reduce soil erosion?",
      options: [
        "Removing vegetation",
        "Contour farming",
        "Deforestation",
        "Overgrazing"
      ],
      answer: 1,
      explanation: "Contour farming can reduce runoff and soil erosion."
    },
    {
      q: "What does biodiversity mean?",
      options: [
        "Variety of life",
        "Only plant life",
        "Only animal life",
        "Weather changes"
      ],
      answer: 0,
      explanation: "Biodiversity means the variety of living organisms."
    }
  ]
};

/* QUIZ START */

function startQuiz(level = "easy") {
  clearInterval(quizTimer);

  currentLevel = level;

  const questions = questionBank[level] || questionBank.easy;

  quizQuestions = [...questions].sort(
    () => Math.random() - 0.5
  );

  quizIndex = 0;
  quizScore = 0;
  quizCorrect = 0;

  if ($("quizArea")) {
    $("quizArea").style.display = "block";
  }

  showQuestion();
}

/* SHOW QUESTION */

function showQuestion() {
  clearInterval(quizTimer);

  if (quizIndex >= quizQuestions.length) {
    finishQuiz();
    return;
  }

  quizAnswered = false;
  timeLeft = 10;

  const question = quizQuestions[quizIndex];

  if ($("quizProgress")) {
    $("quizProgress").textContent =
      `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  }

  if ($("quizTimer")) {
    $("quizTimer").textContent = timeLeft;
  }

  if ($("quizQuestion")) {
    $("quizQuestion").textContent = question.q;
  }

  if ($("quizOptions")) {
    $("quizOptions").innerHTML = question.options.map(
      (option, index) => `
        <button
          class="quiz-option"
          data-answer="${index}"
        >
          ${escapeHTML(option)}
        </button>
      `
    ).join("");

    $("quizOptions")
      .querySelectorAll(".quiz-option")
      .forEach((button) => {
        button.addEventListener("click", () => {
          answerQuestion(Number(button.dataset.answer));
        });
      });
  }

  if ($("quizFeedback")) {
    $("quizFeedback").innerHTML = "";
  }

  if ($("nextQuestion")) {
    $("nextQuestion").style.display = "none";
  }

  quizTimer = setInterval(() => {
    timeLeft--;

    if ($("quizTimer")) {
      $("quizTimer").textContent = timeLeft;
    }

    if (timeLeft <= 0) {
      clearInterval(quizTimer);
      answerQuestion(-1);
    }
  }, 1000);
}

/* ANSWER QUESTION */

function answerQuestion(selectedIndex) {
  if (quizAnswered) return;

  quizAnswered = true;

  clearInterval(quizTimer);

  const question = quizQuestions[quizIndex];

  document.querySelectorAll(".quiz-option").forEach(
    (button, index) => {
      button.disabled = true;

      if (index === question.answer) {
        button.classList.add("correct");
      }

      if (
        index === selectedIndex &&
        selectedIndex !== question.answer
      ) {
        button.classList.add("wrong");
      }
    }
  );

  if (selectedIndex === question.answer) {
    quizScore++;
    quizCorrect++;
  }

  let message = "Not quite!";

  if (selectedIndex === question.answer) {
    message = "Correct answer! 🎉";
  } else if (selectedIndex === -1) {
    message = "Time is up!";
  }

  if ($("quizFeedback")) {
    $("quizFeedback").innerHTML = `
      <div class="message">
        <strong>${message}</strong>
        <br>
        Correct answer:
        ${escapeHTML(question.options[question.answer])}
        <br>
        ${escapeHTML(question.explanation)}
      </div>
    `;
  }

  if ($("nextQuestion")) {
    $("nextQuestion").style.display = "block";
  }
}

/* NEXT QUESTION */

function nextQuestion() {
  if (!quizAnswered) return;

  quizIndex++;

  showQuestion();
}

/* STOP QUIZ */

function stopQuiz() {
  clearInterval(quizTimer);

  if ($("quizArea")) {
    $("quizArea").style.display = "none";
  }
}

/* QUIZ RESULTS */

function finishQuiz() {
  clearInterval(quizTimer);

  const total = quizQuestions.length;

  const accuracy = total
    ? (quizCorrect / total) * 100
    : 0;

  data.scores.push({
    date: today(),
    score: quizScore,
    total,
    accuracy: accuracy.toFixed(1),
    level: currentLevel
  });

  saveData();

  if ($("quizArea")) {
    $("quizArea").innerHTML = `
      <div class="card">
        <h2>🎉 Quiz Completed!</h2>

        <h3>Score: ${quizScore}/${total}</h3>

        <p>Accuracy: ${accuracy.toFixed(1)}%</p>

        <p>
          ${
            accuracy >= 80
              ? "Excellent work! Keep learning."
              : accuracy >= 50
                ? "Good effort! Keep practising."
                : "Keep trying. You can improve!"
          }
        </p>

        <button
          class="btn"
          onclick="startQuiz('${currentLevel}')"
        >
          Play Another Round
        </button>

        <button
          class="btn btn-secondary"
          onclick="stopQuiz()"
        >
          Finish Quiz
        </button>
      </div>

      ${renderLeaderboard()}
    `;
  }

  renderScoreHistory();
}

/* LEADERBOARD */

function renderLeaderboard() {
  const scores = [...data.scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  if (!scores.length) return "";

  return `
    <div class="card">
      <h2>🏆 My High Scores</h2>

      ${scores.map((score, index) => `
        <div class="history-item">
          <span>
            ${index + 1}. ${escapeHTML(score.date)}
          </span>

          <strong>
            ${score.score}/${score.total}
          </strong>
        </div>
      `).join("")}

      <p>Local scores saved on this device.</p>
    </div>
  `;
}

/* PROFILE */

function renderProfile() {
  if ($("profileName")) {
    $("profileName").textContent = data.name;
  }

  if ($("profileUsername")) {
    $("profileUsername").textContent =
      "@" + data.username;
  }

  if ($("nameInput")) {
    $("nameInput").value = data.name;
  }

  if ($("usernameInput")) {
    $("usernameInput").value = data.username;
  }

  if ($("goalInput")) {
    $("goalInput").value = data.goal;
  }

  const avatar = $("profileAvatar");

  if (avatar) {
    if (data.photo) {
      avatar.innerHTML =
        `<img src="${data.photo}" alt="Profile photo">`;
    } else {
      avatar.textContent = "💧";
    }
  }

  renderScoreHistory();
}

function saveProfile(event) {
  event.preventDefault();

  data.name =
    $("nameInput")?.value.trim() || "Water Saver";

  data.username =
    $("usernameInput")?.value.trim() || "watersaver";

  saveData();

  renderProfile();
  renderHome();

  alert("Profile updated successfully!");
}

/* PROFILE PHOTO */

function uploadPhoto(event) {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please choose an image.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Choose an image smaller than 2 MB.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    data.photo = reader.result;

    saveData();
    renderProfile();
  };

  reader.readAsDataURL(file);
}

/* SCORE HISTORY */

function renderScoreHistory() {
  const containers = document.querySelectorAll("#scoreHistory");

  const html = data.scores.length
    ? renderLeaderboard()
    : '<p class="empty-state">No quiz scores yet.</p>';

  containers.forEach((container) => {
    container.innerHTML = html;
  });
}

/* RESET APP DATA */

function resetData() {
  const confirmed = confirm(
    "Are you sure you want to delete your saved app data?"
  );

  if (!confirmed) return;

  localStorage.removeItem("waterConversation");

  data = { ...defaultData };

  saveData();

  renderHome();
  renderProfile();
  renderScoreHistory();

  alert("App data has been reset.");
}

/* HTML SAFETY */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

/* EVENT LISTENERS */

function bindEvents() {

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.dataset.section);
    });
  });

  $("languageSelect")?.addEventListener("change", (event) => {
    data.language = event.target.value;

    saveData();
    applyLanguage();
  });

  $("usageForm")?.addEventListener("submit", addUsage);

  $("goalForm")?.addEventListener("submit", updateGoal);

  $("profileForm")?.addEventListener("submit", saveProfile);

  $("photoInput")?.addEventListener("change", uploadPhoto);

  $("rainForm")?.addEventListener("submit", calculateRainwater);

  $("dailyCalcForm")?.addEventListener(
    "submit",
    calculateDailyUsage
  );

  $("savingForm")?.addEventListener("submit", calculateSaving);

  $("nextQuestion")?.addEventListener("click", nextQuestion);

  $("stopQuiz")?.addEventListener("click", stopQuiz);

  $("resetButton")?.addEventListener("click", resetData);

  document.querySelectorAll("[data-quiz-level]").forEach((button) => {
    button.addEventListener("click", () => {
      startQuiz(button.dataset.quizLevel);
    });
  });
}

/* INITIALIZE APP */

function init() {
  bindEvents();

  applyLanguage();

  renderHome();
  renderTips();
  renderRain();
  renderProfile();

  if (
    "serviceWorker" in navigator &&
    location.protocol.startsWith("http")
  ) {
    navigator.serviceWorker
      .register("./sw.js")
      .catch((error) => {
        console.log("Service Worker error:", error);
      });
  }
}

document.addEventListener("DOMContentLoaded", init);
