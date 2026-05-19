# 🚀 Quick Start - Fly.io FREE Deployment

**Completely FREE hosting. No credit card needed. Just 3 simple steps.**

---

## ✅ Step 1: Create Free Fly.io Account (2 min)

1. Visit: https://fly.io
2. Click **"Sign Up"**
3. Use **GitHub or email** (both free)
4. Verify email
5. Done!

---

## 🚀 Step 2: Deploy Backend (1 min)

**Install Flyctl:**

Windows (easiest - copy & paste):
```powershell
Invoke-WebRequest https://fly.io/install.ps1 -o install.ps1; .\install.ps1
```

Or download: https://fly.io/docs/getting-started/installing-flyctl/

**Then authenticate & deploy (from project root):**

```bash
flyctl auth login
```

(Opens browser - click approve)

```bash
flyctl launch --copy-config
```

**Answer the prompts:**
```
? App Name: hemicord-ai-api
? Region: iad
? Deploy now? Yes
```

**⏳ Waits 1-2 minutes... then shows:**
```
Deployed!
Your app is live at: https://hemicord-ai-api.fly.dev
```

---

---

## 🔧 Step 3: Add Firebase Credentials (1 min)

**After deployment, add your Firebase secrets:**

```bash
flyctl secrets set \
  FIREBASE_PROJECT_ID=hemicord-ai \
  FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@hemicord-ai.iam.gserviceaccount.com \
  FIREBASE_DATABASE_URL=https://hemicord-ai.firebaseio.com \
  FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n(YOUR_ACTUAL_KEY)\n-----END PRIVATE KEY-----\n"
```

(Replace with your actual Firebase private key)

---

## 🔗 Step 4: Update Frontend (2 min)

### 4a. Create environment file

Create `.env.production` in your project root:

```env
VITE_API_URL=https://hemicord-ai-api.fly.dev
```

### 4b. Rebuild & Deploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

---

## ✅ Done!

Your full-stack app is LIVE:
- **Frontend:** https://hemicord-ai.web.app
- **Backend:** https://hemicord-ai-api.fly.dev (FLY.IO - COMPLETELY FREE)
- **Database:** Firestore

---

## 🧪 Quick Test

```bash
# Test backend
curl https://hemicord-ai-api.fly.dev/api/health

# Visit app
https://hemicord-ai.web.app
```

---

## 📚 Full Documentation

- [FLY_DEPLOY_GUIDE.md](./FLY_DEPLOY_GUIDE.md) - Complete guide
- [FRONTEND_API_INTEGRATION.md](./FRONTEND_API_INTEGRATION.md) - Frontend update

---

## 🎯 Summary

| Step | Time | Action |
|------|------|--------|
| 1 | 2 min | Create Fly.io FREE account |
| 2 | 1 min | Run deployment script |
| 3 | 1 min | Add Firebase credentials |
| 4 | 2 min | Update frontend with API URL |
| **Total** | **~7 min** | **Full-stack deployment complete!** |

---

**Everything is automated. Completely FREE. No credit card needed. 🚀**
