// Netlify serverless function for guestbook entries

import type { Handler } from '@netlify/functions';

// In-memory storage for demo (replace with Google Sheets or database in production)
let entries: Array<{
  id: string;
  name: string;
  message: string;
  timestamp: string;
}> = [];

export const handler: Handler = async (event, context) => {
  // GET request - return all entries
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(entries),
    };
  }

  // POST request - add new entry
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}');

      if (!data.name || !data.message) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Name and message are required' }),
        };
      }

      const entry = {
        id: Date.now().toString(),
        name: data.name,
        message: data.message,
        timestamp: new Date().toISOString(),
      };

      entries.push(entry);

      // TODO: Save to Google Sheets or database
      // For now, using in-memory storage (will reset on serverless function restart)

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(entry),
      };
    } catch (error) {
      console.error('Error processing guestbook entry:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};

