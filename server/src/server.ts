import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, auth } from './firebase.js';
import { getAdvancedTemporalAgent } from './agent.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Initialize agent
const agent = getAdvancedTemporalAgent();

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'CyberSculpt Backend is running',
  });
});

// Analyze market query
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required and must be a string' });
    }

    // Call agent analysis
    const analysis = await agent.analyzeQuery(query);

    // Optionally save to Firebase
    if (db) {
      try {
        await db.collection('analyses').add({
          query,
          analysis,
          timestamp: new Date().toISOString(),
          userId: 'anonymous', // TODO: Add auth
        });
      } catch (firebaseError) {
        console.warn('Firebase save failed:', firebaseError);
        // Continue even if Firebase fails
      }
    }

    res.json({
      success: true,
      query,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get analysis history
app.get('/api/analyses', async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const snapshot = await db
      .collection('analyses')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get();

    const analyses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      count: analyses.length,
      analyses,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch analyses',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Save user feedback
app.post('/api/feedback', async (req: Request, res: Response) => {
  try {
    const { analysisId, rating, comment } = req.body;

    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }

    await db.collection('feedback').add({
      analysisId,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    });

    res.json({
      success: true,
      message: 'Feedback saved',
    });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({
      error: 'Failed to save feedback',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get statistics
app.get('/api/stats', async (req: Request, res: Response) => {
  try {
    if (!db) {
      return res.json({
        status: 'demo',
        analyses_count: 0,
        feedback_count: 0,
      });
    }

    const analysesSnapshot = await db.collection('analyses').count().get();
    const feedbackSnapshot = await db.collection('feedback').count().get();

    res.json({
      status: 'connected',
      analyses_count: analysesSnapshot.data().count,
      feedback_count: feedbackSnapshot.data().count,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   CyberSculpt Backend Server Started   ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║ 🚀 Port: ${PORT}`.padEnd(38) + '║');
  console.log(`║ 🌐 Frontend: ${FRONTEND_URL}`.padEnd(38) + '║');
  console.log(`║ 📊 API: http://localhost:${PORT}/api`.padEnd(38) + '║');
  console.log('║                                        ║');
  console.log('║ Available endpoints:                   ║');
  console.log('║  POST   /api/analyze                   ║');
  console.log('║  GET    /api/analyses                  ║');
  console.log('║  POST   /api/feedback                  ║');
  console.log('║  GET    /api/stats                     ║');
  console.log('║  GET    /api/health                    ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
});

export default app;
