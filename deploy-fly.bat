@echo off
REM Fly.io Deployment Script - Automated Setup
REM Completely FREE hosting - no credit card needed

echo.
echo ====================================================
echo  CyberSculpt - Fly.io FREE Deployment
echo ====================================================
echo.

REM Check if flyctl is installed
flyctl version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Flyctl not found!
    echo.
    echo Installing Flyctl...
    powershell -Command "Invoke-WebRequest https://fly.io/install.ps1 -o install.ps1; .\install.ps1"
    echo.
    echo [INFO] Please restart your terminal and run this script again
    pause
    exit /b 1
)

echo [OK] Flyctl found
echo.

REM Login
echo [STEP 1] Authenticating with Fly.io...
flyctl auth login
if %errorlevel% neq 0 (
    echo [ERROR] Authentication failed
    pause
    exit /b 1
)
echo [OK] Authenticated
echo.

REM Launch and deploy
echo [STEP 2] Launching app on Fly.io...
echo.
flyctl launch --copy-config

if %errorlevel% eq 0 (
    echo.
    echo ====================================================
    echo [SUCCESS] App deployed to Fly.io!
    echo ====================================================
    echo.
    echo Getting your app URL...
    echo.
    
    REM Extract app name from fly.toml
    for /f "tokens=2" %%i in ('findstr "^app = " fly.toml') do set APP_NAME=%%i
    set APP_NAME=%APP_NAME:"=%
    
    echo Your app is live at: https://%APP_NAME%.fly.dev
    echo.
    echo [STEP 3] Setting Firebase secrets...
    echo.
    echo Run this command to add your Firebase credentials:
    echo.
    echo flyctl secrets set ^
    echo   FIREBASE_PROJECT_ID=hemicord-ai ^
    echo   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com ^
    echo   FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com ^
    echo   "FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n(YOUR_KEY)\n-----END PRIVATE KEY-----\n"
    echo.
    echo [STEP 4] Update frontend with your API URL:
    echo.
    echo Create .env.production in project root:
    echo VITE_API_URL=https://%APP_NAME%.fly.dev
    echo.
    echo Then run:
    echo npm run build
    echo firebase deploy --only hosting
    echo.
    echo Your full-stack app is now LIVE and COMPLETELY FREE! ^^
    echo.
) else (
    echo [ERROR] Deployment failed. Check errors above.
    pause
    exit /b 1
)

pause
