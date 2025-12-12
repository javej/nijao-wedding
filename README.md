# Nijao Wedding Website

A beautiful, mobile-first wedding website built with Astro and Svelte.

## Features

- 📱 Mobile-first responsive design
- 💌 RSVP form with Google Sheets integration
- 📸 Photo gallery with lightbox
- 📅 Timeline/Events page
- 💬 Guestbook
- ⚡ Fast and optimized with Astro

## Tech Stack

- **Astro** - Static site generator
- **Svelte** - Component framework
- **Tailwind CSS** - Styling
- **Netlify** - Hosting
- **Google Sheets** - RSVP data storage

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is configured to deploy to Netlify. Simply connect your repository to Netlify and it will automatically build and deploy.

## Google Sheets Setup

1. Create a new Google Sheet
2. Set up columns: Name, Email, Guests, Dietary Restrictions, Song Requests, Timestamp
3. Create a service account and share the sheet with the service account email
4. Add credentials to Netlify environment variables

