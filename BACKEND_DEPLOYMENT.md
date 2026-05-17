# Backend & Firebase Deployment Guide

Complete guide to deploy CyberSculpt backend to Firebase and connect frontend.

## 📋 Overview

- **Frontend:** React/Vite (Firebase Hosting)
- **Backend:** Express.js (Firebase Cloud Functions)
- **Database:** Firestore (Free tier included)
- **Cost:** FREE (within Firebase free tier limits)

## 🚀 Quick Start (10 minutes)

### Step 1: Install Firebase Tools

```bash
npm install -g firebase-tools
firebase login
```

### Step 2: Initialize Firebase Project

```bash
# From project root
firebase init
```

Select:
- ✅ Hosting
- ✅ Firestore
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
