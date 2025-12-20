# Quick Start Guide

Get the AI Technology Stack Course running in 5 minutes!

## 📋 Prerequisites

- Python 3.9 or higher
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Terminal/Command Prompt

## 🚀 Quick Setup

### Step 1: Clone/Navigate to Repository

```bash
cd ai_tech_stack_course
```

### Step 2: Start the Backend

```bash
# Navigate to backend directory
cd app/backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
```

You should see:
```
🚀 Starting AI Technology Stack Course Backend...
📚 Course modules loaded: 7
🌐 Server running on http://localhost:5000
```

### Step 3: Open the Frontend

**Option A: Using Python HTTP Server (Recommended)**

Open a new terminal:

```bash
# Navigate to frontend directory
cd app/frontend

# Start simple HTTP server
# Python 3:
python -m http.server 8080

# Python 2:
python -m SimpleHTTPServer 8080
```

Then open your browser to: **http://localhost:8080**

**Option B: Direct File Access**

Simply open `app/frontend/index.html` directly in your browser.

**Option C: Using Live Server (VS Code)**

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## ✅ Verify It's Working

1. You should see the course homepage with 7 modules
2. Click on "Module 1: Introduction"
3. The module content should load
4. Try the quiz feature
5. Check the progress page

## 🎯 What's Next?

### For Learners

1. **Start with Module 1**: Get an overview of the AI stack
2. **Follow the Learning Path**: See `action-plans/LEARNING_PATH.md`
3. **Complete Quizzes**: Test your understanding after each module
4. **Track Progress**: Use the progress page to monitor your learning

### For Developers

1. **Explore the Code**: Check out the backend API and frontend JavaScript
2. **Modify Content**: Edit lecture files in `lectures/` folder
3. **Add Features**: Extend the quiz system or add new modules
4. **Deploy**: Follow deployment guide below

## 🐛 Troubleshooting

### Backend won't start

**Problem**: `ModuleNotFoundError: No module named 'flask'`

**Solution**:
```bash
pip install -r requirements.txt
```

### CORS Error in Browser

**Problem**: "Access to fetch at 'http://localhost:5000' has been blocked by CORS policy"

**Solution**: Make sure backend is running on port 5000 and Flask-CORS is installed.

### Modules not loading

**Problem**: Modules grid shows "Loading modules..."

**Solution**: 
1. Check backend is running: `curl http://localhost:5000/health`
2. Check browser console for errors (F12)
3. Verify API_URL in `app.js` matches your backend URL

### Quiz not working

**Problem**: "Quiz not available for this module"

**Solution**: Some modules don't have quizzes yet. Try Module 1 or 2.

## 📝 Configuration

### Change Backend Port

Edit `app/backend/app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5000)  # Change 5000 to your port
```

Then update `app/frontend/app.js`:
```javascript
const API_URL = 'http://localhost:5000/api';  // Update port here
```

### Enable HTTPS

For production, use a proper web server:
- **Backend**: Use Gunicorn or uWSGI with nginx
- **Frontend**: Serve through nginx or Apache

## 🌐 Deployment Options

### Option 1: Local Network Access

Start backend with:
```bash
python app.py --host 0.0.0.0
```

Access from other devices: `http://YOUR_IP:5000`

### Option 2: Heroku

See `DEPLOYMENT.md` for full instructions.

### Option 3: Docker

```bash
# Build and run with Docker Compose
docker-compose up
```

### Option 4: Static Hosting

Frontend can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3

Backend can be deployed to:
- Heroku
- AWS Lambda
- Google Cloud Run
- DigitalOcean App Platform

## 📚 Project Structure

```
ai_tech_stack_course/
├── lectures/          # Course content (Markdown)
├── action-plans/      # Learning guides
├── app/
│   ├── backend/      # Flask API
│   └── frontend/     # HTML/CSS/JS
├── resources/        # Additional materials
└── .github/          # CI/CD workflows
```

## 💡 Tips

1. **Keep Backend Running**: Don't close the terminal running the backend
2. **Browser Refresh**: Use Ctrl+F5 to hard refresh if changes don't appear
3. **Check Console**: Open browser DevTools (F12) to see errors
4. **Test API**: Use `curl` or Postman to test backend endpoints

## 🆘 Get Help

- Check `README.md` for detailed documentation
- Review `lectures/` for course content
- See `action-plans/` for learning guides
- Open an issue if you find bugs

## 🎉 You're Ready!

Start learning about the AI Technology Stack! Happy coding! 🚀
