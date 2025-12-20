/**
 * AI Technology Stack Course - Frontend Application
 * Interactive Learning Platform
 */

const API_URL = 'http://localhost:5000/api';
let currentModule = null;
let modulesData = [];
let userProgress = {
    completed_modules: [],
    quiz_scores: {},
    last_accessed: null
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AI Technology Stack Course - Frontend Initialized');
    initializeNavigation();
    loadModules();
    loadProgress();
    initializeSearch();
});

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            showPage(page);
            
            // Update active state
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load page-specific data
        if (pageName === 'progress') {
            updateProgressPage();
        }
    }
}

// Load modules from API
async function loadModules() {
    try {
        const response = await fetch(`${API_URL}/modules`);
        const data = await response.json();
        
        if (data.success) {
            modulesData = data.modules;
            renderModules(modulesData);
        }
    } catch (error) {
        console.error('Error loading modules:', error);
        showError('Failed to load modules. Please try again.');
    }
}

// Render modules grid
function renderModules(modules) {
    const grid = document.getElementById('modules-grid');
    
    if (!modules || modules.length === 0) {
        grid.innerHTML = '<div class="loading">No modules found</div>';
        return;
    }
    
    grid.innerHTML = modules.map(module => {
        const isCompleted = userProgress.completed_modules.includes(module.id);
        const difficultyClass = `badge-${module.difficulty.toLowerCase()}`;
        
        return `
            <div class="module-card ${isCompleted ? 'completed' : ''}" onclick="showModule(${module.id})">
                <div class="module-header">
                    <span class="module-icon">${module.icon}</span>
                    <span class="module-number">Module ${module.id}</span>
                </div>
                <h3 class="module-title">${module.title}</h3>
                <p class="module-description">${module.description}</p>
                <div class="module-meta">
                    <span class="module-duration">⏱️ ${module.duration}</span>
                    <span class="badge ${difficultyClass}">${module.difficulty}</span>
                </div>
                ${isCompleted ? '<span class="badge badge-completed">✓ Completed</span>' : ''}
            </div>
        `;
    }).join('');
}

// Show module detail
async function showModule(moduleId) {
    try {
        const response = await fetch(`${API_URL}/modules/${moduleId}`);
        const data = await response.json();
        
        if (data.success) {
            currentModule = data.module;
            renderModuleDetail(data.module);
            showPage('module');
        }
    } catch (error) {
        console.error('Error loading module:', error);
        showError('Failed to load module details.');
    }
}

// Render module detail
function renderModuleDetail(module) {
    const container = document.getElementById('module-content');
    
    // Convert markdown-like content to HTML (simple conversion)
    const htmlContent = convertMarkdownToHTML(module.content);
    
    container.innerHTML = `
        <div class="module-header">
            <h1>${module.icon} ${module.title}</h1>
            <p>${module.description}</p>
            <div class="module-meta">
                <span>⏱️ ${module.duration}</span>
                <span class="badge badge-${module.difficulty.toLowerCase()}">${module.difficulty}</span>
            </div>
        </div>
        <div class="module-body">
            ${htmlContent}
        </div>
    `;
    
    // Setup action buttons
    const quizBtn = document.getElementById('take-quiz-btn');
    const completeBtn = document.getElementById('mark-complete-btn');
    
    quizBtn.onclick = () => loadQuiz(module.id);
    completeBtn.onclick = () => markModuleComplete(module.id);
    
    // Update button states
    const isCompleted = userProgress.completed_modules.includes(module.id);
    if (isCompleted) {
        completeBtn.innerHTML = '✓ Completed';
        completeBtn.disabled = true;
        completeBtn.style.opacity = '0.6';
    }
}

// Simple markdown to HTML conversion
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    return html;
}

// Load quiz
async function loadQuiz(moduleId) {
    try {
        const response = await fetch(`${API_URL}/quiz/${moduleId}`);
        const data = await response.json();
        
        if (data.success) {
            renderQuiz(moduleId, data.questions);
            showPage('quiz');
        } else {
            alert(data.message || 'Quiz not available for this module');
        }
    } catch (error) {
        console.error('Error loading quiz:', error);
        showError('Failed to load quiz.');
    }
}

// Render quiz
function renderQuiz(moduleId, questions) {
    const container = document.getElementById('quiz-content');
    let selectedAnswers = new Array(questions.length).fill(null);
    
    container.innerHTML = `
        <div class="quiz-header">
            <h2>📝 Module ${moduleId} Quiz</h2>
            <p class="quiz-progress">Answer all questions to see your results</p>
        </div>
        <div id="quiz-questions">
            ${questions.map((q, index) => `
                <div class="question-card">
                    <div class="question-text">
                        <strong>Question ${index + 1}:</strong> ${q.question}
                    </div>
                    <div class="options">
                        ${q.options.map((option, optIndex) => `
                            <div class="option" data-question="${index}" data-option="${optIndex}">
                                ${String.fromCharCode(65 + optIndex)}. ${option}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary" id="submit-quiz-btn" disabled>
                Submit Quiz
            </button>
        </div>
    `;
    
    // Add click handlers for options
    const options = container.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const questionIndex = parseInt(option.dataset.question);
            const optionIndex = parseInt(option.dataset.option);
            
            // Clear previous selection
            const questionOptions = container.querySelectorAll(`[data-question="${questionIndex}"]`);
            questionOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Select current option
            option.classList.add('selected');
            selectedAnswers[questionIndex] = optionIndex;
            
            // Enable submit if all questions answered
            const submitBtn = document.getElementById('submit-quiz-btn');
            if (selectedAnswers.every(a => a !== null)) {
                submitBtn.disabled = false;
            }
        });
    });
    
    // Submit quiz handler
    const submitBtn = document.getElementById('submit-quiz-btn');
    submitBtn.addEventListener('click', () => submitQuiz(moduleId, selectedAnswers));
}

// Submit quiz
async function submitQuiz(moduleId, answers) {
    try {
        const response = await fetch(`${API_URL}/quiz/${moduleId}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayQuizResults(data);
            
            // Update progress
            await updateProgress({
                module_id: moduleId,
                quiz_score: data.score
            });
        }
    } catch (error) {
        console.error('Error submitting quiz:', error);
        showError('Failed to submit quiz.');
    }
}

// Display quiz results
function displayQuizResults(results) {
    const container = document.getElementById('quiz-content');
    
    const passMessage = results.passed 
        ? '🎉 Congratulations! You passed!'
        : '📚 Keep learning! Review the material and try again.';
    
    container.innerHTML = `
        <div class="quiz-result">
            <h2>Quiz Results</h2>
            <div class="score-display">${results.score.toFixed(0)}%</div>
            <div class="result-message">${passMessage}</div>
            <p>${results.correct} out of ${results.total} correct</p>
            
            <div style="margin-top: 2rem;">
                <h3>Review Your Answers:</h3>
                ${results.results.map((r, index) => `
                    <div class="question-card">
                        <div class="question-text">
                            <strong>Question ${index + 1}:</strong> ${r.question}
                        </div>
                        <div style="margin-top: 1rem;">
                            <div class="option ${r.is_correct ? 'correct' : 'incorrect'}">
                                Your answer: ${r.your_answer}
                            </div>
                            ${!r.is_correct ? `
                                <div class="option correct">
                                    Correct answer: ${r.correct_answer}
                                </div>
                            ` : ''}
                            <p style="margin-top: 0.5rem; color: var(--text-secondary);">
                                <strong>Explanation:</strong> ${r.explanation}
                            </p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="backToModule()">
                    Back to Module
                </button>
            </div>
        </div>
    `;
}

// Mark module as complete
async function markModuleComplete(moduleId) {
    try {
        await updateProgress({
            completed_module: moduleId
        });
        
        alert('✅ Module marked as complete!');
        
        // Refresh module display
        showModule(moduleId);
        loadModules(); // Refresh grid
    } catch (error) {
        console.error('Error marking complete:', error);
    }
}

// Update progress
async function updateProgress(data) {
    try {
        const response = await fetch(`${API_URL}/progress`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: 'default', ...data })
        });
        
        const result = await response.json();
        
        if (result.success) {
            userProgress = result.progress;
        }
    } catch (error) {
        console.error('Error updating progress:', error);
    }
}

// Load progress
async function loadProgress() {
    try {
        const response = await fetch(`${API_URL}/progress?user_id=default`);
        const data = await response.json();
        
        if (data.success) {
            userProgress = data.progress;
            updateProgressPage();
        }
    } catch (error) {
        console.error('Error loading progress:', error);
    }
}

// Update progress page
function updateProgressPage() {
    const totalModules = modulesData.length;
    const completedCount = userProgress.completed_modules.length;
    const progressPercent = totalModules > 0 ? (completedCount / totalModules * 100) : 0;
    
    // Update overview cards
    document.getElementById('completed-count').textContent = `${completedCount}/${totalModules}`;
    document.getElementById('overall-progress').style.width = `${progressPercent}%`;
    document.getElementById('progress-percent').textContent = `${progressPercent.toFixed(0)}%`;
    
    // Calculate average quiz score
    const scores = Object.values(userProgress.quiz_scores);
    const avgScore = scores.length > 0 
        ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length 
        : 0;
    document.getElementById('avg-score').textContent = 
        scores.length > 0 ? `${avgScore.toFixed(0)}%` : 'N/A';
    
    // Render module progress list
    const progressList = document.getElementById('module-progress-list');
    progressList.innerHTML = modulesData.map(module => {
        const isCompleted = userProgress.completed_modules.includes(module.id);
        const quizScore = userProgress.quiz_scores[module.id];
        
        return `
            <div class="module-progress-item">
                <div>
                    <strong>${module.icon} ${module.title}</strong>
                    ${quizScore ? `<div style="font-size: 0.9rem; color: var(--text-secondary);">
                        Quiz Score: ${quizScore.score.toFixed(0)}%
                    </div>` : ''}
                </div>
                <div>
                    ${isCompleted ? '<span class="badge badge-completed">✓ Completed</span>' : 
                                   '<span class="badge badge-intermediate">In Progress</span>'}
                </div>
            </div>
        `;
    }).join('');
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length === 0) {
            renderModules(modulesData);
            return;
        }
        
        const filtered = modulesData.filter(module => 
            module.title.toLowerCase().includes(query) ||
            module.description.toLowerCase().includes(query)
        );
        
        renderModules(filtered);
    });
}

// Utility functions
function backToModule() {
    if (currentModule) {
        showModule(currentModule.id);
    } else {
        showPage('home');
    }
}

function showError(message) {
    alert(message);
}

// Make functions available globally
window.showPage = showPage;
window.showModule = showModule;
window.backToModule = backToModule;
