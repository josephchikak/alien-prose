"use client";

import Image from "next/image";
import Spaces from "./components/Spaces";
import Featured from "./components/Featured";
import Slideshow from "./components/Slideshow";
import HeroSlideshow from "./components/HeroSlideshow";
import Link from "next/link";
import { useContentful } from "./contexts/ContentfulContext";
import { useState, useEffect } from "react";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const client = useContentful();

  // Fetch slides from Contentful using context
  useEffect(() => {
    async function loadSlides() {
      console.log("Loading slides...");
      console.log("Client available:", !!client);

      try {
        if (!client) {
          console.log("No client available, skipping fetch");
          setLoading(false);
          return;
        }

        const response = await client.getEntries({
          content_type: "slide",
          order: "fields.order",
        });
        const fetchedSlides = response.items;
        console.log("Fetched slides:", fetchedSlides?.length);
        setSlides(fetchedSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSlides();
  }, [client]);
  return (
    <main className="w-screen min-h-screen   flex flex-col items-center justify-start text-black font-outfit overflow-hidden">
      <section className="w-[90vw]  bg-gradient-to-b sm:w-[80vw] min-h-[30vh] sm:min-h-[40vh]  flex flex-col sm:gap-4 justify-start relative  items-center p-8">
        <div className="flex items-center justify-start w-full sm:h-full relative  flex-row gap-8 ">
          <h1 className="text-6xl sm:text-9xl gap-4  text-black md:text-[8vw] font-bold w-full lg:w-full sm:py-4 flex flex-col relative font-outfit">
            ALIEN
            <span className=" "> PROSE </span>{" "}
            <span className=" "> STUDIOS </span>{" "}
            {/* <span className="">STUDIOS</span>{" "} */}
            <span className="sm:text-4xl text-sm sm:absolute -z-10 right-0  sm:right-1   font-bold mask-radial-from-neutral-300  text-[#D00000]">
              Freedom to Create!
            </span>
          </h1>

          <span className="sm:text-7xl py-2 sm: text-sm  invisible sm:visible  font-bold mask-radial-from-neutral-300  text-black">
            at Alien Prose Studios we give you the{" "}
            <span className="font-extrabold underline decoration-4 underline-offset-4 decoration-[#D00000]">
              freedom
            </span>{" "}
            to bring your creative visions to life.
          </span>
          {/* <HeroSlideshow /> */}
          {/* <Image
            src="/assets/frontPage2.jpg"
            alt="Hero Image"
            width={1200}
            height={600}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover rounded-lg"
          /> */}
        </div>
        {/* <div className=" flex flex-col h-full w-full"> */}

        {/* <span className="hidden sm:block font-bold text-[9vw] py-2">STUDIOS</span>{" "} */}

        {/* </div> */}
      </section>

      <div className="flex justify-start items-center flex-col xl:flex-row pt-2 sm:p-8 gap-8 w-[80vw] sm:border-b-[0.5px]  border-black ">
        <Image
          src="/assets/frontPage2.jpg"
          alt="street light photo"
          width={800}
          height={500}
          sizes=" (max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
       
          className="object-cover"
        />
        <div className="xl:w-[30vw] h-full flex flex-col gap-8 justify-center items-center">
         <p className=" w-[80vw] pt-4 xl:w-[30vw] text-xl xl:text-4xl pb-8 font-light border-r-[0.5px] border-black px-5">
          Abuja creatives have the talent. They just needed the space. 
          <span className="font-black text-red-600"> Alien
          Prose. </span>
        </p>

        </div>
      </div>


      {/* Contentful Slides Section */}

      <div
        id="spaces"
        className="sm:w-[80vw] w-full flex items-center flex-col sm:flex-row  justify-center  relative border-y-[0.5px] border-black "
      >

            <p className="w-full text-xl xl:text-4xl font-light border-l-[0.5px] border-black pl-5 ">
            {" "}
            We are the one stop shop for creativity in Abuja, producing
            top-notch audio-visual content for a diverse range of clients, while
            also empowering fellow content creators and creatives with access to
            equipment & studio spaces at a reasonable cost.
          </p>
     
     
        {/* <Spaces /> */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading slides...</div>
          </div>
        ) : (
          <Slideshow slides={slides} />
        )}
      </div>
      {/* <h2 className="text-xlg sm:text-2xl font-light text-black py-8">We can bring your creative vision to life</h2> */}

      {/* <main className="p-4 sm:py-8 w-[80%] flex-row bg-black flex justify-center ">
        {/* <Featured /> */}

      {/* </div>  */}
      {/* <footer className="flex flex-col gap-8 sm:grid grid-cols-3 h-full bg-black w-[80vw] m-8  p-8 sm:p-20 items-center font-light justify-center text-sm sm:text-md">
        <div className="flex flex-col gap-4 text-white w-full justify-center  h-full">
          <Image src="/assets/logo.png" alt="Logo" width={500} height={500} />
          <p className="">
            We are a full-service creative studio delivering premium production,
            rentals, training, and live music experiences. Ideas become possible
            here.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 text-white w-full justify-center  h-full">
          <h1 className="text-xl  sm:text-xl font-bold">Contact Us</h1>
          <p>
            Let’s Create Together Reach out to collaborate, rent equipment, join
            CLA, or book a live performance session.
          </p>
          <p>operations@alienprose.com</p>
          <p>+234 916 512 9729</p>
          <a
            href="https://maps.app.goo.gl/rjmMo5QwTZwAMRjY6"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFD700] transition-colors duration-200 cursor-pointer underline decoration-dotted underline-offset-2"
          >
            KatuKoma Plaza, Rd, behind NNPC Filling Station, Gudu, Abuja,
            Federal Capital Territory
          </a>
        </div>

        <nav className="h-full w-full flex text-primary items-center justify-start sm:justify-center">
          <ul className="flex flex-col p-6 space-y-4">
            <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
              <Link href="/spaces">Production</Link>
            </li>
            <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
              <Link href="/spaces">Rentals</Link>
            </li>
            <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
              <span>Creative Learning Academy</span>
            </li>
            <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
              <span>Alien Prose Live</span>
            </li>
          </ul>
        </nav>
      </footer> */}
    </main>
  );
}
