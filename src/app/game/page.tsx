'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/hooks/use-game-store';
import GameTable from '@/components/game/GameTable';
import { AnimatePresence, motion } from 'framer-motion';
import CardComponent from '@/components/game/CardComponent';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export default function GamePage() {
  const { initGame, gamePhase, player } = useGameStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  if (gamePhase === 'loading' && isClient) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-background">
        <h1 className="text-3xl font-bold text-primary-foreground">Waiting for game to start...</h1>
        <Button onClick={initGame} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <GameTable />
    </div>
  );
}
