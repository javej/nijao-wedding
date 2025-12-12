// Netlify serverless function for RSVP submission
// This will integrate with Google Sheets API

import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!data.name || !data.email || !data.guests) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // TODO: Integrate with Google Sheets API
    // For now, we'll just log the data
    console.log('RSVP Submission:', data);

    // In production, you would:
    // 1. Authenticate with Google Sheets API using service account
    // 2. Append the row to your Google Sheet
    // 3. Handle errors appropriately

    // Example Google Sheets integration (requires @googleapis/sheets):
    /*
    const { google } = require('googleapis');
    const sheets = google.sheets({ version: 'v4' });

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'RSVP!A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          data.name,
          data.email,
          data.guests,
          data.dietaryRestrictions || '',
          data.songRequests || '',
          new Date().toISOString(),
        ]],
      },
    });
    */

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'RSVP submitted successfully' }),
    };
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

