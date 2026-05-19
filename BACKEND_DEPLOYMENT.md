# Backend Deployment Guide - Google Cloud Run

**Status:** Backend ready for deployment  
**Target:** Google Cloud Run (Free tier Docker hosting)  
**Time:** 10 minutes

---

## 📋 Current Status

✅ Frontend deployed: https://hemicord-ai.web.app  
✅ Firestore database: Configured & secured  
✅ Backend built: TypeScript compiled to JavaScript  
✅ Docker image: Dockerfile created & optimized  
⏳ Backend hosting: Ready for Cloud Run deployment

---

## 🎯 Why Google Cloud Run?

✅ **2 Million free requests/month** (vs Render's limited free tier)  
✅ **Always-on** (no 15-minute spindown)  
✅ **Excellent performance** (low latency)  
✅ **Auto-scaling** included  
✅ **$0-5/month typical cost**

### vs Other Options
| Service | Free Tier | Always-On | Setup |
|---------|-----------|-----------|-------|
| **Cloud Run** | 2M reqs | ✅ Yes | Medium |
| Render | Limited | ❌ (15m) | Simple |
| Railway | $5 credit | ✅ Yes | Simple |
| Heroku | None | N/A | N/A |

---

## 🚀 Deploy to Cloud Run (Step by Step)

### Prerequisites ✅
- [x] Frontend at https://hemicord-ai.web.app
- [x] Firestore database deployed
- [x] Backend code in GitHub (emiko007/Hemicordulia)
- [x] Dockerfile created in root
- [ ] Google account (free)
- [ ] Google Cloud SDK installed

### Step 1: Create Google Cloud Project (2 min)

1. Visit: https://console.cloud.google.com
2. Click project dropdown (top left)
3. Click **"New Project"**
4. **Name:** hemicord-ai
5. Click **"Create"** → wait 1-2 seconds
6. Click new project to open

### Step 2: Enable Required APIs (1 min)

1. Search: **"Cloud Run API"** → Enable
2. Search: **"Artifact Registry API"** → Enable
3. Search: **"Cloud Build API"** → Enable

### Step 3: Install Google Cloud SDK or Use Cloud Shell (2 min)

**Option A: Use Cloud Shell (No Installation Required)**
- Top right in Cloud Console → Click **"Activate Cloud Shell"**
- Terminal opens in browser
- Skip to Step 4

**Option B: Install Locally**
1. Download: https://cloud.google.com/sdk/docs/install-gcloud
2. Run installer
3. Terminal: `gcloud init`

### Step 4: Deploy to Cloud Run (3 min)

**Set project:**
```bash
gcloud config set project hemicord-ai
```

**Deploy command:**
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
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n(YOUR_ACTUAL_KEY)\n-----END PRIVATE KEY-----\n"
```

**Replace `YOUR_ACTUAL_KEY`** with your Firebase private key.

**Build & deployment time: ~2-3 minutes**

---

## ✅ Your Service is Live!

After deployment, you'll see:
```
✓ Deploying...
✓ Build complete!
Service deployed to Cloud Run
Service URL: https://hemicord-api-xxxxx.run.app
Region: us-central1
```

---

## ✅ Verify Deployment

```bash
# Test 1: Health check
curl https://hemicord-api-xxxxx.run.app/api/health

# Test 2: Market analysis
curl -X POST https://hemicord-api-xxxxx.run.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"query":"Is Bitcoin bullish?"}'

# Expected: { "analysis": "BTC at ...", "metrics": {...} }
```

---

## 🔗 Next: Update Frontend (2 min)

See [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md)

1. Create `.env.production`:
```env
VITE_API_URL=https://hemicord-api-xxxxx.run.app
```

2. Build & redeploy:
```bash
npm run build
firebase deploy --only hosting
```

---

## 📊 API Endpoints (After Deployment)

```
Base URL: https://hemicord-api-xxxxx.run.app

POST   /api/analyze      - Market analysis
GET    /api/analyses     - Query history
POST   /api/feedback     - User ratings
GET    /api/stats        - Statistics
GET    /api/health       - Health check
```

---

## ✅ Cloud Run Free Tier Benefits

**Monthly quotas (per project):**
- 2,000,000 requests ✅
- 360,000 GB-seconds compute ✅
- 1 GB egress ✅
- **Total monthly cost: $0**

**For your app:**
- Typical request: ~1-2 seconds
- Estimated monthly requests: 100,000
- Monthly cost: **$0** (within free tier)

---

## ⏸️ Cloud Run vs Other Services

| Feature | Cloud Run | Render |
|---------|-----------|--------|
| Free Tier | 2M reqs | Limited |
| Always-on | ✅ Yes | ❌ (15m spindown) |
| Setup | Medium | Simple |
| Performance | Excellent | Good |
| Scaling | Auto | Auto |
| Cost | $0-5/mo | $7/mo |

---

## 🐛 Troubleshooting

### Build Failed
```
Check logs: gcloud run logs read hemicord-api --limit 50
Common: Missing environment variables
Solution: Add all 7 env vars before deploying
```

### "Cannot find module"
```
Check: Dockerfile in root directory
Check: server/package.json exists
Check: Build command correct: cd server && npm run build
```

### CORS Error from Frontend
```
Verify: FRONTEND_URL = https://hemicord-ai.web.app (exact)
Fix: Update FRONTEND_URL in Cloud Run environment
Redeploy: gcloud run deploy ... with updated vars
```

### Firebase Auth Failed
```
Check: FIREBASE_PRIVATE_KEY has \n characters preserved
Example: ...key...\n-----END PRIVATE KEY-----\n
Not: ...key...-----END PRIVATE KEY-----
```

### View Detailed Logs
```bash
# Real-time logs
gcloud run logs read hemicord-api --limit 100 --follow

# Or in Cloud Console:
Cloud Run → hemicord-api → Logs tab
```

---

## 📈 Monitoring

### View Metrics (Cloud Console)
1. Cloud Run → hemicord-api
2. Metrics tab
3. Monitor: Requests, latency, errors, CPU

### Set Alerts
1. Cloud Run → hemicord-api → Settings
2. Create alert for errors or timeouts

---

## 💰 Cost Breakdown

| Item | Free Tier | Cost |
|------|-----------|------|
| Cloud Run requests | 2M/month | $0 |
| Compute time | 360K GB-s/month | $0 |
| Egress | 1 GB/month | $0 |
| **Total** | | **$0/month** |

**Upgrade options:**
- Stay free (recommended for MVP)
- Add more resources as needed
- Budget alert: Set to $10/month

---

## 🎯 Architecture

```
User Browser
    ↓
https://hemicord-ai.web.app
(Firebase Hosting - LIVE)
    ↓
API Calls ↓
    ↓
https://hemicord-api-xxxxx.run.app
(Cloud Run - Google - LIVE)
    ↓
    ├→ /api/analyze - AdvancedTemporalAgent
    ├→ /api/analyses - Firestore queries
    └→ /api/feedback - Firestore writes
        ↓
Firebase Firestore
(Database - LIVE)
```

---

## ✨ Success Checklist

- [ ] Google Cloud project created
- [ ] Required APIs enabled
- [ ] Dockerfile verified
- [ ] Service deployed to Cloud Run
- [ ] Environment variables configured
- [ ] Health endpoint responds (200 OK)
- [ ] Market analysis endpoint works
- [ ] Frontend updated
- [ ] Full end-to-end test passes

---

## 📚 Resources

- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [Dockerfile Best Practices](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)
- [Free Tier Guide](https://cloud.google.com/run/pricing)
- [Environment Variables](https://cloud.google.com/run/docs/configuring/environment-variables)
- [GitHub: emiko007/Hemicordulia](https://github.com/emiko007/Hemicordulia)
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
