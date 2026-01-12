"use client";

import { createContext, useContext } from 'react';

const ContentfulContext = createContext(null);

export function ContentfulProvider({ children }) {
  const client = {
    getEntries: async ({ content_type = 'slide', order, include = 2 }) => {
      try {
        const params = new URLSearchParams({
          content_type,
          include: include.toString()
        });
        
        if (order) {
          params.append('order', order);
        }
        
        const response = await fetch(`/api/contentful?${params.toString()}`);
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

export function useContentful() {
  const client = useContext(ContentfulContext);
  
  if (client === undefined) {
    throw new Error('useContentful must be used within a ContentfulProvider');
  }
  
  return client;
}