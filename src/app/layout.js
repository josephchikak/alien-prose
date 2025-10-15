import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";

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
  subsets:["latin"]
})

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
        <nav className="w-[80vw] font-outfit justify-self-center h-20 flex items-center m-4 justify-between px-10  bg-black text-white rounded-2xl border-[0.5px]">
          <Image
          className="text-white"
            src="/assets/logo.png"
            alt="Logo"
            width={60}
            height={100}
          />
          <ul className="flex sm:gap-10 flex-row sm:text-sm  text-xs gap-4 ">
            <li className="cursor-pointer hover:bg-[#FFD700] p-4 hover:text-black rounded-xl px-8"> <Link href="#spaces">Spaces</Link></li>
            <li className="cursor-pointer hover:bg-[#FFD700] p-4 hover:text-black rounded-xl px-8">Gears</li>
            <li className="cursor-pointer hover:bg-[#FFD700] p-4 hover:text-black rounded-xl px-8">Production Services</li>
            <li className="cursor-pointer hover:bg-[#FFD700] p-4 hover:text-black rounded-xl px-8">CLA</li>
          </ul>
          <button className="bg-[#FFD700] hidden md:flex text-black p-4 text-xs rounded-xl px-8 cursor-pointer border-[0.5px] hover:bg-amber-300">Book</button>
        </nav>
        {children}
      </body>
    </html>
  );
}
