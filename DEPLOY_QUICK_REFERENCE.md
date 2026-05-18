# 🚀 CyberSculpt Deployment - Quick Reference

## One-Line Deploy

```bash
firebase deploy
```

## Full Deployment Guide

See: [FIREBASE_DEPLOY_GUIDE.md](./FIREBASE_DEPLOY_GUIDE.md)

## Quick Start (5 minutes)

### 1️⃣ Create Firebase Project
- Go to: https://console.firebase.google.com
- Click: "Add Project" → Name: "cybersculpt-showcase"
- Wait: ~1 minute

### 2️⃣ Get Service Account Key
- Project Settings → Service Accounts
- Generate Private Key → Save JSON

### 3️⃣ Configure Backend
```bash
cd server
cp .env.example .env
# Edit .env with credentials from JSON
```

### 4️⃣ Deploy
```bash
firebase login
firebase deploy
```

### 5️⃣ Done! 🎉
Your app is live at: `https://cybersculpt-showcase.web.app`

---

## Automated Deployment

### Windows (PowerShell)
```bash
.\deploy-firebase.ps1
```

### Windows (Batch)
```bash
deploy-firebase.bat
```

### macOS/Linux
```bash
chmod +x deploy-firebase.sh
./deploy-firebase.sh
```

---

## What Gets Deployed

✅ **Frontend** (React 19 + Vite)
- Optimized bundle in `dist/`
- Hosted on Firebase Hosting
- Auto-HTTPS, CDN globally distributed

✅ **Backend** (Express.js + Cloud Functions)
- TypeScript compiled to `dist/`
- 5 API endpoints ready
- Auto-scales with traffic

✅ **Database** (Firestore)
- Real-time sync
- Security rules configured
- Free tier: 50K read/write per day

---

## API Endpoints After Deploy

```
POST   /api/analyze     → Market analysis
GET    /api/analyses    → Query history
POST   /api/feedback    → User ratings
GET    /api/stats       → DB statistics
GET    /api/health      → Health check
```

All available at: `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api`

---

## Environment Variables

Your `server/.env` should include:

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://cybersculpt-showcase.web.app
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-service-account@...
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

---

## Monitoring

1. **Firebase Console**: https://console.firebase.google.com
2. **Functions Logs**: `firebase functions:log`
3. **Real-time Analytics**: Built-in to Firebase
4. **Firestore Usage**: Check in console

---

## Cost

- **Free Tier includes:**
  - 10 GB/month storage
  - 2 million Cloud Function invocations
  - 50K Firestore reads/writes

- **Typical small project:** $0/month

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Not logged in" | Run `firebase login` |
| "Project not found" | Run `firebase use --add` |
| "Build failed" | Check `npm run build` output |
| "CORS error" | Update `FRONTEND_URL` in `.env` |
| "API timeout" | Check Cloud Functions logs |

---

## CI/CD Integration

See: `.github/workflows/deploy.yml`

Auto-deploy on push to `main` branch:
1. Commit changes
2. Push to GitHub
3. GitHub Actions builds & deploys
4. App updated live ✅

---

## Support

- [Firebase Docs](https://firebase.google.com/docs)
- [Cloud Functions](https://firebase.google.com/docs/functions)
- [Firestore](https://firebase.google.com/docs/firestore)
- [GitHub Issues](https://github.com/emiko007/Hemicordulia)

---

**Your deployment journey starts here! 🚀**
