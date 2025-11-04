"use client";

import { useState } from "react";
import Image from "next/image";
import {motion} from "motion/react"
import Link from "next/link";

const Spaces = () => {
  const [spaces, setSpaces] = useState([
    {
      id: 0,
      name: "Live Recording Space",
      description: "Per hour use of our fully equipped live recording studio. Spacious and soundproofed audio studio designed for live music recordings, with live music instruments(Drums set, electric guitar, bass and synth keyboards). We offer options of a lead microphone and backups, a standard digital mixing consol in the control room, house and on the wall felxible product light to support videos. Constant power supply in an air conditioned spacesd ensuite with a convinence room for your comfort",
      img: "/assets/live.jpg",
      img2: "/assets/live2.jpg",
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdUDW8-I25QQoEycTLcTJ90FM-o63JVFWAIuzlPlKr4xLUZLA/viewform?usp=sharing&ouid=115349378318019815143',
    //   img3: "/assets/live3.jpg",
    },
    {
      id: 1,
      name: "Digital Space",
      description: "Per hour use of our fully equipped digital recording studio. Spacious and soundproofed audio studio designed for voice overs, music recording, music production and mixing & mastering.",
      img: "/assets/digital.jpg",
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdUDW8-I25QQoEycTLcTJ90FM-o63JVFWAIuzlPlKr4xLUZLA/viewform?usp=sharing&ouid=115349378318019815143',

    },
    {
      id: 2,
      name: "Podcast Space",
      description: "Per hour use of our fully equipped podcast recording studio. Soundproofed and designed for podcast recordings, interviews and voice overs. We offer 4 Shure SM7B dynamic microphones, a beautiful podcast table with 4 adjustable arms and well designed space for video podcast recordings.",
      img: "/assets/podcast.jpg",
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdUDW8-I25QQoEycTLcTJ90FM-o63JVFWAIuzlPlKr4xLUZLA/viewform?usp=sharing&ouid=115349378318019815143',

    },
    {
      id: 3,
      name: "Video Space",
      description: "Per hour use of our fully equipped video recording studio. Spacious and soundproofed video studio designed for music videos, interviews, short films and commercials. We offer an Apputure 300D Mark 3 Lights and an Amaran 300C with soft box and stands.",
      img: "/assets/video.jpg",
        img2: "/assets/video2.jpg",
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdUDW8-I25QQoEycTLcTJ90FM-o63JVFWAIuzlPlKr4xLUZLA/viewform?usp=sharing&ouid=115349378318019815143',

    },
      {
      id: 4,
      name: "Gear",
      description: "Rent our top-notch audio-visual equipment for your creative projects. We offer cameras, microphones, lighting kits, and more to help you achieve professional results.",
      img: "/assets/guitar.jpg",
        img2: "/assets/console.jpg",
      link: 'https://docs.google.com/forms/d/e/1FAIpQLScOVuSJ8SPuQiDlHryZTt-U3F6ujtzlgAHkkCZ7qNxIKbDnxg/viewform?usp=sharing&ouid=115349378318019815143',

    },
  ]);

  const [activeSpace, setActiveSpace] = useState(0);

  return (
    <>
      {spaces
        .filter((space) => space.id === activeSpace)
        .map((space) => (
          <div
            key={space.id}
            className="w-full h-full bg-black relative flex gap-8 border-2 border-black flex-col items-start p-8 sm:p-20 pt-20  justify-center text-white font-outfit"
          >
            <div className="grid grid-cols-2 gap-8">
              <Image
                src={space.img}
                alt={`${space.name} Space`}
                objectFit="contain"
                width={800}
                height={500}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 35vw"
                className=""
              />
              {space.img2 ? (
                <Image
                  src={space.img2}
                  alt={`${space.name} Space`}
                  objectFit="contain"
                  width={800}
                  height={500}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 35vw"
                  className=""
                />
              ) : null}
              {space.img3 ? (
                <Image
                  src={space.img3}
                  alt={`${space.name} Space`}
                  objectFit="contain"
                  width={800}
                  height={500}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 35vw"
                  className=""
                />
              ) : null}
            </div>

            <h1 className="sm:text-6xl text-4xl font-bold z-1">{space.name} </h1>
            <p className="mt-4 font-light text-base  sm:w-1/2 z-1">{space.description}</p>
            <Link href={space.link} target="_blank"> 
          <button className="bg-[#FFD700] md:flex text-black p-4 text-xs  px-8 cursor-pointer border-[0.5px] hover:bg-amber-300">Rent Now</button>
               </Link>
          </div>
        ))}
      <div className="absolute top-30 left-1/2 sm:left-100 transform -translate-x-1/2 flex sm:space-x-4">
        {spaces.map((space) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            key={space.id}
            onClick={() => setActiveSpace(space.id)}
            className={`px-2 text-xs py-1 sm:px-4 sm:py-2 border-2 border-slate-800 cursor-pointer ${
              activeSpace === space.id
                ? "bg-primary text-black"
                : "bg-black text-white"
            }`}
          >
            {space.name}
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default Spaces;
