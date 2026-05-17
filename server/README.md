# CyberSculpt Backend Server

Backend API for the CyberSculpt Showcase temporal market analysis platform.

## Features

✅ **Temporal Market Analysis** - Advanced agent for crypto market analysis
✅ **Firebase Integration** - Firestore database & real-time sync
✅ **RESTful API** - Complete API endpoints
✅ **CORS Enabled** - Cross-origin requests from frontend
✅ **Error Handling** - Comprehensive error management
✅ **TypeScript** - Full type safety

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Firebase Configuration

#### Option A: Local Development (No Firebase)
The server runs in demo mode without Firebase credentials. All analysis works but data isn't persisted.

#### Option B: With Firebase (Recommended)

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Enable Firestore and Authentication

2. **Get Service Account Key**
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save the JSON file safely

3. **Configure Environment**
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Fill in Firebase credentials:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_CLIENT_EMAIL=your-client-email@...
   FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   ```

### 3. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### 4. Test the API

```bash
# Health check
curl http://localhost:3001/api/health

# Analyze market
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"query":"Is Bitcoin a good buy right now?"}'

# Get statistics
curl http://localhost:3001/api/stats
```

## API Endpoints

### POST `/api/analyze`
Analyze market query using the temporal agent.

**Request:**
```json
{
  "query": "Is Bitcoin a good buy right now? What are key levels?"
}
```

**Response:**
```json
{
  "success": true,
  "query": "...",
  "analysis": "detailed market analysis...",
  "timestamp": "2026-05-17T18:00:00Z"
}
```

### GET `/api/analyses`
Get recent analyses (max 10).

**Response:**
```json
{
  "success": true,
  "count": 5,
  "analyses": [
    {
      "id": "...",
      "query": "...",
      "analysis": "...",
      "timestamp": "..."
    }
  ]
}
```

### POST `/api/feedback`
Save user feedback for analysis.

**Request:**
```json
{
  "analysisId": "doc-id",
  "rating": 4,
  "comment": "Very helpful analysis!"
}
```

### GET `/api/stats`
Get database statistics.

**Response:**
```json
{
  "status": "connected",
  "analyses_count": 42,
  "feedback_count": 15,
  "timestamp": "2026-05-17T18:00:00Z"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-05-17T18:00:00Z",
  "message": "CyberSculpt Backend is running"
}
```

## Build & Deploy

### Development Build
```bash
npm run build
```

### Production Start
```bash
npm run start
```

## Deployment Options

### 1. Firebase Cloud Functions (Recommended - Free Tier)

```bash
npm install -g firebase-tools
firebase init functions
firebase deploy --only functions
```

### 2. Vercel (Free - Simple Deploy)

```bash
npm install -g vercel
vercel
```

### 3. Railway (Free - Docker Ready)

1. Connect GitHub repo to Railway
2. Add environment variables
3. Deploy automatically on push

### 4. Render (Free - Always On)

1. Connect GitHub repo
2. Set up environment variables
3. Deploy with one click

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `FRONTEND_URL` | Frontend origin for CORS | No |
| `FIREBASE_PROJECT_ID` | Firebase project ID | No* |
| `FIREBASE_PRIVATE_KEY` | Firebase service account key | No* |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | No* |
| `FIREBASE_DATABASE_URL` | Firebase database URL | No* |

*Firebase credentials are optional. Server runs in demo mode without them.

## Connecting Frontend

Update your React component to use the backend API:

```typescript
const response = await fetch('http://localhost:3001/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: userQuery })
});

const data = await response.json();
console.log(data.analysis);
```

## Architecture

```
server/
├── src/
│   ├── server.ts          # Express server & routes
│   ├── firebase.ts        # Firebase initialization
│   ├── agent.ts           # Temporal market agent
│   └── types/             # TypeScript interfaces
├── dist/                  # Compiled JavaScript
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── .env.example           # Environment template
```

## Troubleshooting

### Firebase Connection Issues
- Verify service account key is valid
- Check Firebase project is active
- Ensure Firestore is enabled

### CORS Errors
- Check `FRONTEND_URL` matches your frontend origin
- Clear browser cache
- Verify frontend makes requests to correct backend URL

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID>
```

## Development

### Run Tests
```bash
npm run type-check
```

### Format Code
```bash
npm run lint
```

## License

MIT

## Support

For issues or questions, check the [GitHub repository](https://github.com/emiko007/Hemicordulia)
