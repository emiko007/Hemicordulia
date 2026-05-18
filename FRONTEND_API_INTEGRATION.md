# Frontend API Integration Guide

**Use this after your Render backend is deployed**

---

## 🔗 Update API Endpoints

Your frontend currently calls `http://localhost:3001`. After Render deployment, you'll have a live API URL like:

```
https://hemicord-api-xxxx.onrender.com
```

---

## 🎯 3 Ways to Update

### Method 1: Environment Variable (RECOMMENDED) ✅

**Create `.env.production` in project root:**

```env
VITE_API_URL=https://hemicord-api-xxxx.onrender.com
```

**Update your frontend code to use it:**

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Usage:
fetch(`${API_URL}/analyze`, {...})
```

**Build and redeploy:**
```bash
npm run build
firebase deploy --only hosting
```

---

### Method 2: Update Code Directly

Search for all instances of `http://localhost:3001` and replace with your Render URL.

**Files to check:**
- `src/components/TemporalEngineView.tsx`
- Any other components making API calls

**Example:**
```typescript
// Find:
const response = await fetch('http://localhost:3001/api/analyze', ...)

// Replace with:
const response = await fetch('https://hemicord-api-xxxx.onrender.com/api/analyze', ...)
```

---

### Method 3: Create API Service Module (BEST PRACTICE)

Create `src/lib/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function analyzeMarket(query: string) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function getAnalyses() {
  const response = await fetch(`${API_BASE_URL}/analyses`);
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function submitFeedback(analysisId: string, rating: number, comment: string) {
  const response = await fetch(`${API_BASE_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysisId, rating, comment })
  });
  
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) throw new Error('API error');
  return response.json();
}
```

**Then use in components:**
```typescript
import { analyzeMarket } from '../lib/api';

// In component:
const result = await analyzeMarket('Is Bitcoin bullish?');
```

---

## 📝 Step by Step: Update & Redeploy

### 1. Create Environment Variable
```bash
# Create .env.production in project root
echo "VITE_API_URL=https://hemicord-api-xxxx.onrender.com" > .env.production
```

### 2. Update Frontend Code (Choose one method above)

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Firebase
```bash
firebase deploy --only hosting
```

### 5. Test Your Live App
```
1. Visit https://hemicord-ai.web.app
2. Go to MODULES → TEMPORAL HUB
3. Enter market query
4. Should now use your live backend!
```

---

## 🧪 Quick Test Script

Once deployed, test the connection:

```bash
# Test backend health
curl https://hemicord-api-xxxx.onrender.com/api/health

# Test analysis endpoint
curl -X POST https://hemicord-api-xxxx.onrender.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"query":"Is Bitcoin bullish?"}'
```

---

## ✅ Verification Checklist

After updating and redeploying:

- [ ] `.env.production` created with correct Render URL
- [ ] Frontend code updated to use API_URL variable/service
- [ ] `npm run build` completes successfully
- [ ] `firebase deploy --only hosting` completes
- [ ] Frontend at https://hemicord-ai.web.app loads
- [ ] TEMPORAL HUB component works
- [ ] Market queries return live results

---

## 🔄 Environment Variables Summary

| Environment | API URL | Usage |
|-------------|---------|-------|
| **Development** | `http://localhost:3001/api` | `npm run dev` |
| **Production** | `https://hemicord-api-xxxx.onrender.com` | Deployed app |

---

## 🐛 Troubleshooting

### "CORS error in console"
**Cause:** Backend and frontend domains mismatch  
**Solution:** Ensure `FRONTEND_URL` in backend `.env` matches exactly

```
Backend .env:
FRONTEND_URL=https://hemicord-ai.web.app
```

### "API calls returning 404"
**Cause:** Wrong URL in frontend  
**Solution:** Check that VITE_API_URL has `/api` at the end:
```
✅ https://hemicord-api-xxxx.onrender.com/api
❌ https://hemicord-api-xxxx.onrender.com (missing /api)
```

### "Environment variable not loading"
**Cause:** Variable not prefixed with `VITE_`  
**Solution:** All Vite env vars must start with `VITE_`:
```
✅ VITE_API_URL=...
❌ API_URL=...
```

### "Backend returns 500 error"
**Cause:** Firebase credentials not set in Render  
**Solution:** Double-check all 6 environment variables in Render dashboard

---

## 📚 Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Render Docs](https://render.com/docs)
- [Firebase Console](https://console.firebase.google.com)

---

**After completing these steps, your full-stack app will be live! 🚀**
