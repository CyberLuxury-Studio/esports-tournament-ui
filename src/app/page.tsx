import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LiveBracket from '@/components/LiveBracket';
import PlayerRoster from '@/components/PlayerRoster';
import StreamFeed from '@/components/StreamFeed';
import Footer from '@/components/Footer';

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
