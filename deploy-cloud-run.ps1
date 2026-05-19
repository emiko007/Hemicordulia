# Cloud Run Deployment Script - PowerShell Version
# This script automates deployment to Google Cloud Run

Write-Host "`n" -ForegroundColor Cyan
Write-Host "====================================================`n CyberSculpt - Cloud Run Deployment Assistant`n====================================================" -ForegroundColor Cyan
Write-Host "`n"

# Check if gcloud is installed
try {
    $version = gcloud --version 2>$null
    Write-Host "[OK] Google Cloud SDK found`n" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Google Cloud SDK not found!`n" -ForegroundColor Red
    Write-Host "Please install from: https://cloud.google.com/sdk/docs/install-gcloud`n"
    Write-Host "Or use Cloud Shell in browser: https://console.cloud.google.com`n"
    Read-Host "Press Enter to exit"
    exit 1
}

# Set project
Write-Host "[STEP 1] Setting project ID..." -ForegroundColor Yellow
gcloud config set project hemicord-ai 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to set project. Does your project exist?`n" -ForegroundColor Red
    Write-Host "Create at: https://console.cloud.google.com`n"
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "[OK] Project set to hemicord-ai`n" -ForegroundColor Green

# Deploy to Cloud Run
Write-Host "[STEP 2] Deploying to Cloud Run..." -ForegroundColor Yellow
Write-Host "This will take 2-3 minutes...`n"

$deployParams = @(
    "run", "deploy", "hemicord-api",
    "--source=.",
    "--platform", "managed",
    "--region", "us-central1",
    "--allow-unauthenticated",
    "--memory", "512Mi",
    "--cpu", "1",
    "--timeout", "300",
    "--set-env-vars"
    "PORT=3001,NODE_ENV=production,FRONTEND_URL=https://hemicord-ai.web.app,FIREBASE_PROJECT_ID=hemicord-ai,FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com,FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com,FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCarGzYoheg49ac\n2FAdCyVq7PRp7UcdzAvOYnoxUsjXTO7LjZdV4fCShIdmvL5WUdY7spOqWV+c32sJ\nofDZyC27BanL6JFJwq292X5gZTJW+ycvPNi2Y6Pn+tN5TVJNh5Sft0MKZsKkWrXT\nDW1SjJfXigw/bKID8ejyEEzthRWgYbzym70pKzVMakoPQtrS75nAcx27yxbfZQxq\n7ILcdt6IQGXW1DrWyoOutTFsRKBwz22sXk/ryo7GhmDl7W/AlEGVS50Pjiuli+US\nkbgvQQGOd/gXAS1Qu+rN18cCfscWBJYGtkIdULQ92ct9Vr85vm/0WSACh2iy7BuZ\n1PnUgHtPAgMBAAECggEABxLXStRQOqeWIzJ8qMoKNN4k/V/Vw/CWzPem+UYnxjo6\npNd9siFKRGvIL3QhS5xO17MT2r4J8ogrLSkZSonDlvfW1er1vgb9CsooDpYs26/S\nZnAkxGPr1TTyN+wdKqDb31ldDlw4ZEDRFkJZG2XaSd1X2wyySiDlk4XC/DfSZIpm\n3fOV2c1Ho2y1zrvzyf8FFQKwak+k05lNqR3SB+emvUdK6mFfQo7y/zFrbisFN4TW\njHo/w95CuOviOcSu1QclTigsrmriKvbv8BPf5A5lI6vlrHbIrosi77GkBXIiGf2C\nCQrfquInpJOfuXqn0AMJaMKYhvqL4br6ZoOE1zLhkQKBgQDOIZ59wUU/za6xfnip\nUp1m7HbaBjQ5UWyrlwytNPqkK6tXvbnXHo4KA0p3dv3IuN3AxOh4vOpOM7ZnP4WL\npSh1D9rIwPs3VYwh9iQQUZjWW9DhIUPNRVU6jKwOJtOPJ2CeHgo+3CSFPDuZz0Ci\ni7ScGhxv+MrDS7iW+HnOT05L/wKBgQDAF9vEnl303Y4mbcMaHc/2x4jVdD4YJF+J\nQ4a8NcieVJuHq4yeZ6/r++0+IPhfChfoGPmZcn5CqjFKuTDDD/aYv646Mq5LNKv+\nW86sq081JJWxVEEDoIkG0mklFZ+OMJXCTqn8z/UPlSl+KNKCqgIh/sPuL0F9tGYk\np3S0/WIQsQKBgHgRQR6DG3Ekv6MHxgTq6GBxUHGCt5zDfwcb/vhNKcnC3hVHoB5b\n3+SZMiEQIJdwh0qn57mcYOaYXKEbcRB8bWpyh7/0GOCMZgnKNAuFW/9QkATyuWmx\n/wkRs46ysvxptW+kk9c1p9gr05OuEzobImLjGrlmM8U6MBVQOrMfor3FAoGAfPmI\nw9z85+iVKS9UNdObj8S1o5ojI/XWKinCqQSc51XIcnYL4Ks462FWMouky8B3WUuW\naFzzBFBSDXl63g2utCZRJg//EXLNS4lTZ0d1GvAYa+yS99ckD0opmjT9P7cgV/Bx\n68coeuDiw++vNc+B37gupPIdu7j4k3RXG8GWYaECgYBOkWxp6TxEq5ucdSyuFLog\nNsJY6vV2kk2vkHkGRRMXIuN2nlJCqc1VHES2mdU7Zf4QnYOYhw0INyDnJy83IRzT\ne7qHMRkAW7/GMKcaPx/5zctZJ39xmABzdPSVAXbtgMuOhtU2EuuTJe45pbcJujzc\ndy2jPK/FE1QsHvvze8obhg==\n-----END PRIVATE KEY-----\n"
)

& gcloud @deployParams

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n" -ForegroundColor Green
    Write-Host "====================================================" -ForegroundColor Green
    Write-Host "[SUCCESS] Backend deployed to Cloud Run!" -ForegroundColor Green
    Write-Host "====================================================" -ForegroundColor Green
    Write-Host "`n"
    
    Write-Host "Getting service URL..." -ForegroundColor Yellow
    Write-Host "`n"
    
    $url = gcloud run services describe hemicord-api --region us-central1 --format="value(status.url)"
    
    Write-Host "Your API URL: $url`n" -ForegroundColor Cyan
    Write-Host "Next steps:" -ForegroundColor Green
    Write-Host "1. Create .env.production in project root with:`n   VITE_API_URL=$url" -ForegroundColor White
    Write-Host "2. Run: npm run build" -ForegroundColor White
    Write-Host "3. Run: firebase deploy --only hosting" -ForegroundColor White
    Write-Host "`n"
} else {
    Write-Host "[ERROR] Deployment failed. Check errors above.`n" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Read-Host "Press Enter to exit"
