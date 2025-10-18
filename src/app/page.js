import Image from "next/image";
import Spaces from "./components/Spaces";
import Featured from "./components/Featured";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start text-black font-outfit ">
      <main className="w-[90vw] sm:w-[80vw] h-full xl:min-h-[60vh] md:grid grid-cols-2  flex flex-col gap-4 justify-start  items-center p-8">
        <div className="flex items-start justify-start sm:h-full relative  flex-col gap-8">
          <h1 className="text-5xl md:text-9xl font-bold w-full lg:w-full py-8 flex flex-col font-outfit">
            ALIEN PROSE STUDIOS <span className="sm:text-3xl pt-2 text-lg font-bold mask-radial-from-neutral-500  text-slate-900" >Freedom to create!</span>
          </h1>
            
        </div>


        <div className="hidden xl:flex flex-col justify-start items-start w-[80vw] gap-8 h-full  sm:w-full relative">
          
          <Image
            src="/assets/live.jpg"
            alt="Hero Image"
            width={400}
            height={500}
            className="rounded-xs sm:absolute right-1 bottom-10"
          />
          <Image
            src="/assets/digital.jpg"
            alt="Hero Image"
            width={400}
            height={500}
            className="rounded-xs sm:absolute top-1/3 left-1"
          />
          <Image
            src="/assets/podcast.jpg"
            alt="Hero Image"
            width={400}
            height={500}
            className="rounded-xs sm:absolute top-10 right-1"
          />
        </div>
      </main>

      <div className="flex justify-start items-center text-center flex-col p-8 gap-8 w-[80vw]">

        <p className="lg:w-[60%] w-full sm:text-xl font-light">
            {" "}
            We are the one stop shop for creativity in Abuja, producing
            top-notch audio-visual content for a diverse range of clients, while
            also empowering fellow content creators and creatives with access to
            equipment & studio spaces at a reasonable cost.
          </p>
          {/* <div className="flex w-full justify-center py-10"> */}

               <Image
            src="/assets/frontPage2.jpg"
            alt="street light photo"
            width={1000}
            height={500}
            // fill
            className="object-cover"
          />

          {/* </div> */}
       
       
          <p className=" w-full lg:w-[60%] sm:text-xl pb-8 font-light">
            We are simply building capacity to meet already existing demand
            gaps. Gaps in access to quality tools and productive studio spaces
            Gaps in knowledge, skills and experience for innovative
            creatives.
          </p>
      </div>


      
      <main id="spaces" className="sm:w-[80vw] w-full flex items-center flex-col  justify-center  relative ">

        <Image
          src="/assets/frontPage.jpg"
          alt="Spaces"
          width={1000}
          height={500}
          // layout="fill"
          className="object-cover"
        />
        {/* <Spaces /> */}


    
      </main>
          {/* <h2 className="text-xlg sm:text-2xl font-light text-black py-8">We can bring your creative vision to life</h2> */}


          {/* <div className="p-4 sm:py-8 w-[80%] flex-row bg-black flex justify-center ">
        {/* <Featured /> */}

        {/* </div>  */}
      <footer className="flex flex-col gap-8 sm:grid grid-cols-3 h-full bg-black w-[80vw] m-8  p-8 sm:p-20 items-center font-light justify-center text-sm sm:text-md">

        <div className="flex flex-col gap-4 text-white w-full justify-center  h-full">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={500}
            height={500}
          />
          <p className="">
          We are a full-service creative studio delivering premium production, rentals, training, and live music experiences. Ideas become possible here.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 text-white w-full justify-center  h-full">
          <h1 className="text-xl  sm:text-xl font-bold">Contact Us</h1>
          <p>Let’s Create Together
Reach out to collaborate, rent equipment, join CLA, or book a live performance session.</p>
          <p>operations@alienprose.com</p>
          <p>+234 916 512 9729</p>
          <a 
            href="https://maps.app.goo.gl/rjmMo5QwTZwAMRjY6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#FFD700] transition-colors duration-200 cursor-pointer underline decoration-dotted underline-offset-2"
          >
            KatuKoma Plaza, Rd, behind NNPC Filling Station, Gudu, Abuja, Federal Capital Territory
          </a>
        </div>
      
          <nav className="h-full w-full flex text-primary items-center justify-start sm:justify-center">
               <ul className="flex flex-col p-6 space-y-4">
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/spaces" >
              Production
            </Link>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/spaces" >
              Rentals
            </Link>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <span>Creative Learning Academy</span>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <span>Alien Prose Live</span>
          </li>
        </ul>
          </nav>
     
      </footer>
    </div>
  );
}
