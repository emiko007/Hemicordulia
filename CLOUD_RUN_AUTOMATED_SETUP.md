# Cloud Run Automated Deployment Setup

**Everything is ready for automated deployment! 🚀**

---

## 📋 What's Prepared

✅ **Deployment Scripts Created:**
- `deploy-cloud-run.ps1` (PowerShell - RECOMMENDED)
- `deploy-cloud-run.bat` (Batch)

✅ **Firebase Credentials:** Pre-configured with your private key

✅ **All Environment Variables:** Set automatically

✅ **Dockerfile:** Multi-stage optimized build ready

---

## 🎯 Pre-Deployment Checklist

Before running the script, complete these ONE-TIME steps:

### Step 1: Create Google Cloud Project (2 min) ✅ MUST DO

1. Visit: https://console.cloud.google.com
2. Click **project dropdown** (top left corner)
3. Click **"New Project"**
4. **Name:** `hemicord-ai`
5. Click **"Create"** (wait 1-2 seconds)
6. Click the new project to switch to it

### Step 2: Enable Required APIs (1 min) ✅ MUST DO

1. In Cloud Console search bar, search: **"Cloud Run API"**
2. Click the result
3. Click **"ENABLE"**
4. Repeat for: **"Artifact Registry API"**
5. Repeat for: **"Cloud Build API"**

(Takes ~30 seconds each, do all 3)

### Step 3: Set Up Authentication (1 min) ✅ MUST DO

**Option A: Use Cloud Shell (EASIEST - No Installation)**
1. In Cloud Console (top right) → Click **"Activate Cloud Shell"**
2. Terminal opens in browser
3. Skip to Step 4 below

**Option B: Install Google Cloud SDK Locally**
1. Download: https://cloud.google.com/sdk/docs/install-gcloud
2. Run installer, follow prompts
3. Terminal: `gcloud init`
4. Login with your Google account

---

## 🚀 Deploy Your Backend (3 min)

### Using PowerShell (Recommended):

```bash
cd C:\Users\DELL\Downloads\cybersculpt-showcase

# Set execution policy to allow script (one-time)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run deployment script
.\deploy-cloud-run.ps1
```

### Using Batch (Alternative):

```bash
cd C:\Users\DELL\Downloads\cybersculpt-showcase
deploy-cloud-run.bat
```

### Using Cloud Shell (Browser - No Installation):

1. Go to Cloud Console → Activate Cloud Shell (top right)
2. Copy & paste in terminal:
```bash
cd cybersculpt-showcase
gcloud run deploy hemicord-api \
  --source=. \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --set-env-vars PORT=3001,NODE_ENV=production,FRONTEND_URL=https://hemicord-ai.web.app,FIREBASE_PROJECT_ID=hemicord-ai,FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com,FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com,FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCarGzYoheg49ac\n2FAdCyVq7PRp7UcdzAvOYnoxUsjXTO7LjZdV4fCShIdmvL5WUdY7spOqWV+c32sJ\nofDZyC27BanL6JFJwq292X5gZTJW+ycvPNi2Y6Pn+tN5TVJNh5Sft0MKZsKkWrXT\nDW1SjJfXigw/bKID8ejyEEzthRWgYbzym70pKzVMakoPQtrS75nAcx27yxbfZQxq\n7ILcdt6IQGXW1DrWyoOutTFsRKBwz22sXk/ryo7GhmDl7W/AlEGVS50Pjiuli+US\nkbgvQQGOd/gXAS1Qu+rN18cCfscWBJYGtkIdULQ92ct9Vr85vm/0WSACh2iy7BuZ\n1PnUgHtPAgMBAAECggEABxLXStRQOqeWIzJ8qMoKNN4k/V/Vw/CWzPem+UYnxjo6\npNd9siFKRGvIL3QhS5xO17MT2r4J8ogrLSkZSonDlvfW1er1vgb9CsooDpYs26/S\nZnAkxGPr1TTyN+wdKqDb31ldDlw4ZEDRFkJZG2XaSd1X2wyySiDlk4XC/DfSZIpm\n3fOV2c1Ho2y1zrvzyf8FFQKwak+k05lNqR3SB+emvUdK6mFfQo7y/zFrbisFN4TW\njHo/w95CuOviOcSu1QclTigsrmriKvbv8BPf5A5lI6vlrHbIrosi77GkBXIiGf2C\nCQrfquInpJOfuXqn0AMJaMKYhvqL4br6ZoOE1zLhkQKBgQDOIZ59wUU/za6xfnip\nUp1m7HbaBjQ5UWyrlwytNPqkK6tXvbnXHo4KA0p3dv3IuN3AxOh4vOpOM7ZnP4WL\npSh1D9rIwPs3VYwh9iQQUZjWW9DhIUPNRVU6jKwOJtOPJ2CeHgo+3CSFPDuZz0Ci\ni7ScGhxv+MrDS7iW+HnOT05L/wKBgQDAF9vEnl303Y4mbcMaHc/2x4jVdD4YJF+J\nQ4a8NcieVJuHq4yeZ6/r++0+IPhfChfoGPmZcn5CqjFKuTDDD/aYv646Mq5LNKv+\nW86sq081JJWxVEEDoIkG0mklFZ+OMJXCTqn8z/UPlSl+KNKCqgIh/sPuL0F9tGYk\np3S0/WIQsQKBgHgRQR6DG3Ekv6MHxgTq6GBxUHGCt5zDfwcb/vhNKcnC3hVHoB5b\n3+SZMiEQIJdwh0qn57mcYOaYXKEbcRB8bWpyh7/0GOCMZgnKNAuFW/9QkATyuWmx\n/wkRs46ysvxptW+kk9c1p9gr05OuEzobImLjGrlmM8U6MBVQOrMfor3FAoGAfPmI\nw9z85+iVKS9UNdObj8S1o5ojI/XWKinCqQSc51XIcnYL4Ks462FWMouky8B3WUuW\naFzzBFBSDXl63g2utCZRJg//EXLNS4lTZ0d1GvAYa+yS99ckD0opmjT9P7cgV/Bx\n68coeuDiw++vNc+B37gupPIdu7j4k3RXG8GWYaECgYBOkWxp6TxEq5ucdSyuFLog\nNsJY6vV2kk2vkHkGRRMXIuN2nlJCqc1VHES2mdU7Zf4QnYOYhw0INyDnJy83IRzT\ne7qHMRkAW7/GMKcaPx/5zctZJ39xmABzdPSVAXbtgMuOhtU2EuuTJe45pbcJujzc\ndy2jPK/FE1QsHvvze8obhg==\n-----END PRIVATE KEY-----\n"
```

---

## ⏱️ What Happens Next

**Deployment takes 2-3 minutes:**

1. ✅ Builds Docker image from Dockerfile
2. ✅ Uploads to Artifact Registry
3. ✅ Creates Cloud Run service
4. ✅ Deploys and starts service
5. ✅ Returns your API URL

**Output example:**
```
Service deployed!
Service URL: https://hemicord-api-xxxxx.run.app
```

---

## 🔗 After Deployment: Update Frontend (2 min)

Once you have your API URL from deployment:

### Step 1: Create environment file

Create `.env.production` in project root:

```env
VITE_API_URL=https://hemicord-api-xxxxx.run.app
```

(Replace `xxxxx` with your actual service name from deployment output)

### Step 2: Build frontend

```bash
npm run build
```

### Step 3: Deploy to Firebase

```bash
firebase deploy --only hosting
```

**That's it! Your full-stack app is live! 🎉**

---

## 🧪 Test Everything Works

### Test 1: Backend API

```bash
# Replace xxxxx with your service name
curl https://hemicord-api-xxxxx.run.app/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-05-19T..."
}
```

### Test 2: Market Analysis

```bash
curl -X POST https://hemicord-api-xxxxx.run.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"query":"Is Bitcoin bullish?"}'
```

### Test 3: Full App

Visit: https://hemicord-ai.web.app
- Go to MODULES → TEMPORAL HUB
- Enter a market query
- Should work instantly!

---

## 📊 Final Architecture

```
YOUR COMPUTER
    ↓
Frontend (React)
    ↓ https://hemicord-ai.web.app (Firebase - LIVE ✅)
    ↓
API Calls
    ↓
Backend (Express.js)
    ↓ https://hemicord-api-xxxxx.run.app (Cloud Run)
    ↓
Firestore Database
    ↓ hemicord-ai (Firebase)
```

---

## ✨ What's Automated

✅ **Docker build** - Multi-stage optimized  
✅ **Project setup** - Scripts handle all config  
✅ **Environment variables** - Pre-configured with your credentials  
✅ **Deployment** - One script to rule them all  
✅ **Monitoring** - Get logs instantly  

---

## 🐛 Troubleshooting

### "Build failed"
- Check Dockerfile in root exists
- Run: `docker build .` locally to test
- Check logs: `gcloud run logs read hemicord-api`

### "gcloud not found"
- Install from: https://cloud.google.com/sdk/docs/install-gcloud
- Or use Cloud Shell (no install needed)

### "Permission denied"
- Check project ID is correct: `hemicord-ai`
- Check APIs are enabled (Cloud Run, Artifact Registry, Cloud Build)

### "Docker image failed"
- Check your Dockerfile is valid: `docker build .`
- Verify server/ folder has package.json

---

## 🎯 Complete Checklist

- [ ] Google Cloud project created (hemicord-ai)
- [ ] All 3 APIs enabled
- [ ] Google Cloud SDK installed or Cloud Shell ready
- [ ] Run deployment script: `.\deploy-cloud-run.ps1`
- [ ] Copy API URL from output
- [ ] Create `.env.production` with API URL
- [ ] Build frontend: `npm run build`
- [ ] Deploy frontend: `firebase deploy --only hosting`
- [ ] Test health endpoint
- [ ] Test full app at hemicord-ai.web.app

---

## 📞 Quick Support

| Issue | Solution |
|-------|----------|
| Can't find gcloud | Install or use Cloud Shell |
| Project not found | Create at console.cloud.google.com |
| APIs not enabled | Check Cloud Console → APIs & Services |
| Deployment stuck | Check logs: `gcloud run logs read hemicord-api` |
| Frontend not working | Verify VITE_API_URL in .env.production |

---

## 🚀 Ready?

1. ✅ Create Google Cloud project (hemicord-ai)
2. ✅ Enable APIs (Cloud Run, Artifact Registry, Cloud Build)
3. ✅ Run: `.\deploy-cloud-run.ps1` (or .bat or Cloud Shell)
4. ✅ Copy API URL
5. ✅ Update frontend & redeploy

**That's all you need to do! Everything else is automated. 🎉**

---

**Your full-stack app will be production-ready in 12 minutes! Let me know when the backend deployment is complete!**
