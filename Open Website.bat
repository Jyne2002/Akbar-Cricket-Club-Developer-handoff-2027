@echo off
setlocal
title Akbar Cricket Club - Website Launcher
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 goto missing_node
where npm >nul 2>&1
if errorlevel 1 goto missing_node

if not exist "backend\node_modules\express\package.json" goto missing_dependencies
if not exist "frontend\node_modules\.bin\vite.cmd" goto missing_dependencies

echo Starting Akbar Cricket Club...
echo Keep the backend and website windows open while using the website.
echo Close both windows to stop the servers.
echo.

start "Akbar Cricket Club - Backend" /d "%~dp0backend" "%ComSpec%" /k "npm start"
start "Akbar Cricket Club - Website" /d "%~dp0frontend" "%ComSpec%" /k "npm run dev -- --open --port 5173 --strictPort"
exit /b 0

:missing_node
echo Node.js and npm are required. Install Node.js, then double-click this file again.
pause
exit /b 1

:missing_dependencies
echo Project dependencies are missing.
echo Run npm install in the backend folder and in the frontend folder,
echo then double-click this file again.
pause
exit /b 1
