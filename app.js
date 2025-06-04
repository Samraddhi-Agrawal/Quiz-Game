// Quiz Game JavaScript

// Game state and data
let gameState = {
    selectedCategory: null,
    selectedQuestions: 5,
    selectedTimer: 30,
    currentQuestionIndex: 0,
    score: 0,
    questions: [],
    userAnswers: [],
    timeRemaining: 30,
    timerInterval: null,
    startTime: null,
    endTime: null,
    isAnswered: false
};

// Question database
const questionDatabase = {
    "Indian History": [
        {"question": "Who is known as the Father of the Nation in India?", "options": ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhash Chandra Bose"], "answer": 1},
        {"question": "When did India gain independence?", "options": ["15th August 1947", "26th January 1950", "15th August 1946", "26th January 1947"], "answer": 0},
        {"question": "Who was India's first Prime Minister?", "options": ["Mahatma Gandhi", "Sardar Patel", "Jawaharlal Nehru", "Dr. Rajendra Prasad"], "answer": 2},
        {"question": "In which year was the Quit India Movement launched?", "options": ["1940", "1941", "1942", "1943"], "answer": 2},
        {"question": "Who founded the Maurya Empire?", "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"], "answer": 1},
        {"question": "The First War of Indian Independence took place in:", "options": ["1857", "1856", "1858", "1859"], "answer": 0},
        {"question": "Who wrote 'Vande Mataram'?", "options": ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Kavi Pradeep"], "answer": 1},
        {"question": "When was the Battle of Plassey fought?", "options": ["1757", "1764", "1761", "1756"], "answer": 0},
        {"question": "Who was known as the 'Iron Man of India'?", "options": ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Subhash Chandra Bose", "Bhagat Singh"], "answer": 1},
        {"question": "The Indian National Congress was founded in:", "options": ["1885", "1884", "1886", "1887"], "answer": 0},
        {"question": "Who led the Dandi March?", "options": ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Lala Lajpat Rai"], "answer": 1},
        {"question": "When did the Jallianwala Bagh massacre take place?", "options": ["1919", "1918", "1920", "1921"], "answer": 0},
        {"question": "Who was the first woman Prime Minister of India?", "options": ["Sarojini Naidu", "Indira Gandhi", "Sonia Gandhi", "Pratibha Patil"], "answer": 1},
        {"question": "The Sepoy Mutiny started from:", "options": ["Delhi", "Meerut", "Lucknow", "Kanpur"], "answer": 1},
        {"question": "Who was known as Netaji?", "options": ["Bhagat Singh", "Chandrashekhar Azad", "Subhash Chandra Bose", "Lala Lajpat Rai"], "answer": 2},
        {"question": "When was the Partition of Bengal?", "options": ["1905", "1906", "1904", "1907"], "answer": 0},
        {"question": "Who founded the Arya Samaj?", "options": ["Ram Mohan Roy", "Dayananda Saraswati", "Keshav Chandra Sen", "Ishwar Chandra Vidyasagar"], "answer": 1},
        {"question": "The Simon Commission arrived in India in:", "options": ["1928", "1927", "1929", "1926"], "answer": 0},
        {"question": "Who was the first President of India?", "options": ["Dr. Rajendra Prasad", "Dr. S. Radhakrishnan", "Dr. Zakir Hussain", "V.V. Giri"], "answer": 0},
        {"question": "When did the Non-Cooperation Movement start?", "options": ["1920", "1921", "1919", "1922"], "answer": 0}
    ],
    "Indian Geography": [
        {"question": "Which is the longest river in India?", "options": ["Yamuna", "Ganga", "Godavari", "Krishna"], "answer": 1},
        {"question": "What is the capital of Maharashtra?", "options": ["Pune", "Nagpur", "Mumbai", "Nashik"], "answer": 2},
        {"question": "Which state is known as the 'Land of Five Rivers'?", "options": ["Haryana", "Punjab", "Uttar Pradesh", "Himachal Pradesh"], "answer": 1},
        {"question": "The Thar Desert is located in:", "options": ["Gujarat", "Rajasthan", "Haryana", "Punjab"], "answer": 1},
        {"question": "Which is the highest mountain peak in India?", "options": ["K2", "Kanchenjunga", "Nanda Devi", "Mount Everest"], "answer": 1},
        {"question": "Goa was liberated from which country?", "options": ["Britain", "France", "Portugal", "Netherlands"], "answer": 2},
        {"question": "Which river is known as the 'Sorrow of Bihar'?", "options": ["Ganga", "Yamuna", "Kosi", "Son"], "answer": 2},
        {"question": "The southernmost point of India is:", "options": ["Kanyakumari", "Rameshwaram", "Indira Point", "Point Calimere"], "answer": 2},
        {"question": "Which state has the longest coastline?", "options": ["Tamil Nadu", "Andhra Pradesh", "Gujarat", "Kerala"], "answer": 2},
        {"question": "The Western Ghats are also known as:", "options": ["Sahyadri", "Nilgiris", "Aravalli", "Vindhyas"], "answer": 0},
        {"question": "Which is the largest state by area?", "options": ["Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Maharashtra"], "answer": 2},
        {"question": "The Sundarbans are located in:", "options": ["Odisha", "West Bengal", "Assam", "Bihar"], "answer": 1},
        {"question": "Which city is known as the 'Silicon Valley of India'?", "options": ["Pune", "Hyderabad", "Chennai", "Bangalore"], "answer": 3},
        {"question": "The Deccan Plateau is located in:", "options": ["Northern India", "Eastern India", "Southern India", "Western India"], "answer": 2},
        {"question": "Which is the smallest state in India?", "options": ["Sikkim", "Tripura", "Goa", "Manipur"], "answer": 2},
        {"question": "The capital of Himachal Pradesh is:", "options": ["Shimla", "Dharamshala", "Manali", "Kullu"], "answer": 0},
        {"question": "Which river is called the 'Dakshin Ganga'?", "options": ["Krishna", "Cauvery", "Godavari", "Tungabhadra"], "answer": 2},
        {"question": "The Nilgiri Hills are located in:", "options": ["Kerala", "Karnataka", "Tamil Nadu", "All of the above"], "answer": 3},
        {"question": "Which is the largest lake in India?", "options": ["Dal Lake", "Chilika Lake", "Vembanad Lake", "Loktak Lake"], "answer": 1},
        {"question": "The Tropic of Cancer passes through which Indian state?", "options": ["Rajasthan", "Gujarat", "Madhya Pradesh", "All of the above"], "answer": 3}
    ],
    "Mathematics": [
        {"question": "What is 7 × 8?", "options": ["54", "56", "58", "64"], "answer": 1},
        {"question": "How many sides does a pentagon have?", "options": ["4", "5", "6", "7"], "answer": 1},
        {"question": "What is 50% of 100?", "options": ["25", "50", "75", "100"], "answer": 1},
        {"question": "What is the square root of 144?", "options": ["11", "12", "13", "14"], "answer": 1},
        {"question": "What is 15 + 27?", "options": ["42", "43", "41", "44"], "answer": 0},
        {"question": "What is 100 ÷ 4?", "options": ["20", "25", "30", "35"], "answer": 1},
        {"question": "How many degrees are in a right angle?", "options": ["45", "60", "90", "180"], "answer": 2},
        {"question": "What is 9 × 9?", "options": ["72", "81", "90", "99"], "answer": 1},
        {"question": "What is 3/4 as a decimal?", "options": ["0.25", "0.50", "0.75", "1.00"], "answer": 2},
        {"question": "How many faces does a cube have?", "options": ["4", "6", "8", "12"], "answer": 1},
        {"question": "What is 13 - 8?", "options": ["4", "5", "6", "7"], "answer": 1},
        {"question": "What is the next number in the sequence: 2, 4, 6, 8, ?", "options": ["9", "10", "11", "12"], "answer": 1},
        {"question": "What is the area of a rectangle with length 6 and width 4?", "options": ["20", "22", "24", "26"], "answer": 2},
        {"question": "What is 45 ÷ 5?", "options": ["8", "9", "10", "11"], "answer": 1},
        {"question": "How many minutes are in 2 hours?", "options": ["100", "110", "120", "130"], "answer": 2},
        {"question": "What is 6²?", "options": ["12", "24", "36", "42"], "answer": 2},
        {"question": "What is the perimeter of a square with side 5?", "options": ["15", "20", "25", "30"], "answer": 1},
        {"question": "What is 1/2 + 1/4?", "options": ["1/6", "2/6", "3/4", "1/8"], "answer": 2},
        {"question": "How many sides does a hexagon have?", "options": ["5", "6", "7", "8"], "answer": 1},
        {"question": "What is 84 ÷ 12?", "options": ["6", "7", "8", "9"], "answer": 1}
    ],
    "Science": [
        {"question": "What is the largest organ in the human body?", "options": ["Heart", "Liver", "Skin", "Brain"], "answer": 2},
        {"question": "Which planet is known as the Red Planet?", "options": ["Venus", "Mars", "Jupiter", "Saturn"], "answer": 1},
        {"question": "What gas do plants release during photosynthesis?", "options": ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], "answer": 1},
        {"question": "How many bones are in an adult human body?", "options": ["186", "206", "226", "246"], "answer": 1},
        {"question": "What is the speed of light?", "options": ["300,000 km/s", "3,000,000 km/s", "30,000 km/s", "300,000,000 m/s"], "answer": 0},
        {"question": "Which gas is most abundant in Earth's atmosphere?", "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], "answer": 2},
        {"question": "What is the chemical formula for water?", "options": ["H2O", "CO2", "NaCl", "O2"], "answer": 0},
        {"question": "How many chambers does a human heart have?", "options": ["2", "3", "4", "5"], "answer": 2},
        {"question": "What is the hardest natural substance?", "options": ["Gold", "Iron", "Diamond", "Platinum"], "answer": 2},
        {"question": "Which blood type is known as the universal donor?", "options": ["A", "B", "AB", "O"], "answer": 3},
        {"question": "What is the center of an atom called?", "options": ["Electron", "Proton", "Nucleus", "Neutron"], "answer": 2},
        {"question": "How long does it take for Earth to orbit the Sun?", "options": ["365 days", "366 days", "364 days", "360 days"], "answer": 0},
        {"question": "What is the smallest unit of matter?", "options": ["Molecule", "Atom", "Cell", "Gene"], "answer": 1},
        {"question": "Which vitamin helps the body absorb calcium?", "options": ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], "answer": 3},
        {"question": "What is the boiling point of water at sea level?", "options": ["90°C", "100°C", "110°C", "120°C"], "answer": 1},
        {"question": "How many legs does a spider have?", "options": ["6", "8", "10", "12"], "answer": 1},
        {"question": "What is the largest mammal in the world?", "options": ["Elephant", "Blue Whale", "Giraffe", "Hippo"], "answer": 1},
        {"question": "Which part of the plant conducts photosynthesis?", "options": ["Root", "Stem", "Leaf", "Flower"], "answer": 2},
        {"question": "What is the chemical symbol for gold?", "options": ["Go", "Gd", "Au", "Ag"], "answer": 2},
        {"question": "How many teeth do most adults have?", "options": ["28", "30", "32", "34"], "answer": 2}
    ]
};

// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

// Welcome screen elements
const categoryButtons = document.querySelectorAll('.category-btn');
const questionButtons = document.querySelectorAll('[data-questions]');
const timerButtons = document.querySelectorAll('[data-timer]');
const startQuizBtn = document.getElementById('start-quiz-btn');

// Quiz screen elements
const questionCounter = document.getElementById('question-counter');
const currentScore = document.getElementById('current-score');
const timerProgress = document.getElementById('timer-progress');
const timerText = document.getElementById('timer-text');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-answer-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');

// Results screen elements
const finalScoreNumber = document.getElementById('final-score-number');
const performanceMessage = document.getElementById('performance-message');
const totalQuestions = document.getElementById('total-questions');
const correctAnswers = document.getElementById('correct-answers');
const timeTaken = document.getElementById('time-taken');
const quizCategory = document.getElementById('quiz-category');
const playAgainBtn = document.getElementById('play-again-btn');
const changeCategoryBtn = document.getElementById('change-category-btn');

// Event listeners
document.addEventListener('DOMContentLoaded', initializeGame);

// Category selection
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        gameState.selectedCategory = button.dataset.category;
        updateStartButton();
    });
});

// Question count selection
questionButtons.forEach(button => {
    button.addEventListener('click', () => {
        questionButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        gameState.selectedQuestions = parseInt(button.dataset.questions);
    });
});

// Timer selection
timerButtons.forEach(button => {
    button.addEventListener('click', () => {
        timerButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        gameState.selectedTimer = parseInt(button.dataset.timer);
    });
});

// Start quiz
startQuizBtn.addEventListener('click', startQuiz);

// Answer selection
optionButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectAnswer(index));
});

// Next question
nextQuestionBtn.addEventListener('click', nextQuestion);

// Results actions
playAgainBtn.addEventListener('click', playAgain);
changeCategoryBtn.addEventListener('click', changeCategory);

// Functions
function initializeGame() {
    showScreen('welcome');
    resetGameState();
}

function resetGameState() {
    gameState = {
        selectedCategory: null,
        selectedQuestions: 5,
        selectedTimer: 30,
        currentQuestionIndex: 0,
        score: 0,
        questions: [],
        userAnswers: [],
        timeRemaining: 30,
        timerInterval: null,
        startTime: null,
        endTime: null,
        isAnswered: false
    };
}

function updateStartButton() {
    startQuizBtn.disabled = !gameState.selectedCategory;
}

function startQuiz() {
    // Prepare questions
    const categoryQuestions = questionDatabase[gameState.selectedCategory];
    gameState.questions = shuffleArray([...categoryQuestions]).slice(0, gameState.selectedQuestions);
    gameState.userAnswers = new Array(gameState.selectedQuestions).fill(null);
    gameState.startTime = Date.now();
    
    showScreen('quiz');
    loadQuestion();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadQuestion() {
    const question = gameState.questions[gameState.currentQuestionIndex];
    
    // Update UI
    questionCounter.textContent = `Question ${gameState.currentQuestionIndex + 1} of ${gameState.selectedQuestions}`;
    currentScore.textContent = `Score: ${gameState.score}`;
    questionText.textContent = question.question;
    
    // Load options
    optionButtons.forEach((button, index) => {
        const optionText = button.querySelector('.option-text');
        optionText.textContent = question.options[index];
        button.classList.remove('selected', 'correct', 'incorrect');
        button.disabled = false;
    });
    
    // Reset timer
    gameState.timeRemaining = gameState.selectedTimer;
    gameState.isAnswered = false;
    updateTimer();
    startTimer();
    
    // Hide next button
    nextQuestionBtn.classList.add('hidden');
}

function startTimer() {
    clearInterval(gameState.timerInterval);
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        updateTimer();
        
        if (gameState.timeRemaining <= 0) {
            timeUp();
        }
    }, 1000);
}

function updateTimer() {
    const percentage = (gameState.timeRemaining / gameState.selectedTimer) * 100;
    timerProgress.style.width = `${percentage}%`;
    timerText.textContent = gameState.timeRemaining;
}

function selectAnswer(selectedIndex) {
    if (gameState.isAnswered) return;
    
    gameState.isAnswered = true;
    clearInterval(gameState.timerInterval);
    
    const question = gameState.questions[gameState.currentQuestionIndex];
    const correctIndex = question.answer;
    
    // Store user answer
    gameState.userAnswers[gameState.currentQuestionIndex] = selectedIndex;
    
    // Update score
    if (selectedIndex === correctIndex) {
        gameState.score++;
    }
    
    // Show correct/incorrect answers
    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add('incorrect');
        }
    });
    
    // Show selected answer
    optionButtons[selectedIndex].classList.add('selected');
    
    // Show next button
    nextQuestionBtn.classList.remove('hidden');
    nextQuestionBtn.textContent = gameState.currentQuestionIndex === gameState.selectedQuestions - 1 ? 'Show Results' : 'Next Question';
}

function timeUp() {
    if (gameState.isAnswered) return;
    
    gameState.isAnswered = true;
    clearInterval(gameState.timerInterval);
    
    const question = gameState.questions[gameState.currentQuestionIndex];
    const correctIndex = question.answer;
    
    // Store that no answer was given
    gameState.userAnswers[gameState.currentQuestionIndex] = null;
    
    // Show correct answer
    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) {
            button.classList.add('correct');
        }
    });
    
    // Show next button
    nextQuestionBtn.classList.remove('hidden');
    nextQuestionBtn.textContent = gameState.currentQuestionIndex === gameState.selectedQuestions - 1 ? 'Show Results' : 'Next Question';
}

function nextQuestion() {
    gameState.currentQuestionIndex++;
    
    if (gameState.currentQuestionIndex >= gameState.selectedQuestions) {
        showResults();
    } else {
        loadQuestion();
    }
}

function showResults() {
    gameState.endTime = Date.now();
    const totalTime = Math.round((gameState.endTime - gameState.startTime) / 1000);
    const percentage = Math.round((gameState.score / gameState.selectedQuestions) * 100);
    
    // Update results display
    finalScoreNumber.textContent = percentage;
    totalQuestions.textContent = gameState.selectedQuestions;
    correctAnswers.textContent = gameState.score;
    timeTaken.textContent = formatTime(totalTime);
    quizCategory.textContent = gameState.selectedCategory;
    
    // Performance message
    let message = '';
    if (percentage >= 80) {
        message = 'Excellent!';
    } else if (percentage >= 60) {
        message = 'Good Job!';
    } else if (percentage >= 40) {
        message = 'Fair Performance';
    } else {
        message = 'Keep Practicing!';
    }
    performanceMessage.textContent = message;
    
    showScreen('results');
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function playAgain() {
    resetGameState();
    
    // Keep same settings
    gameState.selectedCategory = document.querySelector('.category-btn.selected').dataset.category;
    gameState.selectedQuestions = parseInt(document.querySelector('[data-questions].active').dataset.questions);
    gameState.selectedTimer = parseInt(document.querySelector('[data-timer].active').dataset.timer);
    
    startQuiz();
}

function changeCategory() {
    resetGameState();
    
    // Reset selections
    categoryButtons.forEach(btn => btn.classList.remove('selected'));
    startQuizBtn.disabled = true;
    
    showScreen('welcome');
}

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(`${screenName}-screen`);
    targetScreen.classList.add('active');
}