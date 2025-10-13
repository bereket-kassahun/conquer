'use client';

import { Reorder, useAnimationControls } from 'framer-motion';
import CardComponent from './CardComponent';
import type { Card } from '@/lib/types';
import { useEffect } from 'react';

interface PlayerCardProps {
  card: Card;
  index: number;
  numCards: number;
  onCardClick: (card: Card) => void;
  gamePhase: string;
}

const rotationAngle = 9;
const maxArcHeight = 80;

export default function PlayerCard({ card, index, numCards, onCardClick, gamePhase }: PlayerCardProps) {
  const controls = useAnimationControls();

  const rotation = (index - (numCards - 1) / 2) * rotationAngle;
  const centerIndex = (numCards - 1) / 2;
  const distanceFromCenter = Math.abs(index - centerIndex);
  const normalizedDistance = centerIndex > 0 ? distanceFromCenter / centerIndex : 0;
  const y = Math.cos(normalizedDistance * (Math.PI / 2)) * maxArcHeight;

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: -y,
      rotate: rotation,
      zIndex: index,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: gamePhase === 'dealing-cards' ? index * 0.1 : 0,
      },
    });
  }, [controls, gamePhase, index, numCards, rotation, y]);

  return (
    <Reorder.Item
      key={card.id}
      value={card}
      id={card.id}
      drag="x"
      onTap={() => onCardClick(card)}
      className="relative cursor-grab active:cursor-grabbing"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      onHoverStart={() => {
        controls.start({
          y: -y - 40,
          scale: 1.2,
          zIndex: 50,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        });
      }}
      onHoverEnd={() => {
        controls.start({
          y: -y,
          scale: 1,
          zIndex: index,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        });
      }}
    >
      <CardComponent card={card} isFaceUp={true} />
    </Reorder.Item>
  );
}
