import { Geist, Geist_Mono, Outfit } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import Navigation from "./components/Navigation.jsx";

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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
