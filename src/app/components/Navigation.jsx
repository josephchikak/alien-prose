"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="w-[80vw] font-outfit justify-self-center h-20 flex items-center m-4 justify-between px-4 md:px-10 bg-black text-white  border-[0.5px] relative">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <Image
            className="text-white"
            src="/assets/logo.png"
            alt="Logo"
            width={60}
            height={100}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-10 flex-row text-xs xl:text-sm justify-center items-center">
              {/* <li className="cursor-pointer hover:bg-primary flex justify-center h-full items-center p-4 hover:text-black px-8">
                <Link href="/spaces">Production</Link>
          </li> */}
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center  p-4 hover:text-black px-8">
            <Link href="/spaces">Rentals</Link>
          </li>
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center   p-4 hover:text-black px-8">
            Creative Learning Academy
          </li>
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center  p-4 hover:text-black px-8">
            <Link href="/alienProseLive">Alien Prose Live</Link>
          </li>
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center  p-4 hover:text-black px-8">
            <Link href="/about">About</Link>
          </li>
        </ul>

        {/* Desktop Book Button */}
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSdUDW8-I25QQoEycTLcTJ90FM-o63JVFWAIuzlPlKr4xLUZLA/viewform?usp=sharing&ouid=115349378318019815143"
          target="_blank"
        >
          <button className="bg-primary hidden md:flex text-black p-4 text-xs  px-8 cursor-pointer border-[0.5px] hover:bg-amber-300">
            Book
          </button>
        </Link>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition duration-300 ease-in-out ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transform transition duration-300 ease-in-out ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-black text-white transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <Link href="/" className="cursor-pointer">
            <Image src="/assets/logo.png" alt="Logo" width={50} height={50} />
          </Link>
          <button
            onClick={closeMenu}
            className="text-white text-2xl focus:outline-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Mobile Menu Items */}
        <ul className="flex flex-col p-6 space-y-4">
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/spaces" onClick={closeMenu}>
              Production
            </Link>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/spaces" onClick={closeMenu}>
              Rentals
            </Link>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <span onClick={closeMenu}>Creative Learning Academy</span>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <span onClick={closeMenu}>Alien Prose Live</span>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>

        {/* Mobile Book Button */}
        <div className="p-6">
          <button
            onClick={closeMenu}
            className="w-full bg-[#FFD700] text-black p-4 text-sm rounded-xl cursor-pointer border-[0.5px] hover:bg-amber-300 transition-colors duration-200"
          >
            Book
          </button>
        </div>
      </div>
    </>
  );
}
