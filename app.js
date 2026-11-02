"use strict";

/* =====================================
   WATERCONVERSATION - APP.JS
   Every Drop Matters.
   ===================================== */

const STORAGE_KEY = "waterconversation-data-v2";

const defaultData = {
  language: "en",
  name: "Water Saver",
  username: "@watersaver",
  photo: "",
  dailyGoal: 100,
  usageHistory: [],
  quizHistory: [],
  lastGoalDate: "",
  streak: 0,
  bestStreak: 0
};

let data = loadData();
let quizState = {
  questions: [],
  current: 0,
  score: 0,
  answers: [],
  timeLeft: 10,
  timer: null,
  level: "easy",
  finished: false
};

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultData, ...(saved || {}) };
  } catch {
    return { ...defaultData };
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function $(id) {
  return document.getElementById(id);
}

function safeText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

/* =====================================
   LANGUAGE
   ===================================== */

const translations = {
  en: {
    "Home": "Home",
    "Tips": "Tips",
    "Rain": "Rain",
    "Calculator": "Calculator",
    "Quiz": "Quiz",
    "My Profile": "My Profile",
    "Every Drop Matters.": "Every Drop Matters.",
    "Today's Water Usage": "Today's Water Usage",
    "Daily Goal": "Daily Goal",
    "Current Streak": "Current Streak",
    "Best Streak": "Best Streak",
    "Save Water Every Day": "Save Water Every Day",
    "Enter today's water usage": "Enter today's water usage",
    "Save Usage": "Save Usage",
    "Set Daily Goal": "Set Daily Goal",
    "Update Goal": "Update Goal",
    "Usage History": "Usage History",
    "Daily Water Saving Tips": "Daily Water Saving Tips",
    "Daily Challenge": "Daily Challenge",
    "Rainwater Harvesting": "Rainwater Harvesting",
    "Calculate Rainwater": "Calculate Rainwater",
    "Roof Area (m²)": "Roof Area (m²)",
    "Rainfall (mm)": "Rainfall (mm)",
    "Efficiency (%)": "Efficiency (%)",
    "Calculate": "Calculate",
    "Daily Usage Calculator": "Daily Usage Calculator",
    "Shower Usage (L)": "Shower Usage (L)",
    "Drinking Water (L)": "Drinking Water (L)",
    "Cleaning (L)": "Cleaning (L)",
    "Other Usage (L)": "Other Usage (L)",
    "Calculate Daily Usage": "Calculate Daily Usage",
    "Water Saving Calculator": "Water Saving Calculator",
    "Current Usage (L)": "Current Usage (L)",
    "Water Saved (L)": "Water Saved (L)",
    "Calculate Saving": "Calculate Saving",
    "Choose Quiz Level": "Choose Quiz Level",
    "Easy": "Easy",
    "Medium": "Medium",
    "Hard": "Hard",
    "Next Question": "Next Question",
    "Stop Quiz": "Stop Quiz",
    "Your Profile": "Your Profile",
    "Change Photo": "Change Photo",
    "Name": "Name",
    "Username": "Username",
    "Save Profile": "Save Profile",
    "Quiz History": "Quiz History",
    "Reset App Data": "Reset App Data",
    "Good morning": "Good morning",
    "Good afternoon": "Good afternoon",
    "Good evening": "Good evening",
    "L": "L",
    "mL": "mL"
  },

  hi: {
    "Home": "होम",
    "Tips": "सलाह",
    "Rain": "बारिश",
    "Calculator": "कैलकुलेटर",
    "Quiz": "क्विज़",
    "My Profile": "मेरी प्रोफाइल",
    "Every Drop Matters.": "हर बूंद कीमती है।",
    "Today's Water Usage": "आज पानी का उपयोग",
    "Daily Goal": "रोज़ का लक्ष्य",
    "Current Streak": "लगातार लक्ष्य पूरा",
    "Best Streak": "सबसे अच्छा रिकॉर्ड",
    "Save Water Every Day": "हर दिन पानी बचाएँ",
    "Enter today's water usage": "आज का पानी उपयोग लिखें",
    "Save Usage": "उपयोग सेव करें",
    "Set Daily Goal": "रोज़ का लक्ष्य तय करें",
    "Update Goal": "लक्ष्य अपडेट करें",
    "Usage History": "उपयोग का इतिहास",
    "Daily Water Saving Tips": "पानी बचाने के सुझाव",
    "Daily Challenge": "आज की चुनौती",
    "Rainwater Harvesting": "वर्षा जल संचयन",
    "Calculate Rainwater": "बारिश के पानी की गणना",
    "Roof Area (m²)": "छत का क्षेत्रफल (m²)",
    "Rainfall (mm)": "बारिश (mm)",
    "Efficiency (%)": "क्षमता (%)",
    "Calculate": "गणना करें",
    "Daily Usage Calculator": "दैनिक उपयोग कैलकुलेटर",
    "Shower Usage (L)": "नहाने में पानी (L)",
    "Drinking Water (L)": "पीने का पानी (L)",
    "Cleaning (L)": "सफाई में पानी (L)",
    "Other Usage (L)": "अन्य उपयोग (L)",
    "Calculate Daily Usage": "दैनिक उपयोग निकालें",
    "Water Saving Calculator": "पानी बचत कैलकुलेटर",
    "Current Usage (L)": "वर्तमान उपयोग (L)",
    "Water Saved (L)": "बचाया गया पानी (L)",
    "Calculate Saving": "बचत निकालें",
    "Choose Quiz Level": "क्विज़ का स्तर चुनें",
    "Easy": "आसान",
    "Medium": "मध्यम",
    "Hard": "कठिन",
    "Next Question": "अगला सवाल",
    "Stop Quiz": "क्विज़ रोकें",
    "Your Profile": "आपकी प्रोफाइल",
    "Change Photo": "फोटो बदलें",
    "Name": "नाम",
    "Username": "यूज़रनेम",
    "Save Profile": "प्रोफाइल सेव करें",
    "Quiz History": "क्विज़ का इतिहास",
    "Reset App Data": "ऐप का डेटा रीसेट करें",
    "Good morning": "सुप्रभात",
    "Good afternoon": "नमस्कार",
    "Good evening": "शुभ संध्या",
    "L": "लीटर",
    "mL": "मिलीलीटर"
  },

  hinglish: {
    "Home": "Home",
    "Tips": "Tips",
    "Rain": "Rain",
    "Calculator": "Calculator",
    "Quiz": "Quiz",
    "My Profile": "Meri Profile",
    "Every Drop Matters.": "Har Boond Zaroori Hai.",
    "Today's Water Usage": "Aaj Ka Water Usage",
    "Daily Goal": "Daily Goal",
    "Current Streak": "Current Streak",
    "Best Streak": "Best Streak",
    "Save Water Every Day": "Har Din Paani Bachao",
    "Enter today's water usage": "Aaj ka water usage likhein",
    "Save Usage": "Usage Save Karein",
    "Set Daily Goal": "Daily Goal Set Karein",
    "Update Goal": "Goal Update Karein",
    "Usage History": "Usage History",
    "Daily Water Saving Tips": "Daily Water Saving Tips",
    "Daily Challenge": "Aaj Ka Challenge",
    "Rainwater Harvesting": "Rainwater Harvesting",
    "Calculate Rainwater": "Rainwater Calculate Karein",
    "Roof Area (m²)": "Roof Area (m²)",
    "Rainfall (mm)": "Rainfall (mm)",
    "Efficiency (%)": "Efficiency (%)",
    "Calculate": "Calculate Karein",
    "Daily Usage Calculator": "Daily Usage Calculator",
    "Shower Usage (L)": "Shower Usage (L)",
    "Drinking Water (L)": "Drinking Water (L)",
    "Cleaning (L)": "Cleaning (L)",
    "Other Usage (L)": "Other Usage (L)",
    "Calculate Daily Usage": "Daily Usage Calculate Karein",
    "Water Saving Calculator": "Water Saving Calculator",
    "Current Usage (L)": "Current Usage (L)",
    "Water Saved (L)": "Water Saved (L)",
    "Calculate Saving": "Saving Calculate Karein",
    "Choose Quiz Level": "Quiz Level Choose Karein",
    "Easy": "Easy",
    "Medium": "Medium",
    "Hard": "Hard",
    "Next Question": "Next Question",
    "Stop Quiz": "Quiz Rokein",
    "Your Profile": "Aapki Profile",
    "Change Photo": "Photo Change Karein",
    "Name": "Naam",
    "Username": "Username",
    "Save Profile": "Profile Save Karein",
    "Quiz History": "Quiz History",
    "Reset App Data": "App Data Reset Karein",
    "Good morning": "Good Morning",
    "Good afternoon": "Good Afternoon",
    "Good evening": "Good Evening",
    "L": "L",
    "mL": "mL"
  }
};

function translatePage() {
  const language = data.language || "en";
  const dictionary = translations[language] || translations.en;

  document.documentElement.lang = language === "hi" ? "hi" : "en";

  // Translate elements marked with data-i18n.
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dictionary[key]) el.textContent = dictionary[key];
  });

  // Translate matching standalone text nodes.
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const original = node.nodeValue.trim();
    if (!original || !dictionary[original]) return;

    const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
    const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
    node.nodeValue = leading + dictionary[original] + trailing;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (dictionary[key]) el.placeholder = dictionary[key];
  });

  renderApp();
}

/* =====================================
   NAVIGATION
   ===================================== */

function showSection(sectionName) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
    section.hidden = true;
  });

  const target = $(sectionName + "Section");
  if (target) {
    target.classList.add("active");
    target.hidden = false;
  }

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.section === sectionName
    );
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupNavigation() {
  document.querySelectorAll(".nav-item[data-section]").forEach((item) => {
    item.addEventListener("click", () => {
      showSection(item.dataset.section);
    });
  });
}

/* =====================================
   HOME DASHBOARD
   ===================================== */

function getTodayUsage() {
  const entry = data.usageHistory.find((item) => item.date === todayKey());
  return entry ? Number(entry.amount) : 0;
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good morning";

  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  if (hour >= 17) greeting = "Good evening";

  const lang = data.language;
  if (lang === "hi") {
    greeting = translations.hi[greeting];
  } else if (lang === "hinglish") {
    greeting = translations.hinglish[greeting];
  }

  safeText("greeting", greeting + ", " + data.name + "!");
}

function renderUsageHistory() {
  const container = $("usageHistory");
  if (!container) return;

  if (!data.usageHistory.length) {
    container.innerHTML = "<p>No usage history yet.</p>";
    return;
  }

  container.innerHTML = [...data.usageHistory]
    .slice(-7)
    .reverse()
    .map((item) => `
      <div class="history-item">
        <span>${item.date}</span>
        <strong>${formatNumber(item.amount)} L</strong>
      </div>
    `).join("");
}

function renderHome() {
  const usage = getTodayUsage();
  const goal = Number(data.dailyGoal) || 100;
  const percent = Math.min(100, Math.round((usage / goal) * 100));

  safeText("todayUsage", formatNumber(usage) + " L");
  safeText("goalValue", formatNumber(goal) + " L");
  safeText("streakValue", data.streak);
  safeText("bestStreak", data.bestStreak);

  const progressBar = $("progressBar");
  if (progressBar) progressBar.style.width = percent + "%";

  safeText("progressText", percent + "% of daily usage goal");

  const goalInput = $("goalInput");
  if (goalInput) goalInput.value = goal;

  renderUsageHistory();
  updateGreeting();
}

function updateStreak() {
  const today = todayKey();

  if (data.lastGoalDate === today) return;

  if (data.lastGoalDate === yesterdayKey()) {
    data.streak += 1;
  } else {
    data.streak = 1;
  }

  data.bestStreak = Math.max(data.bestStreak, data.streak);
  data.lastGoalDate = today;
}

function setupUsageForm() {
  const form = $("usageForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = $("usageAmount");
    const amount = Number(input?.value);

    if (!Number.isFinite(amount) || amount < 0) {
      alert("Please enter a valid water amount.");
      return;
    }

    const today = todayKey();
    const existing = data.usageHistory.find((item) => item.date === today);

    if (existing) {
      existing.amount = amount;
    } else {
      data.usageHistory.push({ date: today, amount });
    }

    if (amount <= Number(data.dailyGoal)) {
      updateStreak();
    }

    saveData();
    renderApp();
    form.reset();
  });
}

function setupGoalForm() {
  const form = $("goalForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const goal = Number($("goalInput")?.value);

    if (!Number.isFinite(goal) || goal <= 0) {
      alert("Please enter a valid goal.");
      return;
    }

    data.dailyGoal = goal;
    saveData();
    renderApp();
    alert("Daily goal updated!");
  });
}

/* =====================================
   TIPS AND CHALLENGE
   ===================================== */

const tips = [
  {
    icon: "🚰",
    title: "Turn Off the Tap",
    description: "Turn off the tap while brushing your teeth."
  },
  {
    icon: "🪣",
    title: "Use a Bucket",
    description: "Use a bucket instead of a running shower when possible."
  },
  {
    icon: "🌱",
    title: "Water Plants Wisely",
    description: "Water plants in the morning or evening."
  },
  {
    icon: "🔧",
    title: "Fix Leaks",
    description: "Report leaking taps and pipes."
  },
  {
    icon: "🧺",
    title: "Full Loads",
    description: "Run washing machines only with suitable full loads."
  },
  {
    icon: "🌧️",
    title: "Collect Rainwater",
    description: "Collect rainwater for gardening and cleaning."
  }
];

function renderTips() {
  const container = $("tipsContainer");
  if (!container) return;

  const todayIndex = new Date().getDate() % tips.length;
  const dailyTip = tips[todayIndex];

  container.innerHTML = `
    <article class="tip-card">
      <div class="tip-icon">${dailyTip.icon}</div>
      <h3>${dailyTip.title}</h3>
      <p>${dailyTip.description}</p>
    </article>
    ${tips.map((tip) => `
      <article class="tip-card">
        <div class="tip-icon">${tip.icon}</div>
        <h3>${tip.title}</h3>
        <p>${tip.description}</p>
      </article>
    `).join("")}
  `;
}

/* =====================================
   RAINWATER HARVESTING
   ===================================== */

function setupRainCalculator() {
  const form = $("rainForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const area = Number($("roofArea")?.value);
    const rainfall = Number($("rainfall")?.value);
    const efficiency = Number($("efficiency")?.value || 80);

    if (
      !Number.isFinite(area) || area <= 0 ||
      !Number.isFinite(rainfall) || rainfall < 0 ||
      !Number.isFinite(efficiency) || efficiency < 0 || efficiency > 100
    ) {
      alert("Please enter valid values.");
      return;
    }

    // 1 mm rainfall on 1 m² = 1 litre.
    const litres = area * rainfall * (efficiency / 100);

    const result = $("rainResult");
    if (result) {
      result.innerHTML = `
        <div class="result-card">
          <h3>Estimated Rainwater</h3>
          <strong>${formatNumber(Math.round(litres))} L</strong>
          <p>You could collect approximately this much water.</p>
        </div>
      `;
    }
  });
}

/* =====================================
   WATER CALCULATORS
   ===================================== */

function setupDailyCalculator() {
  const form = $("dailyCalcForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const ids = [
      "showerUsage",
      "drinkingUsage",
      "cleaningUsage",
      "otherUsage"
    ];

    const values = ids.map((id) => Number($(id)?.value || 0));

    if (values.some((value) => !Number.isFinite(value) || value < 0)) {
      alert("Please enter valid amounts.");
      return;
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    const result = $("dailyCalcResult");

    if (result) {
      result.innerHTML = `
        <div class="result-card">
          <h3>Total Daily Water Usage</h3>
          <strong>${formatNumber(total)} L</strong>
        </div>
      `;
    }
  });
}

function setupSavingCalculator() {
  const form = $("savingForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const current = Number($("currentUsage")?.value);
    const saved = Number($("savedUsage")?.value);

    if (
      !Number.isFinite(current) || current < 0 ||
      !Number.isFinite(saved) || saved < 0
    ) {
      alert("Please enter valid amounts.");
      return;
    }

    const remaining = Math.max(0, current - saved);
    const percentage = current > 0
      ? Math.min(100, (saved / current) * 100)
      : 0;

    const result = $("savingResult");

    if (result) {
      result.innerHTML = `
        <div class="result-card">
          <h3>Water Saving Result</h3>
          <strong>${formatNumber(saved)} L saved</strong>
          <p>Remaining usage: ${formatNumber(remaining)} L</p>
          <p>Saving: ${percentage.toFixed(1)}%</p>
        </div>
      `;
    }
  });
}

/* =====================================
   QUIZ QUESTIONS
   ===================================== */

const quizQuestions = {
  easy: [
    {
      q: "Which of these is a way to save water?",
      options: ["Leave taps running", "Turn off taps", "Waste water", "Ignore leaks"],
      answer: 1,
      explanation: "Turning off taps when not needed helps save water."
    },
    {
      q: "What is rainwater harvesting?",
      options: ["Collecting rainwater", "Wasting rainwater", "Heating water", "Making clouds"],
      answer: 0,
      explanation: "Rainwater harvesting means collecting and storing rainwater."
    },
    {
      q: "Which planet is known as the Blue Planet?",
      options: ["Mars", "Venus", "Earth", "Mercury"],
      answer: 2,
      explanation: "Earth looks blue from space because of its water."
    },
    {
      q: "Which water is safe to drink?",
      options: ["Clean drinking water", "Dirty water", "Flood water", "Drain water"],
      answer: 0,
      explanation: "Safe drinking water should be clean and treated."
    },
    {
      q: "What should you do if a tap is leaking?",
      options: ["Ignore it", "Keep it open", "Get it fixed", "Waste more water"],
      answer: 2,
      explanation: "Fixing leaks prevents unnecessary water waste."
    }
  ],

  medium: [
    {
      q: "Which process changes water vapour into liquid?",
      options: ["Evaporation", "Condensation", "Melting", "Freezing"],
      answer: 1,
      explanation: "Condensation changes water vapour into liquid droplets."
    },
    {
      q: "Which is a natural source of freshwater?",
      options: ["Ocean", "River", "Salt lake", "Sea"],
      answer: 1,
      explanation: "Rivers are an important source of freshwater."
    },
    {
      q: "What does groundwater mean?",
      options: ["Water in clouds", "Water under the ground", "Ocean water", "Rain in the air"],
      answer: 1,
      explanation: "Groundwater is water stored beneath Earth's surface."
    },
    {
      q: "Which activity can reduce water waste?",
      options: ["Repairing pipe leaks", "Leaving taps open", "Overwatering plants", "Washing roads daily"],
      answer: 0,
      explanation: "Repairing leaks helps prevent water loss."
    },
    {
      q: "What is the main source of energy for the water cycle?",
      options: ["Moon", "Sun", "Wind", "Soil"],
      answer: 1,
      explanation: "The Sun provides energy for evaporation."
    }
  ],

  hard: [
    {
      q: "What is the main purpose of a recharge pit?",
      options: ["Store plastic", "Help water enter the ground", "Heat water", "Make salt"],
      answer: 1,
      explanation: "Recharge pits help rainwater seep into the ground."
    },
    {
      q: "Which layer can store groundwater?",
      options: ["Aquifer", "Cloud", "Atmosphere", "Ozone layer"],
      answer: 0,
      explanation: "An aquifer is a layer of rock or sediment that stores groundwater."
    },
    {
      q: "What is water conservation?",
      options: ["Using water carefully", "Using more water", "Polluting rivers", "Draining lakes"],
      answer: 0,
      explanation: "Water conservation means protecting and using water wisely."
    },
    {
      q: "Which practice helps protect watersheds?",
      options: ["Deforestation", "Planting trees", "Dumping waste", "Soil pollution"],
      answer: 1,
      explanation: "Trees help protect soil and support healthy watersheds."
    },
    {
      q: "What does water scarcity mean?",
      options: ["Too much rainfall", "Not enough available water", "Clean oceans", "More rivers"],
      answer: 1,
      explanation: "Water scarcity happens when available water cannot meet demand."
    }
  ]
};

function startQuiz(level) {
  clearInterval(quizState.timer);

  quizState = {
    questions: [...(quizQuestions[level] || quizQuestions.easy)]
      .sort(() => Math.random() - 0.5),
    current: 0,
    score: 0,
    answers: [],
    timeLeft: 10,
    timer: null,
    level,
    finished: false
  };

  renderQuestion();
}

function renderQuestion() {
  const area = $("quizArea");
  if (!area) return;

  if (quizState.current >= quizState.questions.length) {
    finishQuiz();
    return;
  }

  const question = quizState.questions[quizState.current];

  safeText(
    "quizProgress",
    `Question ${quizState.current + 1} / ${quizState.questions.length}`
  );

  safeText("quizQuestion", question.q);
  safeText("quizFeedback", "");

  const options = $("quizOptions");
  if (options) {
    options.innerHTML = question.options.map((option, index) => `
      <button type="button" class="quiz-option" data-answer="${index}">
        ${option}
      </button>
    `).join("");

    options.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        answerQuestion(Number(button.dataset.answer));
      });
    });
  }

  const next = $("nextQuestion");
  if (next) next.hidden = true;

  const stop = $("stopQuiz");
  if (stop) stop.hidden = false;

  startQuizTimer();
}

function startQuizTimer() {
  clearInterval(quizState.timer);
  quizState.timeLeft = 10;
  updateTimer();

  quizState.timer = setInterval(() => {
    quizState.timeLeft -= 1;
    updateTimer();

    if (quizState.timeLeft <= 0) {
      answerQuestion(-1);
    }
  }, 1000);
}

function updateTimer() {
  safeText("quizTimer", quizState.timeLeft + "s");
}

function answerQuestion(selectedIndex) {
  if (quizState.finished || quizState.answers.length > quizState.current) return;

  clearInterval(quizState.timer);

  const question = quizState.questions[quizState.current];
  const correct = selectedIndex === question.answer;

  if (correct) quizState.score += 1;

  quizState.answers.push({
    selected: selectedIndex,
    correct
  });

  const options = $("quizOptions");

  if (options) {
    options.querySelectorAll("[data-answer]").forEach((button) => {
      button.disabled = true;
      const index = Number(button.dataset.answer);

      if (index === question.answer) {
        button.classList.add("correct");
      } else if (index === selectedIndex) {
        button.classList.add("incorrect");
      }
    });
  }

  const feedback = $("quizFeedback");
  if (feedback) {
    feedback.textContent =
      (correct ? "Correct! " : "Not quite. ") + question.explanation;
  }

  const next = $("nextQuestion");
  if (next) next.hidden = false;
}

function finishQuiz() {
  clearInterval(quizState.timer);
  quizState.finished = true;

  const total = quizState.questions.length;
  const accuracy = total ? Math.round((quizState.score / total) * 100) : 0;

  const record = {
    date: todayKey(),
    level: quizState.level,
    score: quizState.score,
    total,
    accuracy
  };

  data.quizHistory.push(record);
  data.quizHistory = data.quizHistory.slice(-30);
  saveData();

  const area = $("quizArea");

  if (area) {
    area.innerHTML = `
      <div class="result-card">
        <h2>Quiz Completed! 🎉</h2>
        <h3>Score: ${quizState.score} / ${total}</h3>
        <p>Accuracy: ${accuracy}%</p>
        <p>Level: ${quizState.level}</p>
        <button type="button" class="btn" id="playAgainButton">
          Play Again
        </button>
      </div>
    `;

    $("playAgainButton")?.addEventListener("click", () => {
      startQuiz(quizState.level);
    });
  }

  safeText("quizProgress", "Quiz completed");
  safeText("quizTimer", "");

  const stop = $("stopQuiz");
  if (stop) stop.hidden = true;

  renderQuizHistory();
}

function renderQuizHistory() {
  document.querySelectorAll("#scoreHistory").forEach((container) => {
    if (!container) return;

    if (!data.quizHistory.length) {
      container.innerHTML = "<p>No quiz scores yet.</p>";
      return;
    }

    container.innerHTML = [...data.quizHistory]
      .slice(-5)
      .reverse()
      .map((item) => `
        <div class="history-item">
          <span>${item.date} · ${item.level}</span>
          <strong>${item.score}/${item.total} (${item.accuracy}%)</strong>
        </div>
      `).join("");
  });
}

function setupQuiz() {
  document.querySelectorAll("[data-quiz-level]").forEach((button) => {
    button.addEventListener("click", () => {
      startQuiz(button.dataset.quizLevel);
    });
  });

  $("nextQuestion")?.addEventListener("click", () => {
    quizState.current += 1;
    renderQuestion();
  });

  $("stopQuiz")?.addEventListener("click", () => {
    clearInterval(quizState.timer);
    quizState.finished = true;

    const area = $("quizArea");
    if (area) area.innerHTML = "<p>Quiz stopped. Choose a level to play again.</p>";

    safeText("quizProgress", "");
    safeText("quizTimer", "");
  });
}

/* =====================================
   PROFILE
   ===================================== */

function renderProfile() {
  safeText("profileName", data.name);
  safeText("profileUsername", data.username);

  const nameInput = $("nameInput");
  const usernameInput = $("usernameInput");

  if (nameInput) nameInput.value = data.name;
  if (usernameInput) usernameInput.value = data.username;

  const avatar = $("profileAvatar");

  if (avatar) {
    if (data.photo) {
      avatar.innerHTML = `<img src="${data.photo}" alt="Profile photo">`;
    } else {
      avatar.textContent = "💧";
    }
  }

  renderQuizHistory();
}

function setupProfile() {
  const form = $("profileForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      data.name = $("nameInput")?.value.trim() || "Water Saver";
      data.username = $("usernameInput")?.value.trim() || "@watersaver";

      saveData();
      renderApp();
      alert("Profile updated!");
    });
  }

  $("photoInput")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      data.photo = reader.result;
      saveData();
      renderProfile();
    };

    reader.readAsDataURL(file);
  });

  $("resetButton")?.addEventListener("click", () => {
    const confirmed = confirm(
      "Are you sure you want to reset all app data?"
    );

    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    data = { ...defaultData };
    saveData();
    clearInterval(quizState.timer);
    renderApp();
    showSection("home");
  });
}

/* =====================================
   LANGUAGE SELECTOR
   ===================================== */

function setupLanguage() {
  const selector = $("languageSelect");
  if (!selector) return;

  selector.value = data.language;

  selector.addEventListener("change", () => {
    const selected = selector.value;

    if (!["en", "hi", "hinglish"].includes(selected)) return;

    data.language = selected;
    saveData();
    translatePage();
  });
}

/* =====================================
   RENDER ALL
   ===================================== */

function renderApp() {
  renderHome();
  renderTips();
  renderProfile();
}

function setupApp() {
  // Show only Home at first.
  document.querySelectorAll(".section").forEach((section) => {
    section.hidden = !section.classList.contains("active");
  });

  setupNavigation();
  setupUsageForm();
  setupGoalForm();
  setupRainCalculator();
  setupDailyCalculator();
  setupSavingCalculator();
  setupQuiz();
  setupProfile();
  setupLanguage();

  renderApp();
  translatePage();

  // Register offline service worker.
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", setupApp);
