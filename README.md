# Burnout App - Test Demos

Interactive HTML demos showcasing Apple-style 3D UI components with realistic car enthusiast test data.

## 📱 Available Demos

### 1. **index.html** - Landing Page
Overview of all available demos with navigation cards.

### 2. **home-feed.html** - Home Feed
Social feed with:
- Search bar with glassmorphism
- Stats displays (events, routes)
- Filter pills (All, Builds, Meets, Racing)
- Content cards with car posts
- Realistic test data (6 posts)

### 3. **profile.html** - User Profile
Apple Wallet-style profile cards featuring:
- 3D card rotation on hover
- Car stats (HP, torque, 0-60)
- Modifications list
- User statistics
- QR code section

### 4. **routes.html** - Routes & Map
Map interface with:
- Routes HUD with gradient stats
- Active route information
- Push-to-talk communication HUD
- Live user indicators

###5. **chat.html** - Messages
Chat interface with:
- Conversation list
- Unread message indicators
- Group and DM differentiation
- Glassmorphic message containers

### 6. **events.html** - Events List
Car events and meets:
- Event cards with details
- RSVP functionality
- Location and time info
- Attendee counts
- Event categories (Drive, Track, Show)

### 7. **components.html** - All Components
Complete component showcase (copy of original apple-ui-test.html)

## 🎨 Design Features

All demos include:
- **Glassmorphism** - Backdrop blur effects
- **Multi-layer shadows** - Depth and elevation
- **Smooth animations** - CSS transitions and transforms
- **Touch-optimized** - 44px minimum touch targets
- **Responsive** - Works on all screen sizes
- **iPhone frame** - Realistic phone mockup

## 🚀 How to Use

### Local Testing
1. Open any HTML file in a modern browser
2. Or serve with a local server:
   ```bash
   python -m http.server 8000
   # Open: http://localhost:8000/test/
   ```

### Sharing
- Host on any static file server
- Works on GitHub Pages
- No build process required
- No dependencies needed

## 📊 Test Data

All demos use realistic car enthusiast data from `data.js`:

- **6 Posts** - Turbo installs, canyon runs, track days
- **2 User Profiles** - GT-R and Supra builds
- **5 Events** - Meets, track days, photo shoots
- **6 Chat Conversations** - Groups and DMs
- **3 Routes** - Angeles Crest, PCH, Palomar
- **3 News Articles** - Industry news and tech

## 🎯 Use Cases

- **Client Presentations** - Show live demos
- **Design Reviews** - Test interactions
- **User Testing** - Gather feedback
- **Marketing** - Screenshots and videos
- **Development Reference** - See expected behavior

## 🛠️ Customization

### Modify Test Data
Edit `data.js` to change:
- Post content and metadata
- User profiles and stats
- Event details
- Chat messages
- Route information

### Change Colors
Edit `shared-styles.css`:
```css
/* Primary blue */
#007AFF

/* Glass backgrounds */
rgba(255, 255, 255, 0.15)

/* Shadows */
0px 8px 24px rgba(0, 0, 0, 0.2)
```

### Add New Demos
1. Create new HTML file
2. Link `shared-styles.css`
3. Link `data.js` and `app.js`
4. Use existing components
5. Add to index.html grid

## 📁 File Structure

```
test/
├── index.html              # Landing page
├── home-feed.html          # Social feed demo
├── profile.html            # Profile card demo
├── routes.html             # Map & routes demo
├── chat.html               # Messages demo
├── events.html             # Events list demo
├── components.html         # All components
├── shared-styles.css       # Common CSS
├── data.js                 # Test data
├── app.js                  # Shared JavaScript
└── README.md               # This file
```

## 🌐 Browser Support

Tested and working in:
- ✅ Chrome/Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

## 💡 Tips

- **Mobile Testing**: Use browser dev tools device emulation
- **Screenshots**: Use native screenshot tools for best quality
- **Recordings**: Use QuickTime (Mac) or OBS for screen recordings
- **Presenting**: Full screen mode (F11) for clean presentation

## 🔗 Related Files

- **Flutter Implementation**: `../flutter_burnout/`
- **Original Demo**: `../apple-ui-test.html`
- **Documentation**: `../flutter_burnout/APPLE_UI_DOCUMENTATION.md`

---

**Perfect for demos, presentations, and testing! 🚗💨**
