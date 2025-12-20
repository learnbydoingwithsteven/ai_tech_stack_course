"""
AI Technology Stack Course - Backend API
Interactive learning platform backend
"""
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Course structure
MODULES = [
    {
        "id": 1,
        "title": "Introduction to AI Technology Stack",
        "description": "Understanding the five layers and the big picture",
        "duration": "45 min",
        "difficulty": "Beginner",
        "icon": "🎯",
        "file": "MODULE_01_INTRODUCTION.md"
    },
    {
        "id": 2,
        "title": "Infrastructure Layer",
        "description": "Hardware, deployment options, and cost analysis",
        "duration": "60 min",
        "difficulty": "Intermediate",
        "icon": "💻",
        "file": "MODULE_02_INFRASTRUCTURE.md"
    },
    {
        "id": 3,
        "title": "Model Layer",
        "description": "Choosing the right AI model for your needs",
        "duration": "60 min",
        "difficulty": "Intermediate",
        "icon": "🤖",
        "file": "MODULE_03_MODEL_LAYER.md"
    },
    {
        "id": 4,
        "title": "Data Layer",
        "description": "RAG, vector databases, and data pipelines",
        "duration": "75 min",
        "difficulty": "Intermediate",
        "icon": "📊",
        "file": "MODULE_04_DATA_LAYER.md"
    },
    {
        "id": 5,
        "title": "Orchestration Layer",
        "description": "Building complex AI workflows and agents",
        "duration": "60 min",
        "difficulty": "Advanced",
        "icon": "🔄",
        "file": "MODULE_05_ORCHESTRATION.md"
    },
    {
        "id": 6,
        "title": "Application Layer",
        "description": "User interfaces and integrations",
        "duration": "60 min",
        "difficulty": "Intermediate",
        "icon": "🖥️",
        "file": "MODULE_06_APPLICATION_LAYER.md"
    },
    {
        "id": 7,
        "title": "Putting It All Together",
        "description": "Complete system design and implementation",
        "duration": "45 min",
        "difficulty": "Advanced",
        "icon": "🎓",
        "file": "MODULE_07_PUTTING_IT_ALL_TOGETHER.md"
    }
]

# Quiz questions
QUIZ_DATA = {
    1: [
        {
            "question": "What are the five layers of the AI technology stack?",
            "options": [
                "Infrastructure, Model, Data, Orchestration, Application",
                "Frontend, Backend, Database, API, UI",
                "Input, Processing, Output, Storage, Display",
                "Hardware, Software, Network, Security, User"
            ],
            "correct": 0,
            "explanation": "The AI stack consists of Infrastructure (hardware), Model (AI models), Data (sources and RAG), Orchestration (workflow), and Application (user interface)."
        },
        {
            "question": "Why do models have knowledge cutoff dates?",
            "options": [
                "To save storage space",
                "They are trained on data up to a specific date",
                "To prevent bias",
                "For security reasons"
            ],
            "correct": 1,
            "explanation": "Models are trained on data available up to a specific date, so they don't have information about events after their training cutoff."
        }
    ],
    2: [
        {
            "question": "What type of hardware do LLMs typically require?",
            "options": [
                "CPUs only",
                "GPUs (Graphics Processing Units)",
                "TPUs only",
                "Standard hard drives"
            ],
            "correct": 1,
            "explanation": "LLMs require GPUs for efficient parallel computation needed for inference and training."
        },
        {
            "question": "Which deployment option has the lowest upfront cost?",
            "options": [
                "On-premise",
                "Cloud",
                "Local",
                "All cost the same"
            ],
            "correct": 1,
            "explanation": "Cloud deployment has no upfront investment - you pay as you go, making it ideal for startups and variable workloads."
        }
    ],
    3: [
        {
            "question": "What is the main advantage of open source models?",
            "options": [
                "Always better quality",
                "Full control and customization",
                "Faster inference",
                "No hardware needed"
            ],
            "correct": 1,
            "explanation": "Open source models provide full control, allowing for customization, fine-tuning, and self-hosting without vendor lock-in."
        }
    ],
    4: [
        {
            "question": "What does RAG stand for?",
            "options": [
                "Random Access Generation",
                "Retrieval-Augmented Generation",
                "Rapid AI Gateway",
                "Resource Allocation Graph"
            ],
            "correct": 1,
            "explanation": "RAG (Retrieval-Augmented Generation) combines retrieval of relevant information with LLM generation to provide context-aware answers."
        }
    ],
    5: [
        {
            "question": "What are the three phases of orchestration?",
            "options": [
                "Start, Middle, End",
                "Input, Process, Output",
                "Thinking, Execution, Review",
                "Plan, Build, Deploy"
            ],
            "correct": 2,
            "explanation": "Orchestration involves Thinking (planning), Execution (tool calling), and Review (self-critique and improvement)."
        }
    ]
}

# User progress storage (in-memory for demo, use database in production)
user_progress = {}

@app.route('/')
def index():
    return jsonify({
        "message": "AI Technology Stack Course API",
        "version": "1.0.0",
        "endpoints": {
            "/api/modules": "Get all course modules",
            "/api/modules/<id>": "Get specific module details",
            "/api/quiz/<module_id>": "Get quiz for module",
            "/api/progress": "Get/update user progress"
        }
    })

@app.route('/api/modules', methods=['GET'])
def get_modules():
    """Get all course modules"""
    return jsonify({
        "success": True,
        "modules": MODULES,
        "total": len(MODULES)
    })

@app.route('/api/modules/<int:module_id>', methods=['GET'])
def get_module(module_id):
    """Get specific module details"""
    module = next((m for m in MODULES if m['id'] == module_id), None)
    
    if not module:
        return jsonify({"success": False, "error": "Module not found"}), 404
    
    # Read module content
    lectures_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'lectures')
    file_path = os.path.join(lectures_path, module['file'])
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        content = "Content not available"
    
    return jsonify({
        "success": True,
        "module": {
            **module,
            "content": content
        }
    })

@app.route('/api/quiz/<int:module_id>', methods=['GET'])
def get_quiz(module_id):
    """Get quiz questions for a module"""
    questions = QUIZ_DATA.get(module_id, [])
    
    if not questions:
        return jsonify({
            "success": False,
            "message": "No quiz available for this module"
        })
    
    # Remove correct answers for client
    safe_questions = [
        {
            "question": q["question"],
            "options": q["options"]
        }
        for q in questions
    ]
    
    return jsonify({
        "success": True,
        "questions": safe_questions,
        "total": len(questions)
    })

@app.route('/api/quiz/<int:module_id>/submit', methods=['POST'])
def submit_quiz(module_id):
    """Submit quiz answers and get results"""
    data = request.json
    answers = data.get('answers', [])
    
    questions = QUIZ_DATA.get(module_id, [])
    if not questions:
        return jsonify({"success": False, "error": "Quiz not found"}), 404
    
    results = []
    correct_count = 0
    
    for i, answer in enumerate(answers):
        question = questions[i]
        is_correct = answer == question['correct']
        if is_correct:
            correct_count += 1
        
        results.append({
            "question": question['question'],
            "your_answer": question['options'][answer],
            "correct_answer": question['options'][question['correct']],
            "is_correct": is_correct,
            "explanation": question['explanation']
        })
    
    score = (correct_count / len(questions)) * 100
    
    return jsonify({
        "success": True,
        "score": score,
        "correct": correct_count,
        "total": len(questions),
        "results": results,
        "passed": score >= 70
    })

@app.route('/api/progress', methods=['GET'])
def get_progress():
    """Get user progress"""
    user_id = request.args.get('user_id', 'default')
    progress = user_progress.get(user_id, {
        "completed_modules": [],
        "quiz_scores": {},
        "last_accessed": None
    })
    
    return jsonify({
        "success": True,
        "progress": progress
    })

@app.route('/api/progress', methods=['POST'])
def update_progress():
    """Update user progress"""
    data = request.json
    user_id = data.get('user_id', 'default')
    
    if user_id not in user_progress:
        user_progress[user_id] = {
            "completed_modules": [],
            "quiz_scores": {},
            "last_accessed": None
        }
    
    if 'completed_module' in data:
        module_id = data['completed_module']
        if module_id not in user_progress[user_id]['completed_modules']:
            user_progress[user_id]['completed_modules'].append(module_id)
    
    if 'quiz_score' in data:
        module_id = str(data['module_id'])
        user_progress[user_id]['quiz_scores'][module_id] = {
            "score": data['quiz_score'],
            "date": datetime.now().isoformat()
        }
    
    user_progress[user_id]['last_accessed'] = datetime.now().isoformat()
    
    return jsonify({
        "success": True,
        "progress": user_progress[user_id]
    })

@app.route('/api/search', methods=['GET'])
def search():
    """Search course content"""
    query = request.args.get('q', '').lower()
    
    if not query:
        return jsonify({"success": False, "error": "No query provided"}), 400
    
    results = []
    for module in MODULES:
        if (query in module['title'].lower() or 
            query in module['description'].lower()):
            results.append(module)
    
    return jsonify({
        "success": True,
        "query": query,
        "results": results,
        "count": len(results)
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Starting AI Technology Stack Course Backend...")
    print("📚 Course modules loaded:", len(MODULES))
    print("🌐 Server running on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
