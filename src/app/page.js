import Image from "next/image";
import Spaces from "./components/Spaces";
import Featured from "./components/Featured";
import Slideshow from "./components/Slideshow";
import HeroSlideshow from "./components/HeroSlideshow";
import Link from "next/link";
import { createClient } from "contentful";

export default async function Home() {
  // Initialize Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch slides from Contentful
  let slides = [];
  try {
    const response = await client.getEntries({
      content_type: "slide",
      include: 2,
      order: "fields.order", // Sort by the order field in ascending order
    });
    slides = response.items || [];
    console.log(`Found ${slides.length} slides`);
  } catch (error) {
    console.error("Error fetching slides:", error);
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start text-black font-outfit ">
      <main className="w-[90vw] sm:w-[80vw] h-full xl:min-h-[60vh] md:grid grid-cols-2  flex flex-col sm:gap-4 justify-start  items-center p-8">
        <div className="flex items-start justify-start w-full sm:h-full relative  flex-col gap-8">
          <h1 className="text-[15vw] sm:text-[10vw] font-bold w-full lg:w-full sm:py-4 flex flex-col font-outfit">
            
            <span className="xl:pl-[10%]"> ALIEN PROSE</span>{" "}
            {/* <span className="xl:pl-[100%] xl:pt-8 ">STUDIOS</span>{" "} */}
            <span className="sm:text-3xl py-2 sm:absolute text-lg font-bold mask-radial-from-neutral-500  text-slate-900">
              Freedom to create!
            </span>
          </h1>
        </div>
        <div className="flex flex-col h-full w-full">
          <HeroSlideshow />

            <span className="font-bold text-[9vw] py-2">STUDIOS</span>{" "}


        </div>
      </main>

      <div className="flex justify-start items-center flex-col xl:flex-row p- sm:p-8 gap-8 w-[80vw] sm:border-b-[0.5px] border-t-[0.5px] border-black ">
        <Image
          src="/assets/frontPage2.jpg"
          alt="street light photo"
          width={800}
          height={500}
          sizes=" max"
          // fill
          className="object-cover"
        />
        <div className="xl:w-[30vw] h-full flex flex-col gap-8 justify-center items-center">

        <p className="w-full text-xl xl:text-4xl font-light border-l-[0.5px] border-black pl-5 ">
          {" "}
          We are the one stop shop for creativity in Abuja, producing top-notch
          audio-visual content for a diverse range of clients, while also
          empowering fellow content creators and creatives with access to
          equipment & studio spaces at a reasonable cost.
        </p>
        {/* <div className="flex w-full justify-center py-10"> */}


      

        {/* </div> */}

     
        </div>

      </div>

      {/* Contentful Slides Section */}

      <main
        id="spaces"
        className="sm:w-[80vw] w-full flex items-center flex-col sm:flex-row  justify-center  relative border-y-[0.5px] border-black "
      >
           <p className=" w-[80vw] pt-4 xl:w-[40vw] text-xl xl:text-4xl pb-8 font-light border-x-[0.5px] border-black px-5">
          We are simply building capacity to meet already existing demand gaps.
          Gaps in access to quality tools and productive studio spaces Gaps in
          knowledge, skills and experience for innovative creatives.
        </p>
        {/* <Image
          src="/assets/frontPage.jpg"
          alt="Spaces"
          width={1000}
          height={500}
          // layout="fill"
          className="object-cover"
        /> */}
        {/* <Spaces /> */}
        <Slideshow slides={slides} />
      </main>
      {/* <h2 className="text-xlg sm:text-2xl font-light text-black py-8">We can bring your creative vision to life</h2> */}

      {/* <div className="p-4 sm:py-8 w-[80%] flex-row bg-black flex justify-center ">
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
    </div>
  );
}
