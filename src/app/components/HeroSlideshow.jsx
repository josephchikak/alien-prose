'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      src: "/assets/live.jpg",
      alt: "Live Production",
      title: "Live Studio"
    },
    {
      src: "/assets/digital.jpg", 
      alt: "Digital Content",
      title: "Digital Studio"
    },
    {
      src: "/assets/podcast.jpg",
      alt: "Podcast Production", 
      title: "Podcast Studio"
    }
  ];

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex w-[70vw] sm:w-full h-full relative justify-center sm:pt-10">
      <div className="relative w-full h-[250px] sm:h-[280px] md:h-[320px] lg:h-[340px] xl:h-[350px]  overflow-hidden">
        {/* Main slide image */}
        <Image
          src={heroImages[currentSlide].src}
          alt={heroImages[currentSlide].alt}
          fill
          className="object-cover transition-opacity duration-500 "
          priority
        />
        
        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg">
          <h3 className="text-lg font-semibold">
            {heroImages[currentSlide].title}
          </h3>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 z-10"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 z-10"
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}