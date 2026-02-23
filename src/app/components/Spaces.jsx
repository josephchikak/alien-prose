"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { useContentful } from "../contexts/ContentfulContext";

const Spaces = () => {
  const client = useContentful();
  const [images, setImages] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch images from Contentful
  useEffect(() => {
    if (!client) return;

    async function fetchContent() {
      try {
        const [slidesResponse, pagesResponse] = await Promise.all([
          client.getEntries({ content_type: "slide", include: 2 }),
          client.getEntries({ content_type: "page", include: 2 }),
        ]);

        setImages(slidesResponse.items);
        setSections(pagesResponse.items[0]?.fields?.sections);
        // console.log("Page images:", pagesResponse.items[0]?.fields?.sections);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }

    fetchContent();
  }, [client]);

  // Helper function to get image URL
  const getImageUrl = (index, imageIndex = 0) => {
    const url = images[index]?.fields?.images[imageIndex]?.fields?.file?.url;
    return url ? `https:${url}` : null;
  };

  const [activeSpace, setActiveSpace] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSpaceChange = (idx) => {
    setIsLoading(true);
    setActiveSpace(idx);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <>
      <div className="h-32" />

      {sections?.length > 0 &&
        sections
          .filter((section, idx) => idx === activeSpace)
          .map((section, idx) => (
            <div
              key={idx}
              className="w-full h-full bg-black relative flex gap-8 border-2 border-black flex-col items-start p-8 sm:p-20 pt-20  justify-center text-white font-outfit"
            >
              <div className="grid grid-cols-2 gap-8">
                {section.fields.images.map((space, imgIdx) => (
                  <div key={imgIdx} className="">
                    <Image
                      src={
                        space.fields.file.url
                          ? `https:${space.fields.file.url}`
                          : "/assets/default.jpg"
                      }
                      alt={`${section.fields.title} Space`}
                      width={800}
                      height={500}
                       sizes="(max-width: 640px) 45vw, (max-width: 768px) 48vw, (max-width: 1024px) 45vw, (max-width: 1280px) 40vw, 500px"
                      className="w-full h-auto"
                        unoptimized={true}
                    />
                  </div>
                ))}
              </div>

              <h1 className="sm:text-6xl text-4xl font-bold z-1">
                {section.fields.title}{" "}
              </h1>
              <p className="mt-4 font-light text-sm sm:text-base  sm:w-1/2 z-1">
                {typeof section.fields.description === "string"
                  ? section.fields.description
                  : section.fields.description?.content?.[0]?.content?.[0]
                      ?.value || ""}
              </p>
              <Link
                href={
                  section.fields.title?.toLowerCase() === "gears"
                    ? "https://docs.google.com/forms/d/e/1FAIpQLScOVuSJ8SPuQiDlHryZTt-U3F6ujtzlgAHkkCZ7qNxIKbDnxg/viewform?usp=sharing&ouid=115349378318019815143"
                    : "https://docs.google.com/forms/d/e/1FAIpQLSdUDW8-I25QQoEycTLcTJ90FM-o63JVFWAIuzlPlKr4xLUZLA/viewform?usp=sharing&ouid=115349378318019815143"
                }
                target="_blank"
              >
                <button className="bg-[#FFD700] md:flex text-black p-4 text-xs  px-8 cursor-pointer border-[0.5px] hover:bg-amber-300">
                  Rent Now
                </button>
              </Link>
            </div>
          ))}
      {sections?.length > 0 && (
        <div className="absolute top-30 left-1/2 sm:left-100 transform -translate-x-1/2 flex sm:space-x-4">
          {sections.map((section, idx) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              key={idx}
              onClick={() => handleSpaceChange(idx)}
              className={`px-2 text-xs py-1 sm:px-4 sm:py-2 border-2 border-slate-800 cursor-pointer ${
                activeSpace === idx
                  ? "bg-primary text-black"
                  : "bg-black text-white"
              }`}
            >
              {section.fields.title}
            </motion.button>
          ))}
        </div>
      )}
    </>
  );
};

export default Spaces;
