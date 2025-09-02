import React from 'react'

import { motion, AnimatePresence } from 'framer-motion';

function WhyChooseUsSection() {
  return (
    // why choose us section
    <section
          id="why-us"
          className="relative overflow-hidden bg-slate-900 px-4 py-20 text-center"
        >
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500"></div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="container mx-auto"
          >
            <h2 className="mb-4 text-4xl font-extrabold text-white">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Why Choose Us?
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-300">
              Unlike traditional chat apps, NebulaChat ensures complete privacy.
              We never track, store, or log your conversations. You get pure,
              anonymous, and safe connections every time.
            </p>
          </motion.div>
        </section>
  )
}

export default WhyChooseUsSection