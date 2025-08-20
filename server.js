const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static('.'));

// WebSocket connection handling
let slidesConnection = null;
let remoteConnections = [];

wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const isSlides = url.searchParams.get('type') === 'slides';
    
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
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Remote control available at http://localhost:${PORT}/remote.html`);
    console.log(`Slides available at http://localhost:${PORT}/retro_presentation.html`);
});
