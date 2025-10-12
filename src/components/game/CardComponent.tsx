'use client';

import React from 'react';
import type { Card, Suit } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion, Reorder } from 'framer-motion';

interface CardProps {
  card: Card;
  isFaceUp: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const suitSymbols: Record<Suit, string> = {
  Hearts: '♥',
  Diamonds: '♦',
  Clubs: '♣',
  Spades: '♠',
  Joker: '🃏',
};

const suitColors: Record<Suit, string> = {
  Hearts: 'text-red-500',
  Diamonds: 'text-red-500',
  Clubs: 'text-black',
  Spades: 'text-black',
  Joker: 'text-black',
};

const CardComponent = React.forwardRef<HTMLLIElement, CardProps>(({ card, isFaceUp, className, style }, ref) => {
  const CardFace = () => (
    <div className="relative w-full h-full p-1 flex flex-col justify-between">
      <div className="flex flex-col items-start">
        <span className="font-bold text-lg leading-none">{card.rank === 'Joker' ? 'J' : card.rank[0]}</span>
        <span className={`text-lg leading-none ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</span>
      </div>
      <div className={`self-center text-3xl ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</div>
      <div className="flex flex-col items-end rotate-180">
        <span className="font-bold text-lg leading-none">{card.rank === 'Joker' ? 'J' : card.rank[0]}</span>
        <span className={`text-lg leading-none ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</span>
      </div>
    </div>
  );

  const CardBack = () => (
    <div className="w-full h-full bg-blue-800 border-2 border-blue-400 rounded-md flex items-center justify-center">
      <div className="w-3/4 h-3/4 border-2 border-dashed border-blue-400 rounded-sm"></div>
    </div>
  );

  return (
    <Reorder.Item
      ref={ref}
      value={card}
      id={card.id}
      style={style}
      className={cn(
        'w-16 h-24 md:w-20 md:h-28 bg-white rounded-md shadow-lg border border-gray-300 select-none cursor-grab active:cursor-grabbing',
        className
      )}
      dragListener={true}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={{ rotateY: isFaceUp ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <CardFace />
        </div>
        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <CardBack />
        </div>
      </motion.div>
    </Reorder.Item>
  );
});

CardComponent.displayName = 'CardComponent';
export default CardComponent;
