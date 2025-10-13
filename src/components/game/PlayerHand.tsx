'use client';

import { useGameStore } from '@/hooks/use-game-store';
import CardComponent from './CardComponent';
import { Reorder } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import type { Card } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function PlayerHand() {
  const { player, setPlayerCards, gamePhase, finishDealingAnimation, discardCard, drawnCard, turn } = useGameStore();
  const { toast } = useToast();

  // 1. & 2. A local state is re-introduced and kept in sync with the global state.
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

  // 3. The handler updates the local state first, then the global state.
  const handleReorder = (newOrder: Card[]) => {
    setCards(newOrder);
    setPlayerCards(newOrder);
  };

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-end h-48 w-full pointer-events-auto">
      <Reorder.Group
        axis="x"
        values={cards} // The component is now bound to the local, synced state
        onReorder={handleReorder} // The handler performs the two-step update
        className="flex items-end p-4 space-x-2"
      >
        {cards.map((card, index) => (
          <Reorder.Item
            key={card.id} // The key is critical for React to track the items
            value={card}
            id={card.id}
            drag="x"
            onTap={() => onCardClick(card)}
            className="relative cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              zIndex: index,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: gamePhase === 'dealing-cards' ? index * 0.1 : 0,
              },
            }}
            whileHover={{
              y: -20,
              scale: 1.05,
              zIndex: 50,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
          >
            <CardComponent card={card} isFaceUp={true} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
