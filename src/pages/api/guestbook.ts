import type { APIRoute } from 'astro';

// In-memory storage for demo (replace with Google Sheets or database in production)
// Note: This will reset on server restart. For production, use a database or Google Sheets.
let entries: Array<{
  id: string;
  name: string;
  message: string;
  timestamp: string;
}> = [];

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(entries), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.name || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Name and message are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const entry = {
      id: Date.now().toString(),
      name: data.name,
      message: data.message,
      timestamp: new Date().toISOString(),
    };

    entries.push(entry);

    // TODO: Save to Google Sheets or database
    // For now, using in-memory storage (will reset on server restart)

    return new Response(JSON.stringify(entry), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing guestbook entry:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

