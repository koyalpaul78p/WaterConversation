<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WaterConversation - Every Drop Matters</title>
<meta name="description" content="Learn to save water and protect our environment.">
<meta name="theme-color" content="#e88eae">

<link rel="stylesheet" href="./style.css">
<link rel="manifest" href="./manifest.webmanifest">

<style>
/* SOFT PINK DESIGN */
body {
  background: linear-gradient(135deg,#fff1f6,#ffe3ed);
  color: #593b49;
}
.logo-icon {
  display:flex;
  align-items:center;
  justify-content:center;
}
.logo-icon svg { width:42px;height:42px; }
.visual-banner {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:18px;
  margin:15px 0;
  border-radius:22px;
  background:linear-gradient(135deg,#ffe0eb,#fff8fb);
  border:1px solid #f4cbd9;
}
.visual-banner p { max-width:230px; }
.visual-art { width:120px;max-width:40%; }
.pink-heading { color:#c85d86; }
.card,.stat-card {
  border-color:#f4d5e1;
}
.section-image {
  width:100%;
  border-radius:18px;
  display:block;
  margin:12px 0;
}
.rain-illustration {
  display:flex;
  justify-content:center;
  padding:10px;
}
.rain-illustration svg {
  width:100%;
  max-width:320px;
}
</style>
</head>

<body>
<div class="app">

<!-- HEADER -->
<header class="header">
  <div class="logo">
    <div class="logo-icon">
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4C25 17 12 29 12 41c0 12 9 19 20 19s20-7 20-19C52 29 39 17 32 4Z"
        fill="#e88eae"/>
        <path d="M22 41c0-7 5-14 9-20"
        fill="none" stroke="white" stroke-width="4"
        stroke-linecap="round"/>
        <circle cx="43" cy="46" r="3" fill="white"/>
      </svg>
    </div>
    <span>WaterConversation</span>
  </div>

  <select id="languageSelect" class="language-select">
    <option value="en">English</option>
    <option value="hi">हिंदी</option>
    <option value="hinglish">Hinglish</option>
  </select>
</header>

<main>

<!-- HOME -->
<section id="homeSection" class="section active">

  <div class="welcome">
    <h1 id="greeting">Good Morning!</h1>
    <p>Welcome to your water-saving journey.</p>
    <p class="tagline">Every Drop Matters. 💧</p>
  </div>

  <div class="visual-banner">
    <div>
      <h2 class="pink-heading">Save Water, Save Life</h2>
      <p>Small drops create a beautiful future!</p>
    </div>
    <svg class="visual-art" viewBox="0 0 160 150">
      <circle cx="80" cy="78" r="65" fill="#ffd4e3"/>
      <path d="M80 20C65 45 42 67 42 91a38 38 0 0 0 76 0c0-24-23-46-38-71Z"
      fill="#e88eae"/>
      <path d="M60 88c0-13 10-27 18-38"
      stroke="white" stroke-width="7" fill="none"
      stroke-linecap="round"/>
    </svg>
  </div>

  <div class="card-grid">
    <div class="stat-card">
      <div class="icon">💧</div>
      <h3 id="todayUsage">0 L</h3>
      <p>Today's Water Usage</p>
    </div>
    <div class="stat-card">
      <div class="icon">🎯</div>
      <h3 id="goalValue">100 L</h3>
      <p>Daily Saving Goal</p>
    </div>
    <div class="stat-card">
      <div class="icon">🔥</div>
      <h3 id="streakValue">0</h3>
      <p>Current Streak</p>
    </div>
    <div class="stat-card">
      <div class="icon">🏆</div>
      <h3 id="bestStreak">0</h3>
      <p>Best Streak</p>
    </div>
  </div>

  <div class="card">
    <h2>💗 Water Saving Progress</h2>
    <div class="progress-container">
      <div id="progressBar" class="progress-bar"></div>
    </div>
    <p id="progressText">0% completed</p>
  </div>

  <div class="card">
    <h2>💧 Add Daily Water Usage</h2>
    <form id="usageForm">
      <div class="form-group">
        <label for="usageAmount">Water Usage (Litres)</label>
        <input type="number" id="usageAmount"
        placeholder="Enter water usage" min="0.01"
        step="0.01" required>
      </div>
      <button type="submit" class="btn">Save Water Usage</button>
    </form>
  </div>

  <div class="card">
    <h2>🎯 Set Daily Goal</h2>
    <form id="goalForm">
      <div class="form-group">
        <label for="goalInput">Daily Goal (Litres)</label>
        <input type="number" id="goalInput"
        min="1" placeholder="Example: 100" required>
      </div>
      <button type="submit" class="btn">Update Goal</button>
    </form>
  </div>

  <div class="card">
    <h2>📊 Water Usage History</h2>
    <div id="usageHistory">
      <p class="empty-state">Your usage history will appear here.</p>
    </div>
  </div>

  <div class="card">
    <h2>🌱 Start Saving Water Today</h2>
    <p>Small steps can make a big difference. Save water and protect nature.</p>
    <button class="btn" onclick="showSection('tips')">
      Explore Water Saving Tips
    </button>
  </div>
</section>

<!-- TIPS -->
<section id="tipsSection" class="section">

  <div class="welcome">
    <h1>🌱 Water Saving Tips</h1>
    <p>Small habits, big changes.</p>
  </div>

  <div class="visual-banner">
    <div>
      <h2 class="pink-heading">Love Nature 🌿</h2>
      <p>Save water today for a greener tomorrow.</p>
    </div>
    <svg class="visual-art" viewBox="0 0 160 150">
      <circle cx="80" cy="75" r="65" fill="#ffe0eb"/>
      <path d="M80 120V55" stroke="#78ad82"
      stroke-width="7" stroke-linecap="round"/>
      <path d="M80 82C38 82 39 42 70 48
      C89 52 89 68 80 82Z" fill="#83bd91"/>
      <path d="M80 70C84 35 125 35 125 59
      C125 78 99 83 80 70Z" fill="#a4d1a0"/>
      <path d="M43 120h75l-9 17H52Z" fill="#d88ca9"/>
    </svg>
  </div>

  <div class="card">
    <h2>Today's Water Saving Challenge</h2>
    <p>Try one new water-saving habit today.</p>
    <button class="btn"
    onclick="completeChallenge('Daily water saving challenge')">
      Complete Today's Challenge
    </button>
  </div>

  <div id="tipsContainer">
    <p class="empty-state">Loading water-saving tips...</p>
  </div>
</section>

<!-- RAIN -->
<section id="rainSection" class="section">

  <div class="welcome">
    <h1>🌧️ Rainwater Harvesting</h1>
    <p>Collect rainwater. Save our future.</p>
  </div>

  <div class="rain-hero">
    <div class="rain-illustration">
      <svg viewBox="0 0 320 180">
        <circle cx="260" cy="35" r="24" fill="#ffd1e1"/>
        <path d="M48 88 155 20l107 68"
        fill="none" stroke="#b96e8d" stroke-width="12"
        stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M72 82v78h166V82"
        fill="#fff8fb" stroke="#d88ca9" stroke-width="5"/>
        <rect x="135" y="108" width="42" height="52"
        rx="5" fill="#f3bfd1"/>
        <path d="M105 4l-8 20m58-20-8 20m58-20-8 20"
        stroke="#83b9d2" stroke-width="6"
        stroke-linecap="round"/>
        <path d="M24 170q30-15 60 0t60 0t60 0t60 0"
        fill="none" stroke="#86bfd0" stroke-width="6"/>
      </svg>
    </div>

    <h2>What is Rainwater Harvesting?</h2>
    <p>Rainwater harvesting is the process of collecting and storing rainwater for future use.</p>
  </div>

  <div class="card">
    <h2>🏠 How Does It Work?</h2>
    <p>1. Rain falls on the rooftop.</p>
    <p>2. Pipes carry the rainwater.</p>
    <p>3. A filter removes dirt and debris.</p>
    <p>4. Water is collected in a storage tank.</p>
    <p>5. Stored water can be used for suitable non-drinking purposes.</p>
  </div>

  <div class="card">
    <h2>🌿 Benefits</h2>
    <p>💧 Helps conserve water.</p>
    <p>🌱 Supports gardening.</p>
    <p>🏡 Can reduce dependence on other water sources.</p>
    <p>🌍 Helps protect the environment.</p>
  </div>

  <div class="card">
    <h2>🧮 Rainwater Harvesting Calculator</h2>
    <form id="rainForm">
      <div class="form-group">
        <label for="roofArea">Roof Area (Square Metres)</label>
        <input type="number" id="roofArea"
        min="0.01" step="0.01" placeholder="Example: 100" required>
      </div>
      <div class="form-group">
        <label for="rainfall">Rainfall (Millimetres)</label>
        <input type="number" id="rainfall"
        min="0" step="0.01" placeholder="Example: 50" required>
      </div>
      <div class="form-group">
        <label for="efficiency">Collection Efficiency (%)</label>
        <input type="number" id="efficiency"
        min="0" max="100" value="80" required>
      </div>
      <button type="submit" class="btn">Calculate Rainwater</button>
    </form>
    <div id="rainResult"></div>
  </div>
</section>

<!-- CALCULATOR -->
<section id="calculatorSection" class="section">

  <div class="welcome">
    <h1>🧮 Water Calculator</h1>
    <p>Calculate your water usage and savings.</p>
  </div>

  <div class="card">
    <h2>💧 Daily Water Usage Calculator</h2>
    <form id="dailyCalcForm">
      <div class="form-group">
        <label for="showerUsage">Bathing / Shower (Litres)</label>
        <input type="number" id="showerUsage" min="0" value="0" required>
      </div>
      <div class="form-group">
        <label for="drinkingUsage">Drinking (Litres)</label>
        <input type="number" id="drinkingUsage" min="0" value="0" required>
      </div>
      <div class="form-group">
        <label for="cleaningUsage">Cleaning (Litres)</label>
        <input type="number" id="cleaningUsage" min="0" value="0" required>
      </div>
      <div class="form-group">
        <label for="otherUsage">Other Uses (Litres)</label>
        <input type="number" id="otherUsage" min="0" value="0" required>
      </div>
      <button type="submit" class="btn">Calculate Daily Usage</button>
    </form>
    <div id="dailyCalcResult"></div>
  </div>

  <div class="card">
    <h2>🌱 Water Saving Calculator</h2>
    <form id="savingForm">
      <div class="form-group">
        <label for="currentUsage">Current Water Usage (Litres)</label>
        <input type="number" id="currentUsage" min="0"
        step="0.01" placeholder="Enter current usage" required>
      </div>
      <div class="form-group">
        <label for="savedUsage">Water Saved (Litres)</label>
        <input type="number" id="savedUsage" min="0"
        step="0.01" placeholder="Enter saved water" required>
      </div>
      <button type="submit" class="btn">Calculate Water Saving</button>
    </form>
    <div id="savingResult"></div>
  </div>
</section>

<!-- QUIZ -->
<section id="quizSection" class="section">

  <div class="welcome">
    <h1>🏆 Water Conservation Quiz</h1>
    <p>Test your knowledge and learn something new!</p>
  </div>

  <div class="card">
    <h2>Select Difficulty</h2>
    <p>Choose your quiz level.</p>
    <button class="btn" data-quiz-level="easy">🟢 Easy Level</button>
    <button class="btn" data-quiz-level="medium">🟡 Medium Level</button>
    <button class="btn" data-quiz-level="hard">🔴 Hard Level</button>
  </div>

  <div id="quizArea" style="display:none;">
    <div class="card">
      <div class="quiz-timer">⏱️ <span id="quizTimer">10</span> sec</div>
      <p id="quizProgress">Question 1</p>
      <div id="quizQuestion" class="quiz-question">Your question will appear here.</div>
      <div id="quizOptions"></div>
      <div id="quizFeedback"></div>
      <button id="nextQuestion" class="btn" style="display:none;">Next Question</button>
      <button id="stopQuiz" class="btn btn-secondary">Stop Quiz</button>
    </div>
  </div>

  <div class="card">
    <h2>🏅 My High Scores</h2>
    <div id="scoreHistory">
      <p class="empty-state">Your quiz scores will appear here.</p>
    </div>
  </div>
</section>

<!-- PROFILE -->
<section id="profileSection" class="section">

  <div class="welcome">
    <h1>👤 My Profile</h1>
    <p>Your personal water-saving space.</p>
  </div>

  <div class="card">
    <div class="profile-info">
      <div id="profileAvatar" class="profile-avatar">💧</div>
      <h2 id="profileName">Water Saver</h2>
      <p id="profileUsername">@watersaver</p>
    </div>

    <div class="form-group">
      <label for="photoInput">Choose Profile Photo</label>
      <input type="file" id="photoInput" accept="image/*">
    </div>
  </div>

  <div class="card">
    <h2>✏️ Edit Profile</h2>
    <form id="profileForm">
      <div class="form-group">
        <label for="nameInput">Your Name</label>
        <input type="text" id="nameInput" placeholder="Enter your name" required>
      </div>
      <div class="form-group">
        <label for="usernameInput">Username</label>
        <input type="text" id="usernameInput" placeholder="Enter username" required>
      </div>
      <button type="submit" class="btn">Save Profile</button>
    </form>
  </div>

  <div class="card">
    <h2>🎯 My Daily Goal</h2>
    <p>Set your daily water-saving target from the Home section.</p>
    <button class="btn btn-secondary" onclick="showSection('home')">Go to Home</button>
  </div>

  <div class="card">
    <h2>🏆 My Quiz Records</h2>
    <div id="scoreHistory"></div>
  </div>

  <div class="card">
    <h2>⚙️ App Data</h2>
    <p>Your information is saved locally in this browser.</p>
    <button id="resetButton" class="btn btn-danger">Reset App Data</button>
  </div>

  <div class="card">
    <h2>💧 WaterConversation</h2>
    <p>Every Drop Matters.</p>
    <p>Thank you for helping protect our planet.</p>
  </div>
</section>
</main>

<!-- BOTTOM NAVIGATION -->
<nav class="bottom-nav">
  <button class="nav-item active" data-section="home">
    <span class="nav-icon">🏠</span><span>Home</span>
  </button>
  <button class="nav-item" data-section="tips">
    <span class="nav-icon">🌱</span><span>Tips</span>
  </button>
  <button class="nav-item" data-section="rain">
    <span class="nav-icon">🌧️</span><span>Rain</span>
  </button>
  <button class="nav-item" data-section="calculator">
    <span class="nav-icon">🧮</span><span>Calculate</span>
  </button>
  <button class="nav-item" data-section="quiz">
    <span class="nav-icon">🏆</span><span>Quiz</span>
  </button>
  <button class="nav-item" data-section="profile">
    <span class="nav-icon">👤</span><span>Profile</span>
  </button>
</nav>

</div>

<script src="./app.js"></script>
</body>
</html>
