# Backend Deployment Guide - Render Hosting

**Status:** Backend ready for deployment  
**Target:** Render (Free tier Node.js hosting)  
**Time:** 5 minutes

---

## 📋 Current Status

✅ Frontend deployed: https://hemicord-ai.web.app  
✅ Firestore database: Configured & secured  
✅ Backend built: TypeScript compiled to JavaScript  
⏳ Backend hosting: Ready for Render deployment

---

## 🎯 Two Deployment Options

### Option 1: Render (RECOMMENDED) ✅
- **Hosting:** Free tier with easy GitHub integration
- **Setup:** 5 minutes
- **Features:** Auto-deploy on git push
- **Cost:** Free (with 15-min spindown) or $7/mo for always-on

### Option 2: Heroku (Legacy)
- Note: Free tier discontinued in 2022
- Alternative: Heroku Eco Dynos ($5/month)

---

## 🚀 Deploy to Render (Step by Step)

### Prerequisite: Frontend Deployment ✅
- [x] Frontend at https://hemicord-ai.web.app
- [x] Firestore database deployed
- [x] Backend code in GitHub (emiko007/Hemicordulia)

### Step 1: Create Render Account (2 min)

1. Visit https://render.com
2. Click "Sign Up"
3. Select "GitHub"
4. Authorize your GitHub account

### Step 2: Deploy Web Service (2 min)

1. In Render dashboard, click "New +" → "Web Service"
2. Select "GitHub" and authorize
3. Search for and select "Hemicordulia" repository
4. Fill in deployment settings:

```
Name:                hemicord-api
Runtime:             Node
Region:              (Select your region)
Build Command:       cd server && npm install && npm run build
Start Command:       cd server && npm start
Plan:                Free
```

5. Click "Create Web Service"

**Build takes 2-3 minutes...**

### Step 3: Configure Environment Variables (1 min)

While building, scroll to "Environment" section:

| Variable | Value |
|----------|-------|
| `PORT` | `3001` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://hemicord-ai.web.app` |
| `FIREBASE_PROJECT_ID` | `hemicord-ai` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com` |
| `FIREBASE_DATABASE_URL` | `https://hemicord-ai.firebaseio.com` |
| `FIREBASE_PRIVATE_KEY` | (See below) |

**For FIREBASE_PRIVATE_KEY:**

Open your saved JSON file and copy the full `private_key` value including `\n` characters:

```json
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...(full key)...==\n-----END PRIVATE KEY-----\n"
```

### Step 4: Wait for Build to Complete

Green checkmark ✅ = Success!

---

## ✅ Verify Deployment

Once live, test your API:

```bash
# Test 1: Health check
curl https://hemicord-api-xxxx.onrender.com/api/health

# Test 2: Market analysis
curl -X POST https://hemicord-api-xxxx.onrender.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"query":"Is Bitcoin bullish?"}'

# Expected response:
{
  "analysis": "BTC at $49,682...",
  "metrics": {...}
}
```

---

## 🔗 Next: Update Frontend (2 min)

See [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md)

1. Create `.env.production`:
```env
VITE_API_URL=https://hemicord-api-xxxx.onrender.com
```

2. Build & redeploy:
```bash
npm run build
firebase deploy --only hosting
```

---

## 📊 API Endpoints (After Deployment)

```
Base URL: https://hemicord-api-xxxx.onrender.com

POST   /api/analyze      - Market analysis
GET    /api/analyses     - Query history
POST   /api/feedback     - User ratings
GET    /api/stats        - Statistics
GET    /api/health       - Health check
```

---

## ⏸️ Important: Free Tier Spindown

After 15 minutes of inactivity, your service will spin down.

**Impact:**
- First request after spindown: ~30 seconds
- All subsequent requests: Normal speed

**Options:**
- Keep free tier (acceptable for testing)
- Upgrade to Starter plan ($7/month) - Always on
- Setup uptime monitoring to prevent spindown

---

## 🐛 Troubleshooting

### Build Failed
```
Check logs in Render dashboard
Look for: "npm ERR!" or missing dependencies
Solution: Verify build command includes: npm install
```

### "Cannot find module"
```
Error: Cannot find module 'firebase-admin'
Solution: Build command MUST include: npm install
Already set: ✓
```

### CORS Error
```
Error: CORS policy blocked request
Solution: Check FRONTEND_URL exactly matches deployed frontend
Should be: https://hemicord-ai.web.app
```

### Firebase Auth Failed
```
Error: Invalid credentials
Solution: Verify FIREBASE_PRIVATE_KEY preserves \n characters
Copy from .env file, not directly from .json
```

### Service Logs
View logs: Click service name → "Logs" tab
Look for error messages and stack traces

---

## 📈 Monitoring

### Check Service Health
1. Render Dashboard → Your service
2. Click "Logs" tab
3. Monitor for errors

### Monitor API Usage
1. Firebase Console → Firestore → Usage
2. Check read/write operations

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Render** | Free (spindown) | $7/month (always-on) |
| **Firebase** | $0 (within limits) | Pay per use |
| **Total** | **$0/month** | **$7/month** |

---

## 🎯 Complete Architecture

```
User Browser
    ↓
https://hemicord-ai.web.app (Firebase Hosting)
    ↓
    ├→ Static assets (React, CSS, JS)
    └→ API calls ↓
    
https://hemicord-api-xxxx.onrender.com (Render Backend)
    ↓
    ├→ /api/analyze - AdvancedTemporalAgent
    ├→ /api/analyses - Firestore queries
    └→ /api/feedback - Firestore writes
    
https://hemicord-ai.firebaseio.com (Firestore)
    ↓
    ├→ analyses collection (read/write)
    └→ feedback collection (read/write)
```

---

## ✨ Success Checklist

- [ ] Render account created
- [ ] Web Service deployed from GitHub
- [ ] Environment variables configured
- [ ] Build completed (green checkmark)
- [ ] Health endpoint responds (200 OK)
- [ ] Market analysis endpoint works
- [ ] Frontend updated to use new API URL
- [ ] Full end-to-end test passes

---

## 📚 Resources

- [Render Documentation](https://render.com/docs/deploy-node)
- [Express.js Guide](https://expressjs.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Your GitHub Repo](https://github.com/emiko007/Hemicordulia)

---

**You're ready to deploy! See [RENDER_DEPLOY_GUIDE.md](./RENDER_DEPLOY_GUIDE.md) for detailed steps.**
- ✅ Functions

### Step 3: Setup Firestore

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project or select existing
3. Enable Firestore Database
4. Select "Start in production mode"
5. Choose region (closest to you)

### Step 4: Build Frontend

```bash
npm run build
```

### Step 5: Deploy

```bash
# Deploy everything
firebase deploy

# Or deploy specific parts
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore
```

## 🔧 Detailed Setup

### Backend Setup

#### 1. Install Backend Dependencies

```bash
cd server
npm install
npm run build
```

#### 2. Configure Environment

Create `server/.env`:
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-project.web.app
```

Firebase credentials are handled automatically by Cloud Functions.

#### 3. Test Locally

```bash
npm run dev
# Server runs on http://localhost:3001
```

#### 4. Deploy to Cloud Functions

```bash
firebase deploy --only functions
```

### Frontend Setup

#### 1. Update API URL

In your React component, update the API endpoint:

```typescript
// src/lib/utils.ts
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api'
  : 'http://localhost:3001';

// Or use your custom domain
export const API_URL = 'https://api.your-domain.com';
```

#### 2. Update TemporalEngineView Component

```typescript
const handleAnalyze = async () => {
  setIsAnalyzing(true);
  try {
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    setAnalysisOutput(data.analysis);
    setHasResults(true);
  } catch (error) {
    console.error('Analysis failed:', error);
  } finally {
    setIsAnalyzing(false);
  }
};
```

#### 3. Build & Deploy

```bash
npm run build
firebase deploy --only hosting
```

## 📊 Firebase Project Structure

```
Firebase Project
├── Firestore Database
│   ├── analyses/       # Market analyses
│   └── feedback/       # User feedback
├── Cloud Functions
│   └── /api/*          # Backend API
├── Hosting
│   └── /               # React frontend
└── Storage (optional)
    └── assets/         # Images, etc.
```

## 🔗 Connecting Frontend to Backend

### Option 1: Firebase Cloud Functions (Recommended)

Functions are automatically deployed and available at:
```
https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api
```

### Option 2: Custom Domain

1. Verify domain in Firebase
2. Update hosting config:

```json
{
  "hosting": {
    "site": "your-site",
    "public": "dist",
    "rewrite": [
      {
        "source": "/api/**",
        "function": "backend"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Option 3: Separate Backend Service

Deploy backend separately to:
- Vercel
- Render
- Railway
- Replit

Then configure CORS and update frontend URL.

## 🔐 Security & Rules

### Firestore Rules (firestore.rules)

```
rules_version = '3';

service cloud.firestore {
  match /databases/{database}/documents {
    // Public read, authenticated write
    match /analyses/{doc=**} {
      allow read: if true;
      allow create: if request.auth.uid != null;
    }
    
    // Private feedback
    match /feedback/{doc=**} {
      allow write: if request.auth.uid != null;
      allow read: if request.auth.uid != null;
    }
  }
}
```

### Environment Variables

- Never commit `.env` files
- Use Firebase secret management:

```bash
# Set secrets in Cloud Functions
firebase functions:config:set someservice.key="value"
firebase deploy --only functions
```

## 📈 Monitoring & Logs

### View Logs

```bash
firebase functions:log
```

### Monitor in Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project
3. View:
   - Functions logs
   - Hosting logs
   - Firestore activity
   - Usage statistics

## 💰 Cost Breakdown (Monthly)

| Service | Free Tier | Cost if Exceeded |
|---------|-----------|-----------------|
| Firestore | 1GB storage, 50K read/write | $0.06 per 100K operations |
| Cloud Functions | 2M invocations | $0.40 per 1M |
| Hosting | 1GB storage, 10GB/month | $0.18 per GB |

**Typical small project:** $0/month (well under free tier)

## 🐛 Troubleshooting

### Functions Not Deploying

```bash
# Check for errors
firebase functions:log

# Rebuild and redeploy
cd server
npm run build
cd ..
firebase deploy --only functions
```

### CORS Issues

Update `firebase.json`:
```json
{
  "functions": [
    {
      "source": "server",
      "codebase": "default"
    }
  ]
}
```

### Database Connection Errors

1. Verify Firestore is enabled
2. Check security rules are correct
3. Ensure service account has permissions

```bash
firebase firestore:indexes
```

### Slow Cold Starts

- Minimize dependencies in Cloud Functions
- Use lightweight libraries
- Consider Node.js 20+

## 🎯 Next Steps

1. ✅ Deploy backend to Cloud Functions
2. ✅ Deploy frontend to Hosting
3. ✅ Setup custom domain
4. ✅ Enable authentication (optional)
5. ✅ Setup monitoring & alerts

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## 🆘 Support

Having issues? Check:
1. Firebase Console for error messages
2. Cloud Functions logs
3. Browser console (frontend errors)
4. [Firebase GitHub Issues](https://github.com/firebase/firebase-tools/issues)

---

**Backend deployed! 🚀**

Your application is now:
- ✅ Fully hosted on Firebase
- ✅ Auto-scaling with traffic
- ✅ Backed by Firestore database
- ✅ With zero server maintenance
