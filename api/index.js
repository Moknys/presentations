const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Basic authentication middleware
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Slides Remote Control"');
        return res.status(401).send('Authentication required');
    }
    
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    const [username, password] = credentials.split(':');
    
    // Change these credentials for your deployment
    if (username === 'alex' && password === 'slides-remote-2024') {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Slides Remote Control"');
        res.status(401).send('Invalid credentials');
    }
}

// Public routes (no authentication required)
app.get('/remote.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'remote.html'));
});

app.get('/retro_presentation.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'retro_presentation.html'));
});

// API endpoints for remote control (HTTP-based alternative to WebSocket)
app.post('/api/command', express.json(), (req, res) => {
    const { command } = req.body;
    
    // Store the command for the slides to poll
    global.lastCommand = {
        command,
        timestamp: Date.now()
    };
    
    res.json({ success: true, message: 'Command received' });
});

app.get('/api/status', (req, res) => {
    res.json({
        connected: true,
        lastCommand: global.lastCommand || null
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'retro_presentation.html'));
});

// Export for Vercel
module.exports = app;
