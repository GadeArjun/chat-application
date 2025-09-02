import React from 'react'
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';


const FeatureCard = ({ icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-full bg-slate-900 p-3">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
      <div className="absolute inset-0 z-[-1] rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-600/20 to-pink-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    </motion.div>
  );
};


function FeatureSecton() {
  return (
    //   features section
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-extrabold text-white">Features</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          Discover why NebulaChat is the best way to connect.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Anonymous Chat"
          description="No need to sign up. Just open the app and start a conversation. Your identity remains private."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#logo-gradient)"
              strokeWidth="1.5"
              className="h-8 w-8"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" className="stop-color-indigo-500" />
                  <stop offset="50%" className="stop-color-purple-600" />
                  <stop offset="100%" className="stop-color-pink-500" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0A12.002 12.002 0 0012 21.75a12.002 12.002 0 00-5.982-2.975m11.963 0A8.966 8.966 0 0112 21.75a8.966 8.966 0 01-5.982-2.975M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        />
        <FeatureCard
          title="Instant Connections"
          description="Connect with new people in real-time with just a single tap. No waiting, no hassle."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#logo-gradient)"
              strokeWidth="1.5"
              className="h-8 w-8"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" className="stop-color-indigo-500" />
                  <stop offset="50%" className="stop-color-purple-600" />
                  <stop offset="100%" className="stop-color-pink-500" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21V6.75a4.5 4.5 0 019 0v14.25M13.5 10.5H21a.75.75 0 00.75-.75V8.25m-8.25 2.25H3.75a.75.75 0 01-.75-.75V8.25m10.5 0H21a.75.75 0 01.75.75v12a.75.75 0 01-.75.75h-7.5"
              />
            </svg>
          }
        />
        <FeatureCard
          title="Ephemeral Conversations"
          description="Once you leave a chat, the conversation history is completely deleted. Your data is never stored."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#logo-gradient)"
              strokeWidth="1.5"
              className="h-8 w-8"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" className="stop-color-indigo-500" />
                  <stop offset="50%" className="stop-color-purple-600" />
                  <stop offset="100%" className="stop-color-pink-500" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.166 2.323 2.323a2.75 2.75 0 003.89 0v-.748a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.748c0 1.01-.424 1.96-1.18 2.64M18.74 9l.346-9m4.788 0l-.346 9m-9.968 3.21c-.342.052-.682.107-1.022.166"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-4.5zM12 14.25a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75v5.25zM4.5 12.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-4.5z"
              />
            </svg>
          }
        />
        <FeatureCard
          title="Mobile Friendly"
          description="A seamless experience on any device. Chat on your phone, tablet, or desktop with a responsive design."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#logo-gradient)"
              strokeWidth="1.5"
              className="h-8 w-8"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" className="stop-color-indigo-500" />
                  <stop offset="50%" className="stop-color-purple-600" />
                  <stop offset="100%" className="stop-color-pink-500" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75zM12.75 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75zM16.5 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75zM19.5 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75zM7.5 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75zM4.5 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75zM2.25 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75zM21.75 20.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-1.5 0V19.5a.75.75 0 00.75.75z"
              />
            </svg>
          }
        />
        <FeatureCard
          title="Global Reach"
          description="Connect with people from all over the world. Our platform is built for global, real-time communication."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#logo-gradient)"
              strokeWidth="1.5"
              className="h-8 w-8"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" className="stop-color-indigo-500" />
                  <stop offset="50%" className="stop-color-purple-600" />
                  <stop offset="100%" className="stop-color-pink-500" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9 9 0 100-18 9 9 0 000 18z"
              />
            </svg>
          }
        />
      </div>
    </section>
  )
}

export default FeatureSecton