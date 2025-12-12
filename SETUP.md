# Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Google account (for Google Sheets integration)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - The site will be available at `http://localhost:4321`

## Adding Your Photos

1. Place your wedding photos in the `public/images/` directory
2. Supported formats: JPG, PNG, WebP
3. Recommended: Optimize images before adding (use tools like [Squoosh](https://squoosh.app/) or [ImageOptim](https://imageoptim.com/))
4. Update the image paths in `src/components/Gallery/Gallery.svelte`:
   ```javascript
   images = [
     '/images/your-photo-1.jpg',
     '/images/your-photo-2.jpg',
     // ... add all your photos
   ];
   ```

## Customizing Content

### Home Page
- Edit `src/pages/index.astro` to update:
  - Names
  - Date and location
  - Hero section text

### Timeline
- Edit `src/pages/timeline.astro` to customize:
  - Event times
  - Event descriptions
  - Add/remove timeline items

### Colors & Styling
- Edit `tailwind.config.mjs` to change the wedding color scheme
- Current colors:
  - Primary: `#D4A574` (gold/beige)
  - Secondary: `#8B7355` (brown)
  - Accent: `#F5E6D3` (light beige)
  - Dark: `#2C2416` (dark brown)

### Fonts
- Currently using:
  - **Inter** for body text
  - **Playfair Display** for headings
- Change in `src/layouts/BaseLayout.astro` if desired

## Google Sheets Integration

See `GOOGLE_SHEETS_SETUP.md` for detailed instructions on setting up RSVP form integration with Google Sheets.

## Building for Production

```bash
npm run build
```

This will create a `dist/` folder with your optimized site.

## Deploying to Netlify

### Option 1: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://www.netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

## Environment Variables (Netlify)

After deploying, add these in Netlify dashboard:
- `GOOGLE_SHEET_ID`: Your Google Sheet ID
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Your service account JSON (see GOOGLE_SHEETS_SETUP.md)

## Next Steps

1. ✅ Customize the content (names, dates, locations)
2. ✅ Add your photos to `public/images/`
3. ✅ Set up Google Sheets integration (optional but recommended)
4. ✅ Test the RSVP form
5. ✅ Deploy to Netlify
6. ✅ Purchase and connect your domain

## Troubleshooting

### Images not showing
- Make sure images are in `public/images/`
- Check that image paths in Gallery component are correct
- Verify image file names match exactly (case-sensitive)

### RSVP form not working
- Check browser console for errors
- Verify Netlify functions are deployed
- Check Netlify function logs in dashboard
- Ensure Google Sheets integration is set up correctly

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (should be 18+)
- Clear `node_modules` and reinstall if needed

