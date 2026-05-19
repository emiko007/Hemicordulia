# Google Cloud Run Backend Deployment Guide

**Status:** Backend ready for Cloud Run  
**Time to Deploy:** 10 minutes  
**Cost:** Free tier (2M requests/month, $0 minimum)  
**Advantage:** Always-on (no spindown)

---

## 🎯 Why Google Cloud Run?

| Feature | Render | Cloud Run |
|---------|--------|-----------|
| **Free Tier** | Limited | 2M requests/month |
| **Spindown** | 15 minutes | ❌ Never |
| **Performance** | Good | Excellent |
| **Setup** | Simple | Simple |
| **Cost** | $7/mo paid | $0-5/mo typical |
| **Scaling** | Auto | Auto |

---

## 📋 Prerequisites ✅

- [x] Backend built (TypeScript compiled)
- [x] Dockerfile created in root
- [x] GitHub repository pushed
- [x] Firebase credentials configured
- [ ] Google account (free)
- [ ] Google Cloud SDK installed

---

## 🚀 Deploy in 5 Steps

### Step 1: Create Google Cloud Project (2 min)

1. Visit: https://console.cloud.google.com
2. Click project dropdown (top left) → **"New Project"**
3. Name: `hemicord-ai`
4. Click **"Create"** (wait 1-2 seconds)
5. Click the new project to open it

---

### Step 2: Enable Required APIs (1 min)

1. In Cloud Console, search for: **"Cloud Run API"**
2. Click result → Click **"ENABLE"**
3. Search for: **"Artifact Registry API"**
4. Click result → Click **"ENABLE"**
5. Search for: **"Cloud Build API"**
6. Click result → Click **"ENABLE"**

---

### Step 3: Install Google Cloud SDK (3 min)

**Windows:**
```bash
# Download installer
https://cloud.google.com/sdk/docs/install-gcloud

# Run installer, follow prompts
# Then initialize:
gcloud init
```

**Or use Cloud Shell (in browser):**
1. In Cloud Console (top right) → Click **"Activate Cloud Shell"**
2. Terminal opens in browser (skip local install)

**Verify installation:**
```bash
gcloud --version
```

---

### Step 4: Deploy to Cloud Run (3 min)

**Set your project ID:**
```bash
gcloud config set project hemicord-ai
```

**Deploy from GitHub:**
```bash
gcloud run deploy hemicord-api \
  --source=. \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars PORT=3001,NODE_ENV=production,\
FRONTEND_URL=https://hemicord-ai.web.app,\
FIREBASE_PROJECT_ID=hemicord-ai,\
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com,\
FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com,\
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n(YOUR_KEY)\n-----END PRIVATE KEY-----\n"
```

**Replace `YOUR_KEY`** with your actual private key from the Firebase JSON file.

**Alternative (Easier - No CLI):**

Use Cloud Console Web UI:
1. Go to **"Cloud Run"** in left menu
2. Click **"Create Service"**
3. Select **"Deploy one revision from an existing image"**
4. In Image URL, enter your Docker image:
   ```
   hemicord-ai (builds automatically from GitHub)
   ```
5. Configure deployment settings
6. Add environment variables (see below)
7. Click **"Deploy"**

---

### Step 5: Configure Environment Variables (1 min)

In Cloud Run service settings:

**Add these 7 environment variables:**

```
PORT = 3001
NODE_ENV = production
FRONTEND_URL = https://hemicord-ai.web.app
FIREBASE_PROJECT_ID = hemicord-ai
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com
FIREBASE_DATABASE_URL = https://hemicord-ai.firebaseio.com
FIREBASE_PRIVATE_KEY = (from your JSON key, with \n preserved)
```

Click **"Deploy"**

**Build & deployment time: ~2 minutes**

---

## ✅ Your Service is Live!

After deployment completes:

```
🎉 Service deployed!
Service URL: https://hemicord-api-xxxxx.run.app
Region: us-central1
Status: ✅ Active
```

---

## 🧪 Test Your Deployment

### Test 1: Health Check
```bash
curl https://hemicord-api-xxxxx.run.app/api/health
```

**Expected Response:**
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

### Test 3: Visit Frontend
https://hemicord-ai.web.app (should now connect to backend)

---

## 🔗 Connect Frontend to Backend

See [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md)

**1. Create `.env.production`:**
```env
VITE_API_URL=https://hemicord-api-xxxxx.run.app
```

**2. Rebuild frontend:**
```bash
npm run build
```

**3. Redeploy to Firebase:**
```bash
firebase deploy --only hosting
```

---

## 📊 Cloud Run Free Tier Benefits

### Monthly Quotas (Per Project)
- **Requests:** 2,000,000 free
- **Compute time:** 360,000 GB-seconds
- **Networking:** 1 GB egress free

### For Your App
- **Typical request:** ~1-2 seconds execution
- **Monthly requests:** 100,000 realistic
- **Monthly cost:** **$0** (well within free tier)

---

## ⚡ Cloud Run vs Render Comparison

| Aspect | Cloud Run | Render |
|--------|-----------|--------|
| **Free Tier** | 2M reqs/mo | Limited |
| **Always-on** | ✅ Yes | ❌ No (15m spindown) |
| **First Request** | <1 second | ~1 second (after spindown) |
| **Scaling** | ✅ Auto | ✅ Auto |
| **Monitoring** | Excellent | Good |
| **Setup Complexity** | Medium | Simple |
| **Community** | Huge | Growing |

---

## 📈 Monitoring & Logs

### View Logs
1. Cloud Console → **"Cloud Run"**
2. Click your service → **"Logs"**
3. See real-time application logs

### Monitor Metrics
1. Click service → **"Metrics"**
2. View: Requests, latency, errors, CPU usage

### Set Alerts
1. Click service → **"Alerts"**
2. Create alert for errors or high latency

---

## 🔐 Environment Variables Best Practices

**For FIREBASE_PRIVATE_KEY:**

❌ **Don't copy from JSON file directly**

✅ **Do copy from your .env file:**
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIB...(full key)...\n-----END PRIVATE KEY-----\n"
```

The `\n` characters are important!

---

## 🐛 Troubleshooting

### "Build failed"
```
Check: Dockerfile in root directory
Check: server/ folder structure
Solution: Verify Dockerfile matches your project structure
```

### "Container won't start"
```
Check: PORT must be 3001
Check: All environment variables are set
View logs: Cloud Console → Cloud Run → Logs
```

### "CORS error from frontend"
```
Verify: FRONTEND_URL = https://hemicord-ai.web.app (exact match)
Redeploy: gcloud run deploy ... (with updated env vars)
```

### "Firebase authentication failed"
```
Verify: FIREBASE_PRIVATE_KEY has \n characters
Example: ...key...\n-----END PRIVATE KEY-----\n
Not: ...key...-----END PRIVATE KEY-----
```

### "504 timeout errors"
```
Cause: Firebase initialization slow
Solution: Increase Cloud Run timeout (default 300s is fine)
```

---

## 🚀 Auto-Deploy from GitHub (Optional)

Set up automatic deployment on git push:

1. Cloud Console → **"Cloud Run"**
2. Click service → **"Settings"**
3. Click **"Cloud Code"** section
4. Enable **"Connect to GitHub"**
5. Select repository and branch
6. Each push auto-deploys!

---

## 📊 Architecture with Cloud Run

```
React Frontend (LIVE)
└─ https://hemicord-ai.web.app
   ↓
Express Backend (LIVE)
└─ https://hemicord-api-xxxxx.run.app
   (Cloud Run - Google)
   ↓
Firestore Database (LIVE)
└─ Firebase
   ↓
AdvancedTemporalAgent
└─ AI Market Analysis
```

---

## ✨ Success Checklist

- [ ] Google Cloud project created
- [ ] Required APIs enabled (Cloud Run, Artifact Registry, Cloud Build)
- [ ] Service deployed to Cloud Run
- [ ] Environment variables configured
- [ ] Health endpoint responds (200 OK)
- [ ] Market analysis endpoint works
- [ ] Frontend connects successfully
- [ ] Full end-to-end test passes

---

## 📚 Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Deploying with Dockerfile](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)
- [Environment Variables](https://cloud.google.com/run/docs/configuring/services/environment-variables)
- [Pricing & Free Tier](https://cloud.google.com/run/pricing)

---

## 💡 Tips & Best Practices

1. **Use Cloud Shell** (in browser) to skip local SDK installation
2. **Set memory to 512 MB** (default) - sufficient for your app
3. **Use us-central1 region** (best free tier coverage)
4. **Enable automatic scaling** (already default)
5. **Monitor costs** - Billing tab shows free tier usage

---

## 🎯 What's Next

1. ✅ Deploy backend to Cloud Run
2. 📝 Update frontend API endpoint
3. 🔗 Redeploy frontend to Firebase
4. 🧪 Test end-to-end flow

See [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md) for frontend updates.

---

**Your app will be fully production-ready on Google Cloud Run! 🚀**

**Cost: $0/month (within free tier)**
