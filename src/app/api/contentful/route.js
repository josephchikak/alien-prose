import { createClient } from 'contentful';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Create Contentful client with server-side env vars (secure)
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    // Get content type from query params
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('content_type') || 'slide';
    const order = searchParams.get('order') || 'fields.order';

    const response = await client.getEntries({
      content_type: contentType,
      include: 2,
      order: order,
    });

    return NextResponse.json(response.items || []);
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return NextResponse.json([], { status: 500 });
  }
}