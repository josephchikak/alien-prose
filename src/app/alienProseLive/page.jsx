import React from 'react'
import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const page = async() => {
  // Initialize Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  let alienProseLiveData = {};
  try {
    const response = await client.getEntries({
      content_type: 'page',
      include: 2,
    });

    alienProseLiveData = response.items[0].fields || {};
  } catch (error) {
    console.error('Error fetching alienProseLive entries:', error);
  }

  const rawImageUrl = alienProseLiveData?.heroImages?.[0]?.fields?.file?.url;

  // Ensure the URL has the proper protocol
  const imageUrl = rawImageUrl ? (rawImageUrl.startsWith('//') ? `https:${rawImageUrl}` : rawImageUrl) : null;

  console.log('Alien Prose Live Data:', alienProseLiveData);
  console.log('Raw Image URL:', rawImageUrl);
  console.log('Processed Image URL:', imageUrl);

  // Rich text rendering options with proper paragraph spacing
  const richTextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4 leading-relaxed text-xl">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl font-semibold mb-4 mt-6">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-xl font-medium mb-3 mt-5">{children}</h3>
      ),
    },
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start text-black font-outfit "> 
    <main className='w-[90vw] sm:w-[80vw] min-h-screen flex flex-col gap-4 items-start justify-start text-black font-outfit p-8'>
        <h1 className='text-4xl'> {alienProseLiveData.title}</h1>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={alienProseLiveData.heroImages?.[0]?.fields?.title || 'Hero Image'}
            width={800}
            height={600}
          />
        )}
        <div className="w-2/3 text-gray-800">
          {alienProseLiveData.introText ? 
            documentToReactComponents(alienProseLiveData.introText, richTextOptions) : 
            <></>
          }
        </div>
    </main>

    </div>
  )
}

export default page;