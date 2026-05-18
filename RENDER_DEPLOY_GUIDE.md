# Render Backend Deployment Guide

**Status:** Ready for deployment  
**Time to Deploy:** 5 minutes  
**Cost:** Free tier (with 15-minute inactivity spindown)

---

## 🎯 Quick Overview

You'll deploy your Express.js backend to **Render** (free hosting):

```
Local Backend         Render Server            Firebase
(localhost:3001) →   (Production API)    →    (Firestore DB)
                      paid-api.onrender.com
```

---

## 📋 Prerequisites ✅

- [x] Backend built (`server/dist/` ready)
- [x] Firebase credentials configured (`.env`)
- [x] GitHub repository pushed
- [x] Render account (sign up at https://render.com)

---

## 🚀 Deploy in 5 Steps

### Step 1: Sign Up for Render (2 min)

1. Visit: https://render.com
2. Click **"Sign Up"**
3. Choose **"GitHub"** for signup
4. Authorize access to your GitHub account

---

### Step 2: Create Web Service (1 min)

1. In Render dashboard, click **"New +"** (top right)
2. Select **"Web Service"**
3. Select **"GitHub"** as source
4. Authorize if prompted
5. Search for **"Hemicordulia"** repository
6. Click to connect

---

### Step 3: Configure Service (2 min)

Fill in the form:

```
Name:                    hemicord-api
Runtime:                 Node
Region:                  (Select closest to you)
Build Command:           cd server && npm install && npm run build
Start Command:           cd server && npm start
Plan:                    Free
```

**Then click "Create Web Service"**

---

### Step 4: Add Environment Variables (1 min)

The service will start building. While it builds:

1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add these 6 variables:

| Key | Value |
|-----|-------|
| `PORT` | `3001` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://hemicord-ai.web.app` |
| `FIREBASE_PROJECT_ID` | `hemicord-ai` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com` |
| `FIREBASE_DATABASE_URL` | `https://hemicord-ai.firebaseio.com` |

**For `FIREBASE_PRIVATE_KEY`:**
- Open your JSON key file (hemicord-ai-firebase-adminsdk-fbsvc-817347ead0.json)
- Find the `"private_key"` value
- Copy the entire value (including BEGIN/END PRIVATE KEY)
- Add as environment variable:
  - Key: `FIREBASE_PRIVATE_KEY`
  - Value: `[paste the key with \n intact]`

Click **"Save"** after adding all variables.

---

### Step 5: Verify Deployment (1 min)

Once the build completes (green checkmark ✅):

1. Click the **"Visit"** button to see your API
2. You'll see your live API URL: `https://hemicord-api-xxxx.onrender.com`
3. Test the health endpoint:
   ```
   https://hemicord-api-xxxx.onrender.com/api/health
   ```

---

## ✅ Test Your Deployment

### Test 1: Health Check
```bash
curl https://hemicord-api-xxxx.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-05-18T..."
}
```

### Test 2: Market Analysis
```bash
curl -X POST https://hemicord-api-xxxx.onrender.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"query":"Is Bitcoin bullish?"}'
```

**Expected Response:**
```json
{
  "analysis": "BTC at $49,682. RSI 80 (overbought)...",
  "metrics": {...}
}
```

---

## 🔗 Update Frontend API Endpoint

Once your backend URL is ready, update the frontend:

### Option A: Easy (Environment Variable)
Create `.env.production` in project root:
```
VITE_API_URL=https://hemicord-api-xxxx.onrender.com
```

### Option B: Direct (Update Code)
In your frontend components that call the API, change:
```javascript
// From:
fetch('http://localhost:3001/api/analyze')

// To:
fetch('https://hemicord-api-xxxx.onrender.com/api/analyze')
```

Then rebuild and redeploy to Firebase:
```bash
npm run build
firebase deploy --only hosting
```

---

## ⏸️ Important: Free Tier Spindown

**On free tier, Render spins down after 15 minutes of inactivity.**

This means:
- First request after inactivity takes ~30 seconds
- Subsequent requests are fast
- **Solution:** Upgrade to Starter plan ($7/month) to prevent spindown

---

## 🐛 Troubleshooting

### "Build failed"
```bash
# Check build command in Render dashboard
# Make sure it includes: cd server && npm install && npm run build
```

### "Cannot find module 'firebase-admin'"
```bash
# Render needs to install dependencies
# Add this to Build Command: npm install before npm run build
# Already configured: ✓
```

### "CORS error from frontend"
```bash
# Make sure FRONTEND_URL in environment variables is correct
# Should be: https://hemicord-ai.web.app
```

### "Firebase authentication failed"
```bash
# Check that FIREBASE_PRIVATE_KEY has \n characters preserved
# Copy from .env file, not from .json file directly
```

### "Service won't start after deployment"
```bash
# Check logs in Render dashboard
# Click service name → Logs
# Look for error messages
# Common cause: Missing environment variable
```

---

## 📊 Your Architecture After Deployment

```
┌─────────────────────────────────────────────────┐
│          CyberSculpt Full Stack Live            │
├─────────────────────────────────────────────────┤
│                                                 │
│  FRONTEND (React 19 + Vite)                    │
│  📍 https://hemicord-ai.web.app                │
│  ├─ Hosted on Firebase Hosting                 │
│  └─ Makes requests to backend API              │
│                                                 │
│  BACKEND (Express.js + Node)                   │
│  📍 https://hemicord-api-xxxx.onrender.com     │
│  ├─ Hosted on Render                           │
│  ├─ 5 API endpoints                            │
│  └─ Connects to Firestore                      │
│                                                 │
│  DATABASE (Firestore)                          │
│  📍 hemicord-ai (Firebase project)             │
│  ├─ Stores analyses & feedback                 │
│  └─ Real-time updates enabled                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🎯 API Endpoints (After Deployment)

```
POST   /api/analyze          Market analysis
GET    /api/analyses         Query history
POST   /api/feedback         User ratings
GET    /api/stats            Database stats
GET    /api/health           Health check
```

**Base URL:** `https://hemicord-api-xxxx.onrender.com`

---

## 💰 Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Firebase Hosting** | 10 GB/month | ✅ Free |
| **Firestore Database** | 50K ops/month | ✅ Free |
| **Render Backend** | 750 hours/month | ✅ Free |
| **Total** | - | **$0/month** |

**Upgrade options:**
- Render Starter ($7/mo) - No spindown
- Firebase Blaze - Pay per use

---

## ✨ What You Get

After deployment:

✅ **Frontend** - Live React app at hemicord-ai.web.app  
✅ **Backend** - Live API at hemicord-api-xxxx.onrender.com  
✅ **Database** - Firestore with real-time sync  
✅ **AI Analysis** - AdvancedTemporalAgent for market analysis  
✅ **Auto-sync** - GitHub auto-push enabled  

---

## 📝 Deployment Checklist

- [ ] Sign up for Render
- [ ] Create Web Service from GitHub
- [ ] Configure build/start commands
- [ ] Add 6 environment variables
- [ ] Save and wait for build to complete
- [ ] Test health endpoint
- [ ] Update frontend API endpoint (if needed)
- [ ] Redeploy frontend to Firebase
- [ ] Test full flow end-to-end

---

## 🆘 Need Help?

**Render Dashboard:** https://dashboard.render.com  
**Render Docs:** https://render.com/docs  
**Firebase Console:** https://console.firebase.google.com

---

## 🎉 You're Ready!

Your full-stack app will be production-ready in ~10 minutes!

**Next Action:** Sign up for Render and create your Web Service.

---

**Questions?** Check the troubleshooting section or contact Render support via their dashboard.
