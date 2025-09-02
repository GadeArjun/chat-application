'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
function HeroSection() {
    const router = useRouter();

  const handleStartChatting = () => {
    router.push('/chat');
  };

  const handleLearnMore = () => {
    router.push('/#about'); // navigates to the about section on the same page
  };

    return (
        // hero section
        <section
            id="home"
            className="relative flex min-h-screen items-center justify-center overflow-hidden text-center"
        >
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-pink-500/10 to-transparent"></div>
                {/* <div className="absolute inset-0 bg-[url('/starfield.svg')] opacity-50"></div>
            <div className="absolute inset-0 animate-wave bg-[url('/wave.svg')] bg-repeat-x opacity-20"></div> */}
                <div className="absolute inset-0 bg-slate-900/70"></div>
            </div>
            <div className="z-10 px-4">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-4 text-4xl font-extrabold text-white md:text-7xl"
                >
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                        Connect Instantly.
                    </span>{' '}
                    <br />
                    Chat Anonymously.
                </motion.h1>
                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl"
                >
                    NebulaChat is a free, global platform where conversations disappear
                    once you leave. No signups. No storage. Just real talk.
                </motion.p>
                <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1, type: 'spring' }}
                        className="cursor-pointer w-full rounded-full border-2 border-cyan-500 bg-cyan-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 md:w-auto"
                        onClick={handleStartChatting}
                    >
                        <span className="relative z-10">Start Chatting</span>
                    </motion.button>
                    <motion.button
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2, type: 'spring' }}
                        className="cursor-pointer w-full rounded-full border-2 border-white/20 bg-transparent px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-500 hover:text-pink-500 md:w-auto"
                        onClick={handleLearnMore}
                    >

                     Learn More
                    </motion.button> 
                 
                    </div>
          
            </div>
        </section>
    )
}

export default HeroSection