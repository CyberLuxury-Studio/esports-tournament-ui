import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const LiveBracket = dynamic(() => import('@/components/LiveBracket'));
const PlayerRoster = dynamic(() => import('@/components/PlayerRoster'));
const StreamFeed = dynamic(() => import('@/components/StreamFeed'));

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-inter selection:bg-neon-green selection:text-black">
      <Navbar />
      <Hero />
      <LiveBracket />
      <PlayerRoster />
      <StreamFeed />
      <Footer />
    </main>
  );
}
