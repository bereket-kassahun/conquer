'use client';

import { useGameStore } from '@/hooks/use-game-store';
import { Reorder } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import type { Card } from '@/lib/types';
import { useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';

export default function PlayerHand() {
  const { player, setPlayerCards, gamePhase, finishDealingAnimation, discardCard, drawnCard } = useGameStore();
  const { toast } = useToast();

  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    setCards(player?.cards ?? []);
  }, [player?.cards]);

  useEffect(() => {
    if (gamePhase === 'dealing-cards' && player) {
      setTimeout(() => {
        finishDealingAnimation();
      }, player.cards.length * 100 + 500);
    }
  }, [gamePhase, finishDealingAnimation, player]);

  const onCardClick = (card: Card) => {
    discardCard(card);
  };

  const handleReorder = (newOrder: Card[]) => {
    setCards(newOrder);
    setPlayerCards(newOrder);
  };

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-end h-80 w-[260%] pointer-events-auto">
      <Reorder.Group
        axis="x"
        values={cards}
        onReorder={handleReorder}
        className="flex items-end p-4 -space-x-8"
      >
        {cards.map((card, index) => (
          <PlayerCard
            key={card.id}
            card={card}
            index={index}
            numCards={cards.length}
            onCardClick={onCardClick}
            gamePhase={gamePhase}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}
