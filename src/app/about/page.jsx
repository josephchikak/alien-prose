import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-start text-black font-outfit overflow-hidden">
      <section className="w-[90vw] sm:w-[80vw] min-h-[20vh] flex flex-col justify-start items-center p-8">
        <h1 className="text-5xl sm:text-8xl font-bold w-full text-center font-outfit">
          Our Team
        </h1>
      </section>

      <div className="flex justify-start items-center flex-col xl:flex-row pt-2 sm:p-8 gap-8 w-[80vw] sm:border-b-[0.5px] border-black">
        <Image
          src="/assets/frontPage2.jpg"
          alt="The Alien Prose Studios team"
          width={800}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover"
        />
        <div className="xl:w-[30vw] h-full flex flex-col gap-8 justify-center items-center">
          <p className="w-[80vw] pt-4 xl:w-[30vw] text-xl xl:text-4xl pb-8 font-light border-r-[0.5px] border-black px-5">
            We are the one stop shop for creativity in Abuja, producing
            top-notch audio-visual content for a diverse range of clients,
            while also empowering fellow content creators and creatives with
            access to equipment & studio spaces at a reasonable cost.
          </p>
        </div>
      </div>
    </main>
  );
}
