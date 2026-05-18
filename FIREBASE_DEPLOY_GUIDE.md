# 🚀 Firebase Deployment - Quick Start Guide

Complete step-by-step guide to deploy CyberSculpt to Firebase in **< 10 minutes**.

## ✅ Pre-requisites Checklist

- [x] Firebase CLI installed: `npm install -g firebase-tools`
- [x] Frontend built: `npm run build` ✓
- [x] Backend ready: `server/` folder configured
- [ ] Firebase project created
- [ ] Google account (free Firebase tier)

---

## 🎯 Step 1: Create Firebase Project (2 minutes)

### Online Setup
1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Add Project"**
3. Enter project name: `cybersculpt-showcase`
4. Choose region: **US (or closest to you)**
5. Accept terms → **Create Project**

### Wait for project to initialize (~30 seconds)

---

## 🔑 Step 2: Get Firebase Credentials (3 minutes)

### For Backend (Express.js)

1. Go to **Project Settings** (⚙️ icon top-right)
2. Click **"Service Accounts"** tab
3. Click **"Generate New Private Key"**
4. Save the JSON file safely
5. Copy these values from the JSON:
   ```json
   {
     "project_id": "YOUR_PROJECT_ID",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...",
     "client_email": "firebase-adminsdk-xxx@yyy.iam.gserviceaccount.com"
   }
   ```

### For Frontend (Optional - for future features)
1. Go to **Project Settings** → **General** tab
2. Scroll to **"Your apps"**
3. Click **"Add App"** → Select **Web**
4. Copy the config (Firebase ID, API key, etc.)

---

## 🔧 Step 3: Configure Backend Credentials (2 minutes)

### Create `server/.env` file

```bash
cd server
cp .env.example .env
```

### Edit `server/.env` with your values:

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://cybersculpt-showcase.web.app

# From Firebase Service Account JSON
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...YOUR KEY...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@yyy.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
```

**⚠️ Important:** 
- Keep this file PRIVATE (in `.gitignore` - already done)
- Never commit `.env` file
- The `\n` in PRIVATE_KEY is literal (not actual newlines)

---

## 📋 Step 4: Update Firebase Config (1 minute)

### Edit `.firebaserc`

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

Replace `your-project-id` with your actual Firebase project ID from console.

---

## 🚀 Step 5: Deploy to Firebase (2 minutes)

### From project root:

```bash
# Login to Firebase (opens browser)
firebase login

# Initialize Firebase (if not done)
firebase init

# Deploy everything
firebase deploy
```

### What deploys:
- ✅ Frontend (React) → Firebase Hosting
- ✅ Backend (Express) → Cloud Functions
- ✅ Firestore database
- ✅ Security rules

### After deployment:
```
✓ Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project-id
Hosting URL: https://your-project-id.web.app
Functions URL: https://region-your-project-id.cloudfunctions.net
```

---

## ✨ What You Get (After Deploy)

| Component | URL | Status |
|-----------|-----|--------|
| Frontend | `https://your-project-id.web.app` | 🟢 Live |
| Backend API | `https://region-your-project-id.cloudfunctions.net/api` | 🟢 Live |
| Database | Firestore | 🟢 Auto-syncing |
| Monitoring | Firebase Console | 🟢 Real-time stats |

---

## 🔍 Step 6: Verify Deployment

### Test Frontend
```
Open: https://your-project-id.web.app
```

### Test Backend
```bash
curl https://region-your-project-id.cloudfunctions.net/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-05-18T...",
  "message": "CyberSculpt Backend is running"
}
```

### Test Analysis Endpoint
```bash
curl -X POST https://region-your-project-id.cloudfunctions.net/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"query":"Is Bitcoin bullish?"}'
```

---

## 📊 Enable Firestore Database

1. Go to **Firebase Console** → Your Project
2. Left sidebar → **Firestore Database**
3. Click **"Create Database"**
4. Select **"Start in production mode"**
5. Choose region (same as project)
6. Done! ✅

---

## 🔒 Security Rules (Already Configured)

Your `firestore.rules` already includes:
- ✅ Public read access to analyses
- ✅ Restricted write access
- ✅ Private feedback collection
- ✅ DDoS protection

No additional setup needed!

---

## 💰 Cost Estimate (Monthly)

| Service | Free Tier | Cost if Exceeded |
|---------|-----------|-----------------|
| Hosting | 10GB/month | $0.18/GB |
| Functions | 2M invocations | $0.40/1M |
| Firestore | 50K read/write | $0.06/100K |
| Storage | 1GB | $0.18/GB |

**Typical small project:** $0/month (under free tier)

---

## 🐛 Troubleshooting

### "Firebase project not found"
```bash
firebase login
firebase use --add
```

### "Cloud Functions error"
```bash
firebase functions:log
# Check error messages
firebase deploy --only functions
```

### "CORS error on frontend"
Update `server/src/server.ts`:
```typescript
const FRONTEND_URL = 'https://your-project-id.web.app';
```

Then redeploy:
```bash
firebase deploy --only functions
```

### "Firestore connection failed"
1. Verify Firestore is enabled in console
2. Check security rules in console
3. Verify credentials in `server/.env`

### "Functions timeout"
- Firebase free tier has 5-minute timeout
- Reduce query complexity
- Add caching layer

---

## 📈 Monitoring & Logs

### View Real-time Logs
```bash
firebase functions:log
```

### Monitor in Console
1. **Firebase Console** → Your Project
2. **Functions** tab → See invocation stats
3. **Firestore** → See database usage
4. **Hosting** → View bandwidth

---

## 🔄 Continuous Deployment

### Option A: GitHub Actions (Recommended)

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: npm run build
      - name: Deploy
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
```

### Option B: Manual Deploy
```bash
# After each commit
git push origin main
npm run build
firebase deploy
```

---

## 🎓 Next Steps

1. ✅ Deploy to Firebase
2. ⏭️ Set up custom domain
3. ⏭️ Configure authentication
4. ⏭️ Setup alerts in Firebase Console
5. ⏭️ Monitor performance

---

## 🆘 Support & Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Firestore Reference](https://firebase.google.com/docs/firestore)
- [Firebase CLI Docs](https://firebase.google.com/docs/cli)

---

## ✅ Deployment Checklist

- [ ] Firebase project created
- [ ] Service account credentials obtained
- [ ] `.env` file configured with credentials
- [ ] `.firebaserc` updated with project ID
- [ ] Frontend built (`npm run build`)
- [ ] Firestore database enabled
- [ ] Backend tested locally (`npm run dev`)
- [ ] Deployment command run (`firebase deploy`)
- [ ] Frontend URL accessible
- [ ] Backend API responding
- [ ] Analysis endpoint tested

---

**Your app is now LIVE on Firebase! 🎉**

Visit: `https://your-project-id.web.app`
