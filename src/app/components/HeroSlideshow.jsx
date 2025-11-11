'use client';

import Image from 'next/image';

export default function HeroSlideshow() {
  const heroImages = [
    {
      src: "/assets/live.jpg",
      alt: "Live Production",
      title: "Live Studio",
      position: { top: 20, left: 5 }
    },
    {
      src: "/assets/digital.jpg", 
      alt: "Digital Content",
      title: "Digital Studio",
      position: { top: 10, left: 50 }
    },
    {
      src: "/assets/podcast.jpg",
      alt: "Podcast Production", 
      title: "Podcast Studio",
      position: { top: 35, left: 25 }
    }
  ];

  return (
    <div className="absolute w-full h-screen overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${image.position.top}%`,
            left: `${image.position.left}%`,
            // transform: 'translate(-50%, -50%)',
            zIndex: '-10'
          }}
        >
          <div className="relative w-48 h-32 sm:w-48 sm:h-32 md:w-48 md:h-32 lg:w-48 lg:h-32">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg shadow-lg  blur-xs"
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
            />
            {/* Title overlay */}
            {/* <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
              {image.title}
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}