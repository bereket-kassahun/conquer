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

  const numCards = cards.length;
  const rotationAngle = 7; // Increased for a wider circle
  const maxArcHeight = 50; // Height of the arc

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-end h-48 w-[110%] pointer-events-auto">
      <Reorder.Group
        axis="x"
        values={cards}
        onReorder={handleReorder}
        className="flex items-end p-4 -space-x-7" // Reduced negative space
      >
        {cards.map((card, index) => {
          const rotation = (index - (numCards - 1) / 2) * rotationAngle;

          // Create a convex arc
          const centerIndex = (numCards - 1) / 2;
          const distanceFromCenter = Math.abs(index - centerIndex);
          const normalizedDistance = centerIndex > 0 ? distanceFromCenter / centerIndex : 0;
          const y = Math.cos(normalizedDistance * (Math.PI / 2)) * maxArcHeight;

          return (
            <Reorder.Item
              key={card.id}
              value={card}
              id={card.id}
              drag="x"
              onTap={() => onCardClick(card)}
              className="relative cursor-grab active:cursor-grabbing"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: -y, // Apply the arc height as a negative translation
                rotate: rotation,
                zIndex: index,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  delay: gamePhase === 'dealing-cards' ? index * 0.1 : 0,
                },
              }}
              whileHover={{
                y: -y - 20,
                scale: 1.05,
                rotate: rotation, // Keep rotation on hover
                zIndex: 50,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <CardComponent card={card} isFaceUp={true} />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}
