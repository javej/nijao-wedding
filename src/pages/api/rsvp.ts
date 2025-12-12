import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.guests) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // TODO: Integrate with Google Sheets API
    // For now, we'll just log the data
    console.log('RSVP Submission:', data);

    // In production, you would:
    // 1. Authenticate with Google Sheets API using service account
    // 2. Append the row to your Google Sheet
    // 3. Handle errors appropriately

    // Example Google Sheets integration (requires googleapis package):
    /*
    import { google } from 'googleapis';

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(import.meta.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: import.meta.env.GOOGLE_SHEET_ID,
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

    return new Response(
      JSON.stringify({ success: true, message: 'RSVP submitted successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

