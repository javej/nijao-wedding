# Quick Start Guide

Get your wedding website up and running in minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site!

## 3. Customize Your Content

### Add Your Photos
1. Add photos to `public/images/` folder
2. Update `src/components/Gallery/Gallery.svelte`:
   ```javascript
   images = [
     '/images/photo1.jpg',
     '/images/photo2.jpg',
     // ... add all your photos
   ];
   ```

### Customize Timeline
Edit `src/pages/timeline.astro` to match your wedding schedule.

### Change Colors
Edit `tailwind.config.mjs` to update the color scheme.

## 4. Test Everything

- ✅ Home page loads
- ✅ Navigation works
- ✅ RSVP form submits (check browser console)
- ✅ Gallery displays images
- ✅ Guestbook works

## 5. Deploy to Netlify

### Option A: Git Integration (Easiest)
1. Push code to GitHub
2. Connect to Netlify
3. Deploy!

### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 6. Set Up Google Sheets (Optional but Recommended)

See `GOOGLE_SHEETS_SETUP.md` for detailed instructions.

## 7. Connect Your Domain

1. Purchase a domain (if you haven't already)
2. In Netlify dashboard: Site settings > Domain management
3. Add your custom domain
4. Update DNS records as instructed

## That's It! 🎉

Your wedding website is live! Share the link with your guests.

## Need Help?

- Check `SETUP.md` for detailed setup instructions
- See `GOOGLE_SHEETS_SETUP.md` for RSVP integration
- Review the code comments for customization options

