'use client';
import { useGameStore } from '@/hooks/use-game-store';
import { motion } from 'framer-motion';
import CardComponent from './CardComponent';
import { Card } from '@/lib/types';

export default function Deck() {
  const { deck, drawFromDeck, player, drawnCard, joker } = useGameStore();

  const canDraw = true;

  return (
    <div className="relative w-20 h-28 md:w-24 md:h-32" onClick={canDraw ? drawFromDeck : undefined}>
      <p className="text-center text-sm font-bold text-primary-foreground/70 mb-2">Deck ({deck.length})</p>
      {
        joker && (
          <div className="absolute top-1/4  -translate-x-1/2 -translate-y-1/2 z-0"
            style={{
              transform: 'translate(70%, -50%) rotate(90deg) translateX(50%)', // Rotate and shift to show half
              transformOrigin: 'center center',
            }}
          >
            <CardComponent card={joker} isFaceUp={true} className="w-16 h-24 md:w-20 md:h-28" />
          </div>
        )
      }

      {deck.map((_, index) => (
        <motion.div
          key={index}
          className="absolute top-0 left-0 w-full h-full bg-blue-800 border-2 border-blue-400 rounded-lg cursor-pointer"
          style={{
            // transform: `translateY(${index * -1}px) translateX(${index * -1}px)`,
            zIndex: index,
          }}
          whileHover={canDraw ? { scale: 1.05, y: -10, x: -5 } : {}}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-2 border-dashed border-blue-400 rounded-sm"></div>
          </div>
        </motion.div>
      ))}
      {deck.length === 0 && (
        <div className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-white/20 rounded-lg"></div>
      )}
    </div>
  );
}
