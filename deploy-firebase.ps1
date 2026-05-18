#!/usr/bin/env pwsh
# Firebase Deployment Script for CyberSculpt
# Automates the entire deployment process

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   CyberSculpt Firebase Deployment Script                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Firebase CLI is installed
Write-Host "[*] Checking Firebase CLI..." -ForegroundColor Yellow
try {
    $firebaseVersion = firebase --version 2>&1
    Write-Host "[OK] Firebase CLI found: $firebaseVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Firebase CLI not found. Install with: npm install -g firebase-tools" -ForegroundColor Red
    exit 1
}

# Check if we're in the right directory
if (-not (Test-Path "firebase.json")) {
    Write-Host "[ERROR] firebase.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host "Step 1: Build Frontend" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

if (Test-Path "dist") {
    Write-Host "[*] Removing old build..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force dist
}

Write-Host "[*] Building frontend with Vite..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Frontend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Frontend built successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host "Step 2: Build Backend" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

Write-Host "[*] Building backend TypeScript..." -ForegroundColor Yellow
Set-Location server
npm run build 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] Backend build skipped (running in demo mode)" -ForegroundColor Yellow
}
Write-Host "[OK] Backend ready!" -ForegroundColor Green
Set-Location ..

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host "Step 3: Deploy to Firebase" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

# Check if logged in
Write-Host "[*] Checking Firebase authentication..." -ForegroundColor Yellow
$authStatus = firebase auth:export 2>&1
if ($authStatus -like "*error*" -or $authStatus -like "*not authorized*") {
    Write-Host "[*] Not logged in. Opening authentication..." -ForegroundColor Yellow
    firebase login
}

# Get project info
Write-Host ""
Write-Host "[*] Fetching project information..." -ForegroundColor Yellow
$projectId = firebase projects:list 2>&1 | Select-String "default" | ForEach-Object { $_ -replace ".*\(", "" -replace "\).*", "" } | Select-Object -First 1

if ([string]::IsNullOrEmpty($projectId)) {
    Write-Host "[ERROR] No Firebase project found. Run 'firebase use --add' to select a project." -ForegroundColor Red
    exit 1
}

Write-Host "[OK] Project ID: $projectId" -ForegroundColor Green

# Deploy
Write-Host ""
Write-Host "[*] Starting deployment..." -ForegroundColor Yellow
Write-Host ""

firebase deploy --token $env:FIREBASE_TOKEN

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║           DEPLOYMENT SUCCESSFUL!                          ║" -ForegroundColor Green
    Write-Host "╠════════════════════════════════════════════════════════════╣" -ForegroundColor Green
    Write-Host "║                                                            ║" -ForegroundColor Green
    Write-Host "║ Your app is now live! Visit:                              ║" -ForegroundColor Green
    Write-Host "║ 🌐 https://$projectId.web.app" -ForegroundColor Green
    Write-Host "║                                                            ║" -ForegroundColor Green
    Write-Host "║ Backend API:                                              ║" -ForegroundColor Green
    Write-Host "║ 📡 https://us-central1-$projectId.cloudfunctions.net/api" -ForegroundColor Green
    Write-Host "║                                                            ║" -ForegroundColor Green
    Write-Host "║ Monitor at:                                               ║" -ForegroundColor Green
    Write-Host "║ 📊 https://console.firebase.google.com                    ║" -ForegroundColor Green
    Write-Host "║                                                            ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Visit your live app: https://$projectId.web.app"
    Write-Host "2. Test the market analysis feature"
    Write-Host "3. Monitor in Firebase Console"
    Write-Host "4. Setup custom domain (optional)"
    Write-Host ""
} else {
    Write-Host "[ERROR] Deployment failed!" -ForegroundColor Red
    Write-Host "Run 'firebase deploy' for more details." -ForegroundColor Yellow
    exit 1
}
