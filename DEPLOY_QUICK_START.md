# 🚀 Quick Start - Cloud Run Deployment

**All automation is ready. Just follow these 3 simple steps.**

---

## ✅ Step 1: One-Time Google Cloud Setup (4 min)

### 1a. Create Project
- Visit: https://console.cloud.google.com
- Project dropdown (top left) → **New Project**
- Name: `hemicord-ai`
- Click Create

### 1b. Enable APIs (Do all 3)
Search in Cloud Console for each:
1. **"Cloud Run API"** → Enable
2. **"Artifact Registry API"** → Enable
3. **"Cloud Build API"** → Enable

---

## 🚀 Step 2: Deploy Backend (3 min)

**Run ONE of these commands:**

### Option A: PowerShell (Windows - Recommended)
```powershell
cd C:\Users\DELL\Downloads\cybersculpt-showcase
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\deploy-cloud-run.ps1
```

### Option B: Batch Script
```bash
cd C:\Users\DELL\Downloads\cybersculpt-showcase
deploy-cloud-run.bat
```

### Option C: Cloud Shell (Browser - No Installation)
1. In Cloud Console → Click **"Activate Cloud Shell"** (top right)
2. In terminal:
```bash
gcloud run deploy hemicord-api \
  --source=. \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --set-env-vars PORT=3001,NODE_ENV=production,FRONTEND_URL=https://hemicord-ai.web.app,FIREBASE_PROJECT_ID=hemicord-ai,FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com,FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com,FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCarGzYoheg49ac\n2FAdCyVq7PRp7UcdzAvOYnoxUsjXTO7LjZdV4fCShIdmvL5WUdY7spOqWV+c32sJ\nofDZyC27BanL6JFJwq292X5gZTJW+ycvPNi2Y6Pn+tN5TVJNh5Sft0MKZsKkWrXT\nDW1SjJfXigw/bKID8ejyEEzthRWgYbzym70pKzVMakoPQtrS75nAcx27yxbfZQxq\n7ILcdt6IQGXW1DrWyoOutTFsRKBwz22sXk/ryo7GhmDl7W/AlEGVS50Pjiuli+US\nkbgvQQGOd/gXAS1Qu+rN18cCfscWBJYGtkIdULQ92ct9Vr85vm/0WSACh2iy7BuZ\n1PnUgHtPAgMBAAECggEABxLXStRQOqeWIzJ8qMoKNN4k/V/Vw/CWzPem+UYnxjo6\npNd9siFKRGvIL3QhS5xO17MT2r4J8ogrLSkZSonDlvfW1er1vgb9CsooDpYs26/S\nZnAkxGPr1TTyN+wdKqDb31ldDlw4ZEDRFkJZG2XaSd1X2wyySiDlk4XC/DfSZIpm\n3fOV2c1Ho2y1zrvzyf8FFQKwak+k05lNqR3SB+emvUdK6mFfQo7y/zFrbisFN4TW\njHo/w95CuOviOcSu1QclTigsrmriKvbv8BPf5A5lI6vlrHbIrosi77GkBXIiGf2C\nCQrfquInpJOfuXqn0AMJaMKYhvqL4br6ZoOE1zLhkQKBgQDOIZ59wUU/za6xfnip\nUp1m7HbaBjQ5UWyrlwytNPqkK6tXvbnXHo4KA0p3dv3IuN3AxOh4vOpOM7ZnP4WL\npSh1D9rIwPs3VYwh9iQQUZjWW9DhIUPNRVU6jKwOJtOPJ2CeHgo+3CSFPDuZz0Ci\ni7ScGhxv+MrDS7iW+HnOT05L/wKBgQDAF9vEnl303Y4mbcMaHc/2x4jVdD4YJF+J\nQ4a8NcieVJuHq4yeZ6/r++0+IPhfChfoGPmZcn5CqjFKuTDDD/aYv646Mq5LNKv+\nW86sq081JJWxVEEDoIkG0mklFZ+OMJXCTqn8z/UPlSl+KNKCqgIh/sPuL0F9tGYk\np3S0/WIQsQKBgHgRQR6DG3Ekv6MHxgTq6GBxUHGCt5zDfwcb/vhNKcnC3hVHoB5b\n3+SZMiEQIJdwh0qn57mcYOaYXKEbcRB8bWpyh7/0GOCMZgnKNAuFW/9QkATyuWmx\n/wkRs46ysvxptW+kk9c1p9gr05OuEzobImLjGrlmM8U6MBVQOrMfor3FAoGAfPmI\nw9z85+iVKS9UNdObj8S1o5ojI/XWKinCqQSc51XIcnYL4Ks462FWMouky8B3WUuW\naFzzBFBSDXl63g2utCZRJg//EXLNS4lTZ0d1GvAYa+yS99ckD0opmjT9P7cgV/Bx\n68coeuDiw++vNc+B37gupPIdu7j4k3RXG8GWYaECgYBOkWxp6TxEq5ucdSyuFLog\nNsJY6vV2kk2vkHkGRRMXIuN2nlJCqc1VHES2mdU7Zf4QnYOYhw0INyDnJy83IRzT\ne7qHMRkAW7/GMKcaPx/5zctZJ39xmABzdPSVAXbtgMuOhtU2EuuTJe45pbcJujzc\ndy2jPK/FE1QsHvvze8obhg==\n-----END PRIVATE KEY-----\n"
```

**⏳ Waits 2-3 minutes for build... then shows:**
```
Service deployed!
Service URL: https://hemicord-api-xxxxx.run.app
```

---

## 🔗 Step 3: Update Frontend (2 min)

### 3a. Create environment file

Create `.env.production` in your project root:

```env
VITE_API_URL=https://hemicord-api-xxxxx.run.app
```

(Replace `xxxxx` with your actual service name)

### 3b. Rebuild & Deploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

---

## ✅ Done!

Your full-stack app is LIVE:
- **Frontend:** https://hemicord-ai.web.app
- **Backend:** https://hemicord-api-xxxxx.run.app
- **Database:** Firestore

---

## 🧪 Quick Test

```bash
# Test backend
curl https://hemicord-api-xxxxx.run.app/api/health

# Visit app
https://hemicord-ai.web.app
```

---

## 📚 Full Documentation

- [CLOUD_RUN_AUTOMATED_SETUP.md](./CLOUD_RUN_AUTOMATED_SETUP.md) - Complete guide
- [CLOUD_RUN_DEPLOY_GUIDE.md](./CLOUD_RUN_DEPLOY_GUIDE.md) - Detailed reference
- [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md) - Frontend update

---

## 🎯 Summary

| Step | Time | Action |
|------|------|--------|
| 1 | 4 min | Create Google Cloud project & enable APIs |
| 2 | 3 min | Run deployment script |
| 3 | 2 min | Update frontend with API URL |
| **Total** | **~10 min** | **Full-stack deployment complete!** |

---

**Everything is automated. Just run the script! 🚀**
