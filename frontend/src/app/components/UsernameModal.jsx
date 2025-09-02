// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function UsernameModal({ isOpen, onSubmit 

// }) {
//   const [name, setName] = useState("");


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name.trim()) {
//       onSubmit(name.trim());
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 120, damping: 15 }}
//             className="w-full max-w-md rounded-xl bg-slate-900 p-6 shadow-lg"
//           >
//             {/* Heading */}
//             <h2 className="mb-2 text-center text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
//               Welcome to NebulaChat
//             </h2>

//             {/* Subtext */}
//             <p className="mb-6 text-center text-sm text-gray-300">
//               Enter a unique display name to start chatting with others.  
//               This will be shown to everyone in the chat, so choose wisely 🌌
//             </p>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Choose a unique name"
//                 className="rounded-lg bg-slate-800 px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <button
//                 type="submit"
//                 disabled={!name.trim()}
//                 className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-4 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Continue to Chat
//               </button>
//             </form>

//             {/* Note */}
//             <p className="mt-4 text-center text-xs text-gray-400">
//               By entering, you agree to keep conversations friendly
//             </p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UsernameModal({ isOpen, onSubmit, error }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="w-full max-w-md rounded-xl bg-slate-900 p-6 shadow-lg"
          >
            {/* Heading */}
            <h2 className="mb-2 text-center text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Welcome to NebulaChat
            </h2>

            {/* Subtext */}
            <p className="mb-6 text-center text-sm text-gray-300">
              Enter a unique display name to start chatting with others.  
              This will be shown to everyone in the chat, so choose wisely 🌌
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Choose a unique name"
                className={`rounded-lg bg-slate-800 px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  error ? "border border-red-500" : ""
                }`}
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={!name.trim()}
                className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-4 py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to Chat
              </button>
            </form>

            {/* Note */}
            <p className="mt-4 text-center text-xs text-gray-400">
              By entering, you agree to keep conversations friendly
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
