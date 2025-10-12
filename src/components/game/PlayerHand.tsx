'use client';
import { useGameStore } from '@/hooks/use-game-store';
import CardComponent from './CardComponent';
import { AnimatePresence, Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Card } from '@/lib/types';

export default function PlayerHand() {
  const { player, setPlayerCards, gamePhase, finishDealingAnimation, discardCard, drawnCard, turn } = useGameStore();
  const [cards, setCards] = useState<Card[]>(player?.cards ?? []);
  const { toast } = useToast();

  useEffect(() => {
    setCards(player?.cards ?? []);
  }, [player?.cards]);

  useEffect(() => {
    if (gamePhase === 'dealing-cards' && player) {
      setTimeout(() => {
        finishDealingAnimation();
      }, player.cards.length * 100 + 500); // Wait for stagger animation to finish
    }
  }, [gamePhase, finishDealingAnimation, player]);

  const onCardClick = (card: any) => {
    if (drawnCard && player?.playerNumber === turn) {
        discardCard(card);
    } else if (player?.playerNumber === turn && !drawnCard) {
        toast({
            title: "Draw a card first!",
            description: "You must draw a card from the deck or discard pile before discarding.",
            variant: "destructive"
        })
    }
  }

  const numCards = cards.length;
  const arc = 120; // The total angle of the fan
  const radius = 15 * numCards; // The radius of the fan's arc

  return (
    // 1. Adjusted container position to be flush with the bottom
    <div className="absolute bottom-[-60px] sm:bottom-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] sm:w-[800px] sm:h-[400px] pointer-events-auto">
        <Reorder.Group
            axis="x"
            values={cards}
            onReorder={(newOrder) => {
              setCards(newOrder);
              setPlayerCards(newOrder);
            }}
            className="relative w-full h-full"
        >
        <AnimatePresence>
          {gamePhase !== 'loading' && cards.map((card, index) => {
            const anglePerCard = numCards > 1 ? arc / (numCards - 1) : 0;
            const cardAngle = (index - (numCards - 1) / 2) * anglePerCard;
            return (
                <Reorder.Item
                    key={card.id}
                    value={card}
                    id={card.id}
                    onTap={() => onCardClick(card)}
                    className="absolute left-1/2 -translate-x-1/2 bottom-0"
                    style={{
                        transformOrigin: 'bottom center',
                    }}
                    initial={ gamePhase === 'dealing-cards' ? { opacity: 0, y: -200, rotate: 0 } : false }
                    animate={{
                        opacity: 1,
                        // 2. Uses the smaller radius for a more compact fan
                        transform: `rotate(${cardAngle}deg) translateY(-${radius}px)`,
                        transition: { type: 'spring', stiffness: 300, damping: 30, delay: gamePhase === 'dealing-cards' ? index * 0.1 : 0 },
                    }}
                    whileHover={{
                        // 3. Refined hover effect to match the new radius
                        transform: `rotate(${cardAngle}deg) translateY(-${radius + 40}px) scale(1.1)`,
                        zIndex: 50,
                        transition: { type: 'spring', stiffness: 300, damping: 20 },
                    }}
                    dragListener={true}
                >
                    <CardComponent card={card} isFaceUp={true} />
                </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
