"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const players = [
  { id: 'p1', name: 'N0VA', role: 'FRAGGER', kd: 2.4, wr: 68, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2800' },
  { id: 'p2', name: 'ECHO', role: 'SUPPORT', kd: 1.8, wr: 72, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2800' },
  { id: 'p3', name: 'V0ID', role: 'IGL', kd: 1.5, wr: 75, img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2800' },
  { id: 'p4', name: 'JINX', role: 'LURKER', kd: 2.1, wr: 65, img: 'https://images.unsplash.com/photo-1563823297621-e0c242efaf9c?auto=format&fit=crop&q=80&w=2800' },
];

const StatTicker = ({ value, isPercent = false, decimals = 0 }: { value: number, isPercent?: boolean, decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 1500; // 1.5s

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);

        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setDisplayValue(value * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-white font-bold">
      {displayValue.toFixed(decimals)}{isPercent ? '%' : ''}
    </span>
  );
};

export default function PlayerRoster() {
  return (
    <section className="py-24 px-6 relative border-b border-white/5 bg-[#050505]">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-space-grotesk font-bold uppercase tracking-widest text-white inline-block relative">
          <span className="text-electric-crimson mr-2">//</span> COMBATANT TELEMETRY
          <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {players.map((player, idx) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="targetable group relative h-96 -skew-x-6 overflow-hidden bg-black border border-white/10 hover:border-neon-green transition-colors cursor-none"
          >
            {/* Background Image */}
            <div className="absolute inset-0 skew-x-6 scale-110">
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors z-10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20" />
              <Image src={player.img} alt={player.name} fill className="object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
            </div>

            {/* Content */}
            <div className="relative z-30 h-full p-6 flex flex-col justify-end skew-x-6">
              <div className="text-xs font-mono text-neon-green mb-2 tracking-widest">
                [ROLE: {player.role}]
              </div>
              <h3 className="text-4xl font-space-grotesk font-bold text-white mb-4 uppercase tracking-tighter">
                {player.name}
              </h3>

              <div className="flex gap-4 font-mono text-sm border-t border-white/10 pt-4">
                <div className="flex flex-col">
                  <span className="text-white/40 mb-1">K/D RATIO</span>
                  <StatTicker value={player.kd} decimals={2} />
                </div>
                <div className="w-[1px] bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-white/40 mb-1">WIN RATE</span>
                  <StatTicker value={player.wr} isPercent={true} />
                </div>
              </div>
            </div>

            {/* Hover Glitch Overlay */}
            <div className="absolute inset-0 bg-neon-green mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity z-40 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
