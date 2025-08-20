const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static('.'));

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
    if (username === 'presenter' && password === 'your-secure-password') {
        next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Slides Remote Control"');
        res.status(401).send('Invalid credentials');
    }
}

// Protected routes
app.get('/remote.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'remote.html'));
});

app.get('/retro_presentation.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'retro_presentation.html'));
});

// WebSocket connection handling with authentication
let slidesConnection = null;
let remoteConnections = [];

wss.on('connection', (ws, req) => {
    // Extract authentication from query string or headers
    const url = new URL(req.url, `http://${req.headers.host}`);
    const isSlides = url.searchParams.get('type') === 'slides';
    const authToken = url.searchParams.get('token') || req.headers['sec-websocket-protocol'];
    
    // Simple token-based auth (you can make this more secure)
    const validToken = 'your-secret-token-here'; // Change this!
    
    if (authToken !== validToken) {
        console.log('Unauthorized WebSocket connection attempt');
        ws.close(1008, 'Unauthorized');
        return;
    }
    
    if (isSlides) {
        console.log('Slides connected');
        slidesConnection = ws;
        
        ws.on('close', () => {
            console.log('Slides disconnected');
            slidesConnection = null;
        });
    } else {
        console.log('Remote control connected');
        remoteConnections.push(ws);
        
        ws.on('close', () => {
            const index = remoteConnections.indexOf(ws);
            if (index > -1) {
                remoteConnections.splice(index, 1);
            }
            console.log('Remote control disconnected');
        });
        
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log('Remote command received:', data);
                
                // Forward command to slides
                if (slidesConnection && slidesConnection.readyState === WebSocket.OPEN) {
                    slidesConnection.send(JSON.stringify(data));
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });
    }
    
    // Send current status to new remote connections
    if (!isSlides && slidesConnection) {
        ws.send(JSON.stringify({
            type: 'status',
            message: 'Slides are connected and ready'
        }));
    }
});

// Broadcast to all remote connections
function broadcastToRemotes(data) {
    remoteConnections.forEach((ws, index) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
        } else {
            // Remove closed connections
            remoteConnections.splice(index, 1);
        }
    });
}

// Handle slides sending status updates
if (slidesConnection) {
    slidesConnection.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'status') {
                broadcastToRemotes(data);
            }
        } catch (error) {
            console.error('Error parsing slides message:', error);
        }
    });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Secure server running on http://0.0.0.0:${PORT}`);
    console.log(`Remote control available at http://0.0.0.0:${PORT}/remote.html`);
    console.log(`Slides available at http://0.0.0.0:${PORT}/retro_presentation.html`);
    console.log(`Username: presenter, Password: your-secure-password`);
    console.log(`WebSocket Token: your-secret-token-here`);
});
