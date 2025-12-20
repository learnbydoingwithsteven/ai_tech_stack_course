@echo off
echo ========================================
echo AI Technology Stack Course
echo ========================================
echo.
echo This will start both backend and frontend servers.
echo.
echo 1. Backend will run on: http://localhost:5000
echo 2. Frontend will run on: http://localhost:8080
echo.
echo Two terminal windows will open.
echo Keep both running while using the application.
echo.
pause
echo.

REM Start backend in new window
echo Starting Backend...
start "AI Stack Backend" cmd /k "cd app\backend && run.bat"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in new window
echo Starting Frontend...
start "AI Stack Frontend" cmd /k "cd app\frontend && serve.bat"

REM Wait a moment then open browser
timeout /t 2 /nobreak > nul

echo.
echo Opening browser...
start http://localhost:8080

echo.
echo ========================================
echo All services started!
echo ========================================
echo.
echo - Backend: Check "AI Stack Backend" window
echo - Frontend: Check "AI Stack Frontend" window
echo - Browser should open automatically
echo.
echo To stop: Close both terminal windows
echo ========================================
