'use client';

import { useGameStore } from '@/hooks/use-game-store';
import { Reorder } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import type { Card } from '@/lib/types';
import { useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';

export default function PlayerHand() {
  const { player, setPlayerCards, gamePhase, finishDealingAnimation, discardCard, drawnCard, turn } = useGameStore();
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
    if (drawnCard && player?.playerNumber === turn) {
      discardCard(card);
    } else if (player?.playerNumber === turn && !drawnCard) {
      toast({
        title: "Draw a card first!",
        description: "You must draw a card from the deck or discard pile before discarding.",
        variant: "destructive",
      });
    }
  };

  const handleReorder = (newOrder: Card[]) => {
    setCards(newOrder);
    setPlayerCards(newOrder);
  };

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-end h-72 w-[200%] pointer-events-auto">
      <Reorder.Group
        axis="x"
        values={cards}
        onReorder={handleReorder}
        className="flex items-end p-4 -space-x-12" // Adjusted for the new size
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
