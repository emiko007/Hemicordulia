@echo off
REM Cloud Run Deployment Script - Automated Setup
REM This script will deploy your backend to Google Cloud Run

echo.
echo ====================================================
echo  CyberSculpt - Cloud Run Deployment Assistant
echo ====================================================
echo.

REM Check if gcloud is installed
gcloud --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Google Cloud SDK not found!
    echo.
    echo Please install from: https://cloud.google.com/sdk/docs/install-gcloud
    echo Or use Cloud Shell in browser: https://console.cloud.google.com
    echo.
    pause
    exit /b 1
)

echo [OK] Google Cloud SDK found
echo.

REM Set project
echo [STEP 1] Setting project ID...
gcloud config set project hemicord-ai
if %errorlevel% neq 0 (
    echo [ERROR] Failed to set project. Does your project exist?
    echo Create at: https://console.cloud.google.com
    pause
    exit /b 1
)
echo [OK] Project set to hemicord-ai
echo.

REM Deploy to Cloud Run
echo [STEP 2] Deploying to Cloud Run...
echo This will take 2-3 minutes...
echo.

gcloud run deploy hemicord-api ^
  --source=. ^
  --platform managed ^
  --region us-central1 ^
  --allow-unauthenticated ^
  --memory 512Mi ^
  --cpu 1 ^
  --timeout 300 ^
  --set-env-vars PORT=3001,NODE_ENV=production,FRONTEND_URL=https://hemicord-ai.web.app,FIREBASE_PROJECT_ID=hemicord-ai,FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com,FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com,FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCarGzYoheg49ac\n2FAdCyVq7PRp7UcdzAvOYnoxUsjXTO7LjZdV4fCShIdmvL5WUdY7spOqWV+c32sJ\nofDZyC27BanL6JFJwq292X5gZTJW+ycvPNi2Y6Pn+tN5TVJNh5Sft0MKZsKkWrXT\nDW1SjJfXigw/bKID8ejyEEzthRWgYbzym70pKzVMakoPQtrS75nAcx27yxbfZQxq\n7ILcdt6IQGXW1DrWyoOutTFsRKBwz22sXk/ryo7GhmDl7W/AlEGVS50Pjiuli+US\nkbgvQQGOd/gXAS1Qu+rN18cCfscWBJYGtkIdULQ92ct9Vr85vm/0WSACh2iy7BuZ\n1PnUgHtPAgMBAAECggEABxLXStRQOqeWIzJ8qMoKNN4k/V/Vw/CWzPem+UYnxjo6\npNd9siFKRGvIL3QhS5xO17MT2r4J8ogrLSkZSonDlvfW1er1vgb9CsooDpYs26/S\nZnAkxGPr1TTyN+wdKqDb31ldDlw4ZEDRFkJZG2XaSd1X2wyySiDlk4XC/DfSZIpm\n3fOV2c1Ho2y1zrvzyf8FFQKwak+k05lNqR3SB+emvUdK6mFfQo7y/zFrbisFN4TW\njHo/w95CuOviOcSu1QclTigsrmriKvbv8BPf5A5lI6vlrHbIrosi77GkBXIiGf2C\nCQrfquInpJOfuXqn0AMJaMKYhvqL4br6ZoOE1zLhkQKBgQDOIZ59wUU/za6xfnip\nUp1m7HbaBjQ5UWyrlwytNPqkK6tXvbnXHo4KA0p3dv3IuN3AxOh4vOpOM7ZnP4WL\npSh1D9rIwPs3VYwh9iQQUZjWW9DhIUPNRVU6jKwOJtOPJ2CeHgo+3CSFPDuZz0Ci\ni7ScGhxv+MrDS7iW+HnOT05L/wKBgQDAF9vEnl303Y4mbcMaHc/2x4jVdD4YJF+J\nQ4a8NcieVJuHq4yeZ6/r++0+IPhfChfoGPmZcn5CqjFKuTDDD/aYv646Mq5LNKv+\nW86sq081JJWxVEEDoIkG0mklFZ+OMJXCTqn8z/UPlSl+KNKCqgIh/sPuL0F9tGYk\np3S0/WIQsQKBgHgRQR6DG3Ekv6MHxgTq6GBxUHGCt5zDfwcb/vhNKcnC3hVHoB5b\n3+SZMiEQIJdwh0qn57mcYOaYXKEbcRB8bWpyh7/0GOCMZgnKNAuFW/9QkATyuWmx\n/wkRs46ysvxptW+kk9c1p9gr05OuEzobImLjGrlmM8U6MBVQOrMfor3FAoGAfPmI\nw9z85+iVKS9UNdObj8S1o5ojI/XWKinCqQSc51XIcnYL4Ks462FWMouky8B3WUuW\naFzzBFBSDXl63g2utCZRJg//EXLNS4lTZ0d1GvAYa+yS99ckD0opmjT9P7cgV/Bx\n68coeuDiw++vNc+B37gupPIdu7j4k3RXG8GWYaECgYBOkWxp6TxEq5ucdSyuFLog\nNsJY6vV2kk2vkHkGRRMXIuN2nlJCqc1VHES2mdU7Zf4QnYOYhw0INyDnJy83IRzT\ne7qHMRkAW7/GMKcaPx/5zctZJ39xmABzdPSVAXbtgMuOhtU2EuuTJe45pbcJujzc\ndy2jPK/FE1QsHvvze8obhg==\n-----END PRIVATE KEY-----\n"

if %errorlevel% equ 0 (
    echo.
    echo ====================================================
    echo [SUCCESS] Backend deployed to Cloud Run!
    echo ====================================================
    echo.
    echo Getting service URL...
    echo.
    gcloud run services describe hemicord-api --region us-central1 --format="value(status.url)"
    echo.
    echo Copy the URL above and continue with:
    echo 1. Create .env.production in project root with: VITE_API_URL=[your-url]
    echo 2. Run: npm run build
    echo 3. Run: firebase deploy --only hosting
    echo.
) else (
    echo [ERROR] Deployment failed. Check errors above.
    pause
    exit /b 1
)

echo.
pause
