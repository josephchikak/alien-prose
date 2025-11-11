"use client";

import { createContext, useContext } from 'react';

// Create the Context
const ContentfulContext = createContext(null);

// Create the Provider Component
export function ContentfulProvider({ children }) {
  // Simple fetch-based client that uses our secure API route
  const client = {
    getEntries: async ({ content_type = 'slide', order = 'fields.order' }) => {
      try {
        const response = await fetch(`/api/contentful?content_type=${content_type}&order=${order}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items = await response.json();
        return { items };
      } catch (error) {
        console.error('Error fetching from API:', error);
        return { items: [] };
      }
    }
  };

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
  if (!client) {
    console.warn('Contentful client not available');
    return [];
  }

  try {
    const response = await client.getEntries({
      content_type: "slide",
      order: "fields.order",
    });
    return response.items || [];
  } catch (error) {
    console.error("Error fetching slides:", error);
    return [];
  }
}