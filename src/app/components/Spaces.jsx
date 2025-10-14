"use client";

import { useState } from "react";
import Image from "next/image";
import {motion} from "motion/react"

const Spaces = () => {
  const [spaces, setSpaces] = useState([
    {
      id: 0,
      name: "Live",
      description: "Per hour use of our fully equipped live recording studio. Spacious and soundproofed audio studio designed for live music recordings, with live music instruments(Drums set, electric guitar, bass and synth keyboards). We offer options of a lead microphone and backups, a standard digital mixing consol in the control room, house and on the wall felxible product light to support videos. Constant power supply in an air conditioned spacesd ensuite with a convinence room for your comfort",
      img: "/assets/live.jpg",
      img2: "/assets/live2.jpg",
    //   img3: "/assets/live3.jpg",
    },
    {
      id: 1,
      name: "Digital",
      description: "Per hour use of our fully equipped digital recording studio. Spacious and soundproofed audio studio designed for voice overs, music recording, music production and mixing & mastering.",
      img: "/assets/digital.jpg",
    },
    {
      id: 2,
      name: "Podcast",
      description: "Per hour use of our fully equipped podcast recording studio. Soundproofed and designed for podcast recordings, interviews and voice overs. We offer 4 Shure SM7B dynamic microphones, a beautiful podcast table with 4 adjustable arms and well designed space for video podcast recordings.",
      img: "/assets/podcast.jpg",
    },
    {
      id: 3,
      name: "Video",
      description: "Per hour use of our fully equipped video recording studio. Spacious and soundproofed video studio designed for music videos, interviews, short films and commercials. We offer an Apputure 300D Mark 3 Lights and an Amaran 300C with soft box and stands.",
      img: "/assets/video.jpg",
        img2: "/assets/video2.jpg",
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
            className="sm:w-[90%] h-[80vh] bg-black relative flex gap-8 border-2 border-black flex-col items-start p-10 justify-start text-white font-outfit"
          >
            <div className="grid grid-cols-2 gap-8">
              <Image
                src={space.img}
                alt={`${space.name} Space`}
                objectFit="contain"
                width={500}
                height={500}
                className=""
              />
              {space.img2 ? (
                <Image
                  src={space.img2}
                  alt={`${space.name} Space`}
                  objectFit="contain"
                  width={500}
                  height={500}
                  className=""
                />
              ) : null}
              {space.img3 ? (
                <Image
                  src={space.img3}
                  alt={`${space.name} Space`}
                  objectFit="contain"
                  width={500}
                  height={500}
                  className=""
                />
              ) : null}
            </div>

            <h1 className="sm:text-6xl text-4xl font-bold z-1">{space.name} Space</h1>
            <p className="mt-4 font-light text-lg  sm:w-1/2 z-1">{space.description}</p>
          </div>
        ))}
      <div className="absolute top-10 left-1/2 sm:left-70 transform -translate-x-1/2 flex sm:space-x-4">
        {spaces.map((space) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            key={space.id}
            onClick={() => setActiveSpace(space.id)}
            className={`px-2 py-1 sm:px-4 sm:py-2 border-2 border-slate-800 cursor-pointer ${
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
