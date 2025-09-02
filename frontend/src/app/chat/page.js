"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UsernameModal from "../components/UsernameModal";
import { io } from "socket.io-client";






// const users = [
//   { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
//   { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
//   { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
//   { id: 4, name: "Diana", avatar: "https://i.pravatar.cc/40?img=4" },
//   { id: 5, name: "Ethan", avatar: "https://i.pravatar.cc/40?img=5" },
//   { id: 6, name: "Alice name", avatar: "https://i.pravatar.cc/40?img=6" },
//   { id: 7, name: "Bob name", avatar: "https://i.pravatar.cc/40?img=7" },
//   { id: 8, name: "Charlie name", avatar: "https://i.pravatar.cc/40?img=56" },
//   { id: 9, name: "Diana name", avatar: "https://i.pravatar.cc/40?img=8" },
//   { id: 10, name: "Ethan name", avatar: "https://i.pravatar.cc/40?img=9" },
// ];

// const initialMessages = {
//   1: [
//     { from: "Alice", text: "Hey! How’s it going?" },
//     { from: "me", text: "All good, working on NebulaChat 🚀" },
//   ],
//   2: [
//     { from: "Bob", text: "Don’t forget the meeting at 3 PM." },
//     { from: "me", text: "Got it, thanks!" },
//   ],
//   3: [
//     { from: "Charlie", text: "Did you check out the new update?" },
//     { from: "me", text: "Yep, looks amazing 🔥" },
//   ],
//   4: [
//     { from: "Diana", text: "What are your weekend plans?" },
//     { from: "me", text: "Probably some coding and Netflix 😅" },
//   ],
//   5: [
//     { from: "Ethan", text: "Can you review my PR?" },
//     { from: "me", text: "Sure, I’ll check it today." },
//   ],
// };

export default function Chat() {
  const [username, setUsername] = useState(""); // store user's name
  const [userList, setUserList] = useState([]);
  const [usernameError, setUsernameError] = useState("");

  const [activeUserId, setActiveUserId] = useState(null);

  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only initialize if not already
    if (!socketRef.current) {
      socketRef.current = io("/"); // your backend endpoint
    }

    const socket = socketRef.current;
    setSocket(socket);

    socket?.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket?.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Example: listen to userList
    socket?.on("userList", (list) => {
      console.log("Received user list:", list);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const activeUser = useMemo(
    () => userList.find((u) => u.id === activeUserId),
    [activeUserId, userList]
  );

  useEffect(() => {
    if (!activeUserId && userList.length > 0) {
      setActiveUserId(userList[0].id);
    }
  }, [userList, activeUserId]);

  // per-user message threads
  const [messagesByUser, setMessagesByUser] = useState([]); // initialMessages
  // per-user drafts so switching user keeps their unsent text
  const [drafts, setDrafts] = useState({});
  const currentDraft = drafts[activeUserId] ?? "";

  // mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // auto-scroll to bottom on new messages or when switching chats
  const bottomRef = useRef(null);


  useEffect(() => {
    socket?.on("userList", (list) => {
      // list is array of usernames
      console.log("Received user list:", list);
      setUserList(list.map((name, idx) => ({
        id: idx + 1,
        name,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`, // unique avatar per username
        // avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
      })))


      console.log("userList ref:", userList);
    });

    return () => socket?.off("userList");
  }, [socket]);

  useEffect(() => {
    if (username) {
      console.log("Emitting join for username:", username);
      socket?.emit("join", username);
    }
    return () => socket?.off("join");
  }, [username, socket]);


  useEffect(() => {
    socket?.on("privateMessage", ({ from, text, time }) => {
      // find user by name
      console.log("Received private message:", { from, text, time, username });
      if (from.trim().toLowerCase() === username.trim().toLowerCase()) return;
      const user = userList.find((u) => u.name === from);
      if (!user) return;

      setMessagesByUser((prev) => ({
        ...prev,
        [user.id]: [...(prev[user.id] ?? []), { from, text }],
      }));
    });

    return () => {
      socket?.off("privateMessage");
    };
  }, [userList, socket]);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeUserId, messagesByUser[activeUserId]?.length]);

  const handleSelectUser = (id) => {
    setActiveUserId(id);
    setIsSidebarOpen(false); // close drawer on mobile when selecting
  };

  const setDraftForUser = (id, value) =>
    setDrafts((d) => ({ ...d, [id]: value }));



  const sendMessage = () => {
    const text = (drafts[activeUserId] ?? "").trim();
    if (!text) return;

    const recipientName = userList.find((u) => u.id === activeUserId)?.name;
    if (!recipientName) return;

    // send private message to recipient
    console.log(`Sending private message to ${recipientName}: ${text}`);
    socket?.emit("privateMessage", { to: recipientName, text });

    // add to local state
    setMessagesByUser((prev) => ({
      ...prev,
      [activeUserId]: [...(prev[activeUserId] ?? []), { from: "me", text }],
    }));

    setDraftForUser(activeUserId, "");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      sendMessage();
    }
    // Shift+Enter → allow newline (default)
  };

  useEffect(() => {
    socket?.on("usernameTaken", ({ message }) => {
      console.log("Username taken:", message);
      setUsername("");        // reset the current username input
      setUsernameError(message); // show the error in the modal
    });

    return () => socket?.off("usernameTaken");
  }, [socket]);



  // only show chat if username exists
  if (!username) {
    return <UsernameModal error={usernameError} isOpen={!username} onSubmit={(name) => {
      setUsernameError(""); // reset previous error
      setUsername(name);
    }} />;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-slate-900 text-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900/80 backdrop-blur-lg md:flex md:flex-col">
        <h2 className="p-4 text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Chats
        </h2>

        <ul className="flex-1 overflow-y-auto">
          {[...userList]
            .sort((a, b) => {
              if (a.name === username) return -1; // self always first
              if (b.name === username) return 1;
              return 0;
            })
            .map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelectUser(user.id)}
                className={`flex cursor-pointer items-center space-x-3 px-4 py-3 transition-colors
          ${activeUserId === user.id
                    ? "bg-gradient-to-r from-indigo-500/20 via-purple-600/20 to-pink-500/20"
                    : "hover:bg-slate-800/50"}
          ${user.name === username ? "border-l-4 border-indigo-500 bg-slate-800/40" : ""}
        `}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={`h-10 w-10 rounded-full ${user.name === username ? "ring-2 ring-indigo-500" : ""}`}
                />
                <div className="min-w-0">
                  <p
                    className={`truncate font-medium ${user.name === username
                      ? "text-indigo-400 font-bold"
                      : "text-gray-100"
                      }`}
                  >
                    {user.name === username ? `${user.name} (You)` : user.name}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {messagesByUser[user.id]?.slice(-1)[0]?.text ?? "No messages yet"}
                  </p>
                </div>
              </li>
            ))}
        </ul>

      </aside>

      {/* Chat Window */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur-lg">
          <div className="flex items-center">
            {/* Mobile: open sidebar button */}
            <button
              className="mr-3 cursor-pointer rounded-md p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
              aria-label="Open chats"
              aria-controls="mobile-drawer"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h12M4 18h8" />
              </svg>
            </button>

            {activeUser && (
              <>
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="h-10 w-10 rounded-full"
                />
                <span className="ml-3 font-medium max-w-[150px] truncate overflow-hidden whitespace-nowrap">
                  {activeUser.name}
                </span>
              </>
            )}

          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-900 p-4">
          {(messagesByUser[activeUserId] ?? []).map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.25) }}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] break-all wrap-break-word whitespace-pre-wrap rounded-lg px-4 py-2 text-sm shadow-md ${msg.from === "me"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white"
                  : "bg-slate-800 text-gray-200"
                  }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="border-t border-slate-800 bg-slate-900/70 p-3 backdrop-blur-lg"
        >
          <div className="flex items-end gap-3">
            <textarea
              value={currentDraft}
              onChange={(e) => setDraftForUser(activeUserId, e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Type a message…"
              className="max-h-40 min-h-[2.5rem] w-full resize-none rounded-lg bg-slate-800 px-4 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!currentDraft?.trim()}
              className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Press <kbd className="rounded bg-slate-800 px-1">Enter</kbd> to send •{" "}
            <kbd className="rounded bg-slate-800 px-1">Shift</kbd>+
            <kbd className="rounded bg-slate-800 px-1">Enter</kbd> for a new line
          </p>
        </form>
      </main>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div id="mobile-drawer" className="md:hidden">
            {/* scrim */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* drawer */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed inset-y-0 left-0 z-50 flex w-4/5 max-w-xs flex-col border-r border-slate-800 bg-slate-900/95 backdrop-blur-lg"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Chats
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="rounded-md p-2 cursor-pointer text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Close chats"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* <ul className="flex-1 overflow-y-auto">
                {userList.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className={`flex cursor-pointer items-center space-x-3 px-4 py-3 transition-colors ${activeUserId === user.id
                      ? "bg-gradient-to-r from-indigo-500/20 via-purple-600/20 to-pink-500/20"
                      : "hover:bg-slate-800/50"
                      }`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{user.name}</p>
                      <p className="truncate text-xs text-gray-400">
                        {messagesByUser[user.id]?.slice(-1)[0]?.text ?? "No messages yet"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul> */}
              <ul className="flex-1 overflow-y-auto">
                {[...userList]
                  .sort((a, b) => {
                    if (a.name === username) return -1; // self always first
                    if (b.name === username) return 1;
                    return 0;
                  })
                  .map((user) => (
                    <li
                      key={user.id}
                      onClick={() => handleSelectUser(user.id)}
                      className={`flex cursor-pointer items-center space-x-3 px-4 py-3 transition-colors
          ${activeUserId === user.id
                          ? "bg-gradient-to-r from-indigo-500/20 via-purple-600/20 to-pink-500/20"
                          : "hover:bg-slate-800/50"}
          ${user.name === username ? "border-l-4 border-indigo-500 bg-slate-800/40" : ""}
        `}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`h-10 w-10 rounded-full ${user.name === username ? "ring-2 ring-indigo-500" : ""}`}
                      />
                      <div className="min-w-0">
                        <p
                          className={`truncate font-medium ${user.name === username
                            ? "text-indigo-400 font-bold"
                            : "text-gray-100"
                            }`}
                        >
                          {user.name === username ? `${user.name} (You)` : user.name}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                          {messagesByUser[user.id]?.slice(-1)[0]?.text ?? "No messages yet"}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>

            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
