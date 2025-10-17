'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/hooks/use-game-store';
import GameTable from '@/components/game/GameTable';
import Lobby from '@/components/lobby/Lobby';
import { Loader } from 'lucide-react';

export default function GamePage() {
  const { gamePhase } = useGameStore();
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

  if (gamePhase === 'lobby') {
    return <Lobby />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <GameTable />
    </div>
  );
}
