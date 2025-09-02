'use client';
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';


function AboutUsSection() {
  return (
    // about us section
     <section id="about" className="container mx-auto px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative aspect-square w-full"
            >
              <div className="h-full w-full rounded-2xl bg-white/5 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  <div className="absolute h-full w-full animate-pulse rounded-full bg-indigo-500/20"></div>
                  <div className="absolute h-full w-full animate-pulse rounded-full bg-purple-600/20 [animation-delay:0.5s]"></div>
                  <div className="absolute h-full w-full animate-pulse rounded-full bg-pink-500/20 [animation-delay:1s]"></div>
                  <img
                    src="/chat-bubble-3d.png"
                    alt="3D Chat Bubble"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="mb-4 text-4xl font-extrabold text-white">About Us</h2>
              <p className="mb-6 text-lg text-gray-300">
                At NebulaChat, our mission is simple: to create a space for
                genuine, unmonitored human connection. We believe in the power
                of conversation without the burden of data collection or
                surveillance.
              </p>
              <p className="text-gray-400">
                In a world where every click is tracked, we offer an oasis of
                privacy. Our platform is a testament to the idea that technology
                can be a tool for freedom, not a means of control. Join us and
                experience true, ephemeral chat.
              </p>
            </motion.div>
          </div>
        </section>
  )
}

export default AboutUsSection