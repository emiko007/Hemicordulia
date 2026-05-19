# Fly.io Deployment Script - PowerShell
# Completely FREE hosting - no credit card needed

Write-Host "`n" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " CyberSculpt - Fly.io FREE Deployment" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "`n"

# Check if flyctl is installed
try {
    $version = flyctl version 2>$null
    Write-Host "[OK] Flyctl found`n" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Flyctl not found!`n" -ForegroundColor Red
    Write-Host "Installing Flyctl...`n"
    
    # Download and install
    $installerUrl = "https://fly.io/install.ps1"
    $installerPath = "$env:TEMP\fly-install.ps1"
    
    try {
        Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath
        & $installerPath
        Write-Host "`n[OK] Flyctl installed. Please restart terminal and run again.`n" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Failed to install Flyctl`n" -ForegroundColor Red
        Write-Host "Please install manually: https://fly.io/docs/getting-started/installing-flyctl/`n"
    }
    
    Read-Host "Press Enter to exit"
    exit 1
}

# Login
Write-Host "[STEP 1] Authenticating with Fly.io..." -ForegroundColor Yellow
flyctl auth login

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Authentication failed`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Authenticated`n" -ForegroundColor Green

# Launch and deploy
Write-Host "[STEP 2] Launching app on Fly.io...`n" -ForegroundColor Yellow

& flyctl launch --copy-config

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n" -ForegroundColor Green
    Write-Host "====================================================" -ForegroundColor Green
    Write-Host "[SUCCESS] App deployed to Fly.io!" -ForegroundColor Green
    Write-Host "====================================================" -ForegroundColor Green
    Write-Host "`n"
    
    Write-Host "Getting your app URL...`n" -ForegroundColor Yellow
    
    # Extract app name from fly.toml
    $appName = (Select-String -Path "fly.toml" -Pattern "^app = " | Select-Object -First 1).Line.Split('"')[1]
    
    Write-Host "Your app is live at: https://$appName.fly.dev`n" -ForegroundColor Cyan
    
    Write-Host "[STEP 3] Setting Firebase secrets...`n" -ForegroundColor Yellow
    Write-Host "Run this command to add Firebase credentials:`n" -ForegroundColor White
    
    Write-Host @"
flyctl secrets set `
  FIREBASE_PROJECT_ID=hemicord-ai `
  FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com `
  FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com `
  FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n(YOUR_KEY)\n-----END PRIVATE KEY-----\n"
"@ -ForegroundColor White
    
    Write-Host "`n[STEP 4] Update frontend with your API URL:`n" -ForegroundColor Yellow
    
    Write-Host "Create .env.production in project root:`n" -ForegroundColor White
    Write-Host "VITE_API_URL=https://$appName.fly.dev`n" -ForegroundColor Cyan
    
    Write-Host "Then run:`n" -ForegroundColor White
    Write-Host @"
npm run build
firebase deploy --only hosting
"@ -ForegroundColor White
    
    Write-Host "`nYour full-stack app is now LIVE and COMPLETELY FREE! 🎉`n" -ForegroundColor Green
    
} else {
    Write-Host "[ERROR] Deployment failed. Check errors above.`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Read-Host "Press Enter to exit"
