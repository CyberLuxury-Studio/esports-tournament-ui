"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const MOCK_MESSAGES = [
  "N0VA is absolutely dominating mid",
  "insane flick wtf",
  "gg go next",
  "can we talk about that rotation though?",
  "JINX flank incoming...",
  "LMAO they didn't even see him",
  "1v3 clutch pausechamp",
  "V0ID IGL diff",
  "nt nt",
  "ECHO needs to drop weapon",
];

export default function StreamFeed() {
  const [messages, setMessages] = useState<{ id: number; text: string; user: string }[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let msgId = 0;
    const interval = setInterval(() => {
      const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      const randomUser = `USR_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;

      setMessages(prev => {
        const newMsgs = [...prev, { id: msgId++, text: randomMsg, user: randomUser }];
        return newMsgs.slice(-15); // Keep last 15 messages
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="py-24 px-6 relative bg-black">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <h2 className="text-4xl font-space-grotesk font-bold uppercase tracking-widest text-white">
            <span className="text-neon-green mr-2">//</span> LIVE TRANSMISSION
          </h2>
          <div className="flex items-center gap-2 font-mono text-electric-crimson text-sm border border-electric-crimson/30 px-3 py-1 bg-electric-crimson/5 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-electric-crimson" />
            REC
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
          {/* 70% Video Player */}
          <div className="targetable flex-grow lg:w-[70%] relative border border-white/10 bg-[#0a0a0a] group cursor-none overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-green group-hover:scale-110 transition-all">
                <Play className="w-8 h-8 text-white/50 group-hover:text-neon-green ml-2" />
              </div>
            </div>

            {/* Mock HUD Overlay */}
            <div className="absolute top-4 left-4 font-mono text-xs text-white/50">CAM_01 // MAIN_FEED</div>
            <div className="absolute top-4 right-4 font-mono text-xs text-neon-green">FPS: 144</div>
            <div className="absolute bottom-4 left-4 font-mono text-xs text-white/50">10:42:09:11</div>

            {/* Scanline specifically for player */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,transparent_50%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.5))] bg-[length:100%_4px] opacity-20 pointer-events-none" />
          </div>

          {/* 30% Terminal Chat */}
          <div className="lg:w-[30%] border border-white/10 bg-[#050505] flex flex-col font-mono text-sm relative">
            <div className="p-4 border-b border-white/10 text-white/50 text-xs">
              TERMINAL_UPLINK ESTABLISHED
            </div>

            <div
              ref={chatRef}
              className="flex-grow overflow-y-auto p-4 space-y-2 hide-scrollbar scroll-smooth"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="break-words"
                  >
                    <span className="text-white/40">[{msg.user}]</span>{' '}
                    <span className="text-white/80">{msg.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-white/10 bg-black">
              <div className="flex items-center gap-2 text-white/30">
                <span className="text-neon-green">{'>'}</span>
                <span>ENTER_COMMAND...</span>
                <span className="w-2 h-4 bg-neon-green animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
