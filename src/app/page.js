import Image from "next/image";
import Spaces from "./components/Spaces";
import Featured from "./components/Featured";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start text-black font-outfit ">
      <main className="w-[90vw] sm:w-[80vw] h-full flex flex-col sm:grid sm:grid-cols-2 items-center p-4">
        <div className="flex items-start justify-start h-full relative  p-4  sm:h-[80vh] flex-col gap-8">
          <h1 className="text-3xl md:text-8xl font-bold w-full lg:w-[50vw] py-8 flex flex-col font-outfit">
            ALIEN PROSE STUDIOS <span className="sm:text-lg pt-2 text-xs font-light">Creative Spaces where stories come to life</span>
          </h1>
          <p className="sm:w-[90%] w-full sm:text-lg font-light">
            {" "}
            We are the one stop shop for creativity in Abuja, producing
            top-notch audio-visual content for a diverse range of clients, while
            also empowering fellow content creators and creatives with access to
            equipment & studio spaces at a reasonable cost.
          </p>
          <p className="sm:w-[90%] w-full sm:text-lg pb-8 font-light">
            We are simply building capacity to meet already existing demand
            gaps. Gaps in access to quality tools and productive studio spaces
            Gaps in knowledge, skills and experience for innovative
            creatives.
          </p>
        </div>
        <div className="grid grid-cols-2 justify-start items-center w-[80vw] gap-4 h-full sm:h-[70vh] sm:w-full relative">
          <Image
            src="/assets/live.jpg"
            alt="Hero Image"
            width={400}
            height={500}
            className="rounded-xs sm:absolute right-1 bottom-20"
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
            className="rounded-xs sm:absolute top-0 right-1"
          />
        </div>
      </main>
      <main id="spaces" className="sm:w-[90vw] w-[90vw] h-full flex items-center flex-col  justify-center py-15 relative ">
        
        <Spaces />


    
      </main>
          <h2 className="text-xlg sm:text-2xl font-light text-black py-8">We can bring your creative vision to life</h2>


          <div className="p-4 sm:py-8 w-[80%] flex-row bg-black flex justify-center ">
        <Featured />

        </div>
      <footer className="flex flex-col gap-8 sm:grid grid-cols-3 h-full bg-black w-[80vw] m-8  p-8 sm:p-20 items-center font-light justify-center text-sm sm:text-md">

        <div className="flex flex-col gap-4 text-white w-full justify-center  h-full">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
          <p className="">
            We are the one stop shop for creativity in Abuja, producing
            top-notch audio-visual content for a diverse range of clients, while
            also empowering fellow content creators and creatives with access to
            equipment & studio spaces at a reasonable cost.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 text-white w-full justify-center  h-full">
          <h1 className="text-xl  sm:text-xl font-bold">Contact Us</h1>
          <p>operations@alienprose.com</p>
          <p>+234 916 512 9729</p>
          <p>KatuKoma Plaza, Rd, behind NNPC Filling Station, Gudu, Abuja, Federal Capital Territory</p>
        </div>
      
          <nav className="h-full w-full flex items-center justify-start sm:justify-center">
            <ul className="flex gap-2 sm:gap-10 flex-col text-white items-center sm:justify-center sm:w-1/2 h-full hover:text-primary ">
              <li className="cursor-pointer text-center">Spaces</li>
              <li className="cursor-pointer text-center">Gears</li>
              <li className="cursor-pointer text-center">About</li>
            </ul>
          </nav>
     
      </footer>
    </div>
  );
}
