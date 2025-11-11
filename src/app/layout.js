import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import Navigation from "./components/Navigation.jsx";
import { ContentfulProvider } from "./contexts/ContentfulContext.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alien Prose Studios",
  description: "One stop shop for creativity in Abuja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
      > 
        <ContentfulProvider>
          <div className="w-full flex justify-center">
            <Navigation />
          </div>
          {children}
        <div className="w-full flex justify-center">
          <footer className="flex flex-col gap-8 sm:grid grid-cols-3 h-full bg-black w-[80vw] m-8  p-8 sm:p-20 items-center font-light justify-center text-xs sm:text-md">
            <div className="flex flex-col gap-4 text-white w-full justify-center  h-full">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={500}
                height={500}
              />
              <p className="">
                We are a full-service creative studio delivering premium
                production, rentals, training, and live music experiences. Ideas
                become possible here.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 text-white w-full justify-center  h-full">
              <h1 className="text-xl  sm:text-xl font-bold">Contact Us</h1>
              <p>
                Let’s Create Together Reach out to collaborate, rent equipment,
                join CLA, or book a live performance session.
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
          </footer>
        </div>
        </ContentfulProvider>
      </body>
    </html>
  );
}
