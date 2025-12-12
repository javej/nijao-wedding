# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the RSVP form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVPs" (or your preferred name)
4. Set up the following columns in the first row:
   - A: Name
   - B: Email
   - C: Guests
   - D: Dietary Restrictions
   - E: Song Requests
   - F: Timestamp

## Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 3: Create a Service Account

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: `wedding-rsvp-service`
   - Service account ID: (auto-generated)
   - Description: "Service account for wedding RSVP form"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create" - this will download a JSON file
6. **Important**: Keep this file secure and never commit it to git

## Step 5: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click the "Share" button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Editor" permissions
5. Uncheck "Notify people" (it's a service account)
6. Click "Share"

## Step 6: Add Credentials to Netlify

1. Go to your Netlify site dashboard
2. Navigate to "Site settings" > "Environment variables"
3. Add the following environment variables:

   - `GOOGLE_SHEET_ID`: The ID from your Google Sheet URL
     - Example: If your URL is `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
     - The ID is `1ABC123xyz`

   - `GOOGLE_SERVICE_ACCOUNT_KEY`: The entire contents of the JSON file you downloaded
     - Copy the entire JSON content and paste it as the value
     - Make sure to escape any quotes properly

## Step 7: Update the Netlify Function

The RSVP function (`netlify/functions/rsvp.ts`) already has the structure ready. You just need to:

1. Install the Google Sheets API client:
   ```bash
   npm install googleapis
   ```

2. Uncomment and update the Google Sheets integration code in `netlify/functions/rsvp.ts`

3. The function will automatically use the environment variables you set in Netlify

## Testing

1. Deploy your site to Netlify
2. Test the RSVP form
3. Check your Google Sheet to see if the data is being added

## Troubleshooting

- **403 Forbidden Error**: Make sure the service account email has been shared with the Google Sheet
- **401 Unauthorized**: Check that the service account key JSON is correctly set in Netlify environment variables
- **Sheet not found**: Verify the `GOOGLE_SHEET_ID` is correct

## Security Notes

- Never commit the service account JSON file to git
- The `.gitignore` file already excludes `.env` files
- Keep your service account credentials secure
- Consider using Netlify's encrypted environment variables

