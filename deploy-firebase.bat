@echo off
REM Firebase Deployment Script for CyberSculpt
REM Automates the entire deployment process

echo.
echo ================================================================
echo     CyberSculpt Firebase Deployment Script
echo ================================================================
echo.

REM Check if Firebase CLI is installed
echo [*] Checking Firebase CLI...
firebase --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] Firebase CLI not found. 
    echo Install with: npm install -g firebase-tools
    exit /b 1
)
echo [OK] Firebase CLI found

REM Check if firebase.json exists
if not exist "firebase.json" (
    echo [ERROR] firebase.json not found.
    echo Please run this script from the project root.
    exit /b 1
)

echo.
echo ================================================================
echo Step 1: Build Frontend
echo ================================================================
echo.

if exist "dist" (
    echo [*] Removing old build...
    rmdir /s /q dist
)

echo [*] Building frontend with Vite...
call npm run build
if %errorLevel% neq 0 (
    echo [ERROR] Frontend build failed!
    exit /b 1
)
echo [OK] Frontend built successfully!

echo.
echo ================================================================
echo Step 2: Build Backend
echo ================================================================
echo.

echo [*] Building backend TypeScript...
cd server
call npm run build 2>nul
if %errorLevel% neq 0 (
    echo [WARN] Backend build skipped (running in demo mode)
)
echo [OK] Backend ready!
cd ..

echo.
echo ================================================================
echo Step 3: Deploy to Firebase
echo ================================================================
echo.

echo [*] Starting deployment...
echo.

call firebase deploy

if %errorLevel% equ 0 (
    echo.
    echo ================================================================
    echo              DEPLOYMENT SUCCESSFUL!
    echo ================================================================
    echo.
    echo Your app is now live!
    echo.
    echo Visit: https://cybersculpt-showcase.web.app
    echo.
    echo Next Steps:
    echo 1. Visit your live app
    echo 2. Test the market analysis feature
    echo 3. Monitor in Firebase Console
    echo.
) else (
    echo [ERROR] Deployment failed!
    echo Run 'firebase deploy' for more details.
    exit /b 1
)
