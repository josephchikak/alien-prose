// api/contentful/route.js
import { createClient } from 'contentful';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('content_type') || 'slide';
    const order = searchParams.get('order');
    const include = parseInt(searchParams.get('include') || '2');

    const queryParams = {
      content_type: contentType,
      include: include,
    };

    // Only add order if it's provided
    if (order) {
      queryParams.order = order;
    }

    const response = await client.getEntries(queryParams);

    return NextResponse.json(response.items || []);
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return NextResponse.json([], { status: 500 });
  }
}