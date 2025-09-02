/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import FeatureSecton from './components/FeatureSecton';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import AboutUsSection from './components/AboutUsSection';
import ContactUsSection from './components/ContactUsSection';

// Custom Components
const NebulaLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.5"
    className="h-8 w-8"
  >
    <defs>
      <linearGradient id="logo-gradient-main" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" /> {/* indigo-500 */}
        <stop offset="50%" stopColor="#9333EA" /> {/* purple-600 */}
        <stop offset="100%" stopColor="#EC4899" /> {/* pink-500 */}
      </linearGradient>
    </defs>
    <motion.path
      d="M21 15a2 2 0 01-2 2H7l-4 4V3a2 2 0 012-2h14a2 2 0 012 2z"
      stroke="url(#logo-gradient-main)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
    <motion.circle
      cx="12"
      cy="9"
      r="4"
      fill="none"
      stroke="url(#logo-gradient-main)"
      strokeLinecap="round"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: 'backOut' }}
    />
    <motion.path
      d="M14 10.5a.5.5 0 11-1 0 .5.5 0 011 0zM10 7.5a.5.5 0 11-1 0 .5.5 0 011 0z"
      stroke="url(#logo-gradient-main)"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    />
  </svg>
);



// Main Page Component
export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  const menuItems = ["Home", "Features", "Why Us", "About", "Contact"];
  return (
    <div className="min-h-screen bg-slate-900 text-gray-200">
      {/* Navbar */}
      {/* <header className="fixed inset-x-0 top-0 z-50 bg-slate-900/60 p-4 backdrop-blur-lg">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <NebulaLogo />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
              NebulaChat
            </span>
          </div>
          <div className="hidden space-x-8 text-lg md:flex">
            {['Home', 'Features', 'Why Us', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-indigo-500 after:via-purple-600 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-50 rounded-md p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="fixed inset-y-0 right-0 z-40 w-full bg-slate-900/80 p-8 backdrop-blur-lg md:hidden"
            >
              <nav className="flex h-full flex-col items-center justify-center space-y-6 text-xl">
                {['Home', 'Features', 'Why Us', 'About', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-gray-300 transition-all duration-300 hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header> */}

      <header className="fixed inset-x-0 top-0 z-50 bg-slate-900/60 backdrop-blur-lg">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2">
          <NebulaLogo />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            NebulaChat
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 text-base md:flex lg:text-lg">
          {menuItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-indigo-500 after:via-purple-600 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="z-50 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger
              }
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-y-0 right-0 -z-1 flex w-4/5 max-w-sm flex-col bg-slate-900/95 p-8 backdrop-blur-lg sm:w-2/3 md:hidden"
          >
            <nav className="mt-20 flex flex-col items-center space-y-6 text-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-lg ">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-gray-300 transition-all duration-300 hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

      {/* Main Content */}
    <main className='flex flex-col'>
        {/* Hero Section */}
        <HeroSection/>
    
      {/* Feature Section */}
      <FeatureSecton/>

        {/* Why Choose Us Section */}
       <WhyChooseUsSection/>

        {/* About Us Section */}
        <AboutUsSection/>
       

        {/* Contact Us Section */}
        <ContactUsSection/>
      
      </main>

       {/* Footer */}
      <footer className="relative bg-slate-900 py-10">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500"></div>
        <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <NebulaLogo />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
              NebulaChat
            </span>
          </div>
          <div className="flex space-x-6 text-lg">
            {['Home', 'Features', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-indigo-500 after:via-purple-600 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            © 2025 NebulaChat. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
