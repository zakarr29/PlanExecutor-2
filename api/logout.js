import app from './index.js';

export default async function handler(req, res) {
  // Forward to the Express handler
  if (req.method === 'POST') {
    app._router.handle(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}