"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const bracketData = {
  quarterfinals: [
    { id: 'q1', top: { name: 'CYBER_WOLVES', score: 2, winner: true }, bottom: { name: 'VOID_WALKERS', score: 0, winner: false } },
    { id: 'q2', top: { name: 'NEON_SYNDICATE', score: 1, winner: false }, bottom: { name: 'QUANTUM_GHOSTS', score: 2, winner: true } },
    { id: 'q3', top: { name: 'RED_PHALANX', score: 2, winner: true }, bottom: { name: 'STEEL_TITANS', score: 1, winner: false } },
    { id: 'q4', top: { name: 'APEX_PREDATORS', score: 0, winner: false }, bottom: { name: 'CHRONO_LEGION', score: 2, winner: true } },
  ],
  semifinals: [
    { id: 's1', top: { name: 'CYBER_WOLVES', score: 2, winner: true }, bottom: { name: 'QUANTUM_GHOSTS', score: 1, winner: false } },
    { id: 's2', top: { name: 'RED_PHALANX', score: 0, winner: false }, bottom: { name: 'CHRONO_LEGION', score: 2, winner: true } },
  ],
  finals: [
    { id: 'f1', top: { name: 'CYBER_WOLVES', score: 3, winner: true }, bottom: { name: 'CHRONO_LEGION', score: 2, winner: false } },
  ]
};

// eslint-disable-next-line
const MatchNode = ({ match, index }: { match: any, index: number }) => {
  return (
    <div className="targetable relative w-64 border border-white/10 bg-black/50 backdrop-blur-md font-mono text-sm uppercase -skew-x-12 hover:border-electric-crimson transition-colors group cursor-none">
      <div className="skew-x-12">
        {/* Top Team */}
        <div className={`p-3 border-b border-white/5 flex justify-between items-center ${match.top.winner ? 'text-neon-green text-shadow-neon' : 'text-white/30'}`}>
          <span className="truncate pr-2 font-bold">{match.top.name}</span>
          <span className="bg-white/5 px-2 py-1">{match.top.score}</span>
        </div>
        {/* Bottom Team */}
        <div className={`p-3 flex justify-between items-center ${match.bottom.winner ? 'text-neon-green text-shadow-neon' : 'text-white/30'}`}>
          <span className="truncate pr-2 font-bold">{match.bottom.name}</span>
          <span className="bg-white/5 px-2 py-1">{match.bottom.score}</span>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/20 group-hover:bg-electric-crimson transition-colors" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/20 group-hover:bg-electric-crimson transition-colors" />
    </div>
  );
};

export default function LiveBracket() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden border-b border-white/5">
      <div className="px-6 mb-12">
        <h2 className="text-4xl font-space-grotesk font-bold uppercase tracking-widest text-white">
          <span className="text-neon-green mr-2">//</span> ACTIVE ENGAGEMENT GRID
        </h2>
      </div>

      <div className="relative w-full overflow-x-auto overflow-y-hidden hide-scrollbar pb-10 px-6 cursor-none">
        <motion.div
          style={{ x: xOffset }}
          className="flex gap-32 items-center min-w-max relative"
        >
          {/* Quarterfinals */}
          <div className="flex flex-col gap-12 relative z-10">
            {bracketData.quarterfinals.map((match, i) => (
              <MatchNode key={match.id} match={match} index={i} />
            ))}
          </div>

          {/* Connectors Q to S */}
          <svg className="absolute left-[256px] top-0 w-32 h-full pointer-events-none z-0" style={{ strokeWidth: 2 }}>
            <path d="M 0,60 L 64,60 L 64,130 L 128,130" fill="none" stroke={bracketData.quarterfinals[0].top.winner || bracketData.quarterfinals[0].bottom.winner ? "#00FF00" : "rgba(255,255,255,0.1)"} className={bracketData.quarterfinals[0].top.winner || bracketData.quarterfinals[0].bottom.winner ? "filter drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]" : ""} />
            <path d="M 0,200 L 64,200 L 64,130 L 128,130" fill="none" stroke={bracketData.quarterfinals[1].top.winner || bracketData.quarterfinals[1].bottom.winner ? "#00FF00" : "rgba(255,255,255,0.1)"} />

            <path d="M 0,340 L 64,340 L 64,410 L 128,410" fill="none" stroke={bracketData.quarterfinals[2].top.winner || bracketData.quarterfinals[2].bottom.winner ? "#00FF00" : "rgba(255,255,255,0.1)"} />
            <path d="M 0,480 L 64,480 L 64,410 L 128,410" fill="none" stroke={bracketData.quarterfinals[3].top.winner || bracketData.quarterfinals[3].bottom.winner ? "#00FF00" : "rgba(255,255,255,0.1)"} />
          </svg>

          {/* Semifinals */}
          <div className="flex flex-col gap-40 relative z-10">
            {bracketData.semifinals.map((match, i) => (
              <MatchNode key={match.id} match={match} index={i} />
            ))}
          </div>

          {/* Connectors S to F */}
          <svg className="absolute left-[640px] top-0 w-32 h-full pointer-events-none z-0" style={{ strokeWidth: 2 }}>
             <path d="M 0,130 L 64,130 L 64,270 L 128,270" fill="none" stroke={bracketData.semifinals[0].top.winner || bracketData.semifinals[0].bottom.winner ? "#00FF00" : "rgba(255,255,255,0.1)"} className="filter drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
             <path d="M 0,410 L 64,410 L 64,270 L 128,270" fill="none" stroke={bracketData.semifinals[1].top.winner || bracketData.semifinals[1].bottom.winner ? "#00FF00" : "rgba(255,255,255,0.1)"} />
          </svg>

          {/* Finals */}
          <div className="flex flex-col gap-8 relative z-10 scale-110 origin-left">
             <div className="absolute -inset-4 bg-neon-green/5 blur-xl rounded-full" />
            {bracketData.finals.map((match, i) => (
              <MatchNode key={match.id} match={match} index={i} />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
