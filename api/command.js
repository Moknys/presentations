// Simple command storage
let lastCommand = null;

export default function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method === 'POST') {
        const { command } = req.body;
        lastCommand = {
            command,
            timestamp: Date.now()
        };
        res.json({ success: true, message: 'Command received' });
    } else if (req.method === 'GET') {
        res.json({
            connected: true,
            lastCommand: lastCommand || null
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
