'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Slideshow({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!slides.length) return null;

  const currentSlideData = slides[currentSlide];
  const imageUrl = currentSlideData?.fields?.images?.[0]?.fields?.file?.url;

  return (
    <section className="w-[80vw] py-16">
      {/* <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2> */}
      
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Main slide image */}
        {imageUrl && (
          <div className="relative w-full h-96 md:h-[500px]  overflow-hidden">
            <Image
              src={`https:${imageUrl}`}
              alt={currentSlideData.fields?.title || 'Gallery Image'}
              fill
              className="object-cover"
              priority
            />
            
            {/* Slide title overlay */}
            {currentSlideData.fields?.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-xl font-semibold text-center">
                  {currentSlideData.fields.title}
                </h3>
              </div>
            )}
          </div>
        )}

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Slide indicators/dots */}
        {slides.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all cursor-pointer duration-200 ${
                  index === currentSlide
                    ? 'bg-black scale-110'
                    : 'bg-white hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Slide counter */}
        {slides.length > 1 && (
          <div className="text-center mt-4 text-gray-600">
            {currentSlide + 1} / {slides.length}
          </div>
        )}
      </div>
    </section>
  );
}