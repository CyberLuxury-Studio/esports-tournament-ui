"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldAlert, Zap } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ArenaCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Tie rotation speed to scroll velocity
  const { scrollY } = useScroll();
  const rotationSpeed = useTransform(scrollY, [0, 1000], [0.005, 0.05]);
  const currentSpeed = useSpring(rotationSpeed, { stiffness: 50, damping: 20 });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += currentSpeed.get();
      meshRef.current.rotation.x += currentSpeed.get() * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={2.5}>
      <meshBasicMaterial
        color="#00FF00"
        wireframe={true}
        transparent={true}
        opacity={0.3}
      />
    </Sphere>
  );
}

export default function Hero() {
  const glitchVariants = {
    hidden: { opacity: 0, x: -20 },
    glitch: {
      opacity: 1,
      x: [0, -5, 5, -2, 2, 0],
      y: [0, 2, -2, 1, -1, 0],
      textShadow: [
        "2px 0 #FF003C, -2px 0 #00FF00",
        "-2px 0 #FF003C, 2px 0 #00FF00",
        "2px 0 #FF003C, -2px 0 #00FF00",
        "0px 0 #000, 0px 0 #000",
      ],
      transition: { duration: 0.5, ease: "easeInOut" as const }
    },
    pristine: {
      opacity: 1,
      x: 0,
      y: 0,
      textShadow: "0px 0 #000, 0px 0 #000",
    }
  };

  return (
    <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden min-h-[90vh] flex flex-col justify-center border-b border-white/5">

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <ArenaCore />
        </Canvas>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green rounded-full mix-blend-screen filter blur-[250px] opacity-10 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1 border border-neon-green/30 text-neon-green font-mono text-xs uppercase tracking-widest mx-auto mb-8 bg-neon-green/5 shadow-[0_0_15px_rgba(0,255,0,0.1)] relative z-10"
      >
        <ShieldAlert className="w-4 h-4" /> BROADCAST_STATUS: LIVE
      </motion.div>
      
      <motion.h1 
        initial="hidden"
        animate={["glitch", "pristine"]}
        variants={glitchVariants}
        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 font-space-grotesk uppercase relative z-10 leading-none mix-blend-difference"
      >
        GLOBAL TOURNAMENT <br/><span className="text-white">PROTOCOL.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto relative z-10 font-mono tracking-wide"
      >
        [ENGAGING CYBER-LUXURY COMMAND CENTER] OVERRIDING PROTOCOLS. STAND BY FOR LIVE MATCH TELEMETRY.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex gap-6 justify-center relative z-10"
      >
        <button
          className="targetable flex items-center gap-3 px-10 py-5 bg-neon-green text-black font-space-grotesk font-bold uppercase tracking-widest text-lg hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all -skew-x-12"
        >
          <span className="skew-x-12 flex items-center gap-3"><Zap className="w-5 h-5" /> ENTER ARENA</span>
        </button>
      </motion.div>
    </section>
  );
}
