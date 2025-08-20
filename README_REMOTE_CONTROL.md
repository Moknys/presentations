# 🎯 Slides Remote Control System

Control your HTML slides from your iPhone using this WebSocket-based remote control system!

## ✨ Features

- **Real-time control** from your iPhone to your Mac
- **Full slide navigation** (next/previous, home/end)
- **Build animation control** (next/previous build steps)
- **Fullscreen toggle** support
- **Live status updates** showing current slide and build progress
- **Auto-reconnection** if connection is lost
- **Beautiful mobile interface** optimized for iPhone

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Open Your Slides

Open your presentation HTML file in your browser:
- **Slides**: `http://localhost:3000/your-presentation.html`
- **Remote Control**: `http://localhost:3000/remote.html`

### 4. Control from iPhone

1. **Make sure your iPhone and Mac are on the same WiFi network**
2. **Find your Mac's local IP address** (usually `192.168.1.100` or similar)
3. **On your iPhone, open**: `http://YOUR_MAC_IP:3000/remote.html`
4. **Start presenting on your Mac** and control from your iPhone!

## 🔧 How It Works

1. **WebSocket Server** (`server.js`) handles communication between slides and remote
2. **Slides** (`script.js`) connect as "slides" type and receive commands
3. **Remote Control** (`remote.html`) connects as "remote" type and sends commands
4. **Real-time updates** keep both sides in sync

## 📱 Remote Control Interface

The remote control provides:

- **Navigation Controls**: Previous/Next slide
- **Build Controls**: Previous/Next build animation
- **Quick Actions**: Home (first slide), End (last slide)
- **Fullscreen Toggle**: Enter/exit fullscreen mode
- **Live Status**: Current slide number and build progress
- **Connection Status**: Visual indicator of connection health

## 🌐 Network Configuration

### Local Development
- **Mac**: `http://localhost:3000`
- **iPhone**: `http://YOUR_MAC_IP:3000/remote.html`

### Production/External Access
- **Server**: Your domain with SSL
- **iPhone**: `https://yourdomain.com/remote.html`

## 🛠️ Customization

### Adding New Commands

1. **In `remote.html`**: Add new buttons with `onclick="sendCommand('newCommand')"`
2. **In `script.js`**: Add case handling in `handleRemoteCommand()`
3. **In `server.js`**: The server automatically forwards all commands

### Styling the Remote

The remote control uses CSS with:
- **Glassmorphism design** with backdrop blur
- **Responsive grid layout** for mobile
- **Smooth animations** and touch feedback
- **Dark theme** optimized for presentations

## 🔍 Troubleshooting

### Connection Issues
- **Check WiFi**: Ensure both devices are on the same network
- **Firewall**: Allow Node.js through your Mac's firewall
- **Port**: Make sure port 3000 is not blocked

### Commands Not Working
- **Check console**: Look for WebSocket connection errors
- **Verify slides**: Ensure your slides HTML includes the modified `script.js`
- **Server status**: Check if the Node.js server is running

### Performance Issues
- **Network quality**: Poor WiFi can cause lag
- **Browser**: Use modern browsers (Safari, Chrome, Firefox)
- **Device**: Ensure iPhone has good battery and isn't in low power mode

## 📋 Requirements

- **Mac**: Node.js 14+ and npm
- **iPhone**: iOS 12+ with Safari or Chrome
- **Network**: Same WiFi network for both devices
- **Browser**: Modern browser with WebSocket support

## 🎉 Usage Tips

1. **Bookmark the remote URL** on your iPhone for quick access
2. **Keep your iPhone unlocked** during presentations
3. **Use the remote for audience engagement** - let others control slides
4. **Test the connection** before important presentations
5. **Have a backup plan** (keyboard shortcuts still work)

## 🔒 Security Notes

- **Local network only**: The server is designed for local use
- **No authentication**: Anyone on your network can control slides
- **Production use**: Add authentication for external deployments

## 📚 API Reference

### Remote Commands
- `next` - Go to next slide
- `previous` - Go to previous slide
- `nextBuild` - Reveal next build item
- `previousBuild` - Hide previous build item
- `home` - Go to first slide
- `end` - Go to last slide
- `fullscreen` - Toggle fullscreen mode

### Status Updates
- `slideUpdate` - Current slide and build info
- `buildUpdate` - Build progress updates
- `fullscreenUpdate` - Fullscreen state changes

---

**Happy presenting! 🎤✨**
