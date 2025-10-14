'use client';

import { useGameStore } from '@/hooks/use-game-store';
import OtherPlayerComponent from './OtherPlayer';
import PlayerHand from './PlayerHand';
import Deck from './Deck';
import DiscardPile from './DiscardPile';
import { motion } from 'framer-motion';

export default function GameTable() {
  const { otherPlayers, player } = useGameStore();
  const player2 = otherPlayers.find(p => p.playerNumber === 2);
  const player3 = otherPlayers.find(p => p.playerNumber === 3);

  return (
    <main className="relative h-full w-full">
      {/* The green felt table */}
      <div className="absolute inset-0 bg-primary rounded-md m-0 md:m-4 md:border-8 border-yellow-900/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-primary opacity-40"></div>
      </div>

      {player2 && (
        <div className="absolute top-4 sm:top-1/2 sm:-translate-y-1/2 left-4 z-20">
          <OtherPlayerComponent player={player2} position="left" />
        </div>
      )}

      {player3 && (
        <div className="absolute top-4 sm:top-1/2 sm:-translate-y-1/2 right-4 z-20">
          <OtherPlayerComponent player={player3} position="right" />
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 md:gap-16 z-10">
        <Deck />
        <DiscardPile />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 z-20 pointer-events-none">
        <PlayerHand />
      </div>
    </main>
  );
}
