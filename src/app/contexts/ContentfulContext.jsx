"use client";

import { createContext, useContext, useMemo } from 'react';
import { createClient } from 'contentful';

// Create the Context
const ContentfulContext = createContext(null);

// Create the Provider Component
export function ContentfulProvider({ children }) {
  // Create the Contentful client using useMemo to avoid recreating it on every render
  const client = useMemo(() => {
  
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 
        !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful environment variables not found');
      return null;
    }

    const contentfulClient = createClient({
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master",
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    });
    
   
    return contentfulClient;
  }, []);

  return (
    <ContentfulContext.Provider value={client}>
      {children}
    </ContentfulContext.Provider>
  );
}

// Custom hook to use Contentful client
export function useContentful() {
  const client = useContext(ContentfulContext);
  
  if (client === undefined) {
    throw new Error('useContentful must be used within a ContentfulProvider');
  }
  
  return client;
}

// Helper function to fetch slides
export async function fetchSlides(client) {
//   console.log('fetchSlides called with client:', !!client);
  
  if (!client) {
    console.warn('Contentful client not available');
    return [];
  }

  try {
    // console.log('Fetching slides from Contentful...');
    const response = await client.getEntries({
      content_type: "slide",
      include: 2,
      order: "fields.order",
    });
 
    return response.items || [];
  } catch (error) {
    console.error("Error fetching slides:", error);
    return [];
  }
}