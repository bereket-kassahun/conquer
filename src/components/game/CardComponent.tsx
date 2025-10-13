'use client';

import React from 'react';
import type { Card, Suit } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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

const CardComponent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ card, isFaceUp, className, style }, ref) => {
    const rankDisplay = card.rank === '10' ? '10' : card.rank[0];

    const CardFace = () => (
      <div className="relative w-full h-full">
        {/* Top-left corner */}
        <div className="absolute top-1 left-1.5 flex flex-col items-center leading-none">
          <span className={`font-bold text-lg ${suitColors[card.suit]}`}>{card.rank === 'Joker' ? 'J' : rankDisplay}</span>
          <span className={`text-base ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</span>
        </div>

        {/* Center suit */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-5xl ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</span>
        </div>

        {/* Bottom-right corner (inverted) */}
        <div
          className="absolute bottom-1 right-1.5 flex flex-col items-center leading-none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <span className={`font-bold text-lg ${suitColors[card.suit]}`}>{card.rank === 'Joker' ? 'J' : rankDisplay}</span>
          <span className={`text-base ${suitColors[card.suit]}`}>{suitSymbols[card.suit]}</span>
        </div>
      </div>
    );

    const CardBack = () => (
      <div className="w-full h-full bg-blue-800 border-2 border-blue-400 rounded-lg flex items-center justify-center">
        <div className="w-3/4 h-3/4 border-2 border-dashed border-blue-400 rounded-md"></div>
      </div>
    );

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'w-16 h-24 bg-white rounded-lg shadow-lg border border-gray-300 select-none cursor-grab active:cursor-grabbing',
          className
        )}
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
      </div>
    );
  }
);

CardComponent.displayName = 'CardComponent';
export default CardComponent;
