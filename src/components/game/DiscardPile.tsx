'use client';
import { useGameStore } from '@/hooks/use-game-store';
import { motion } from 'framer-motion';
import CardComponent from './CardComponent';
import { useEffect, useState } from 'react';

// This is not ideal as it will be different for each client, 
// for a real app, this should be stored with the card state.
const useRandomRotation = () => {
    const [rotation, setRotation] = useState(0);
    useEffect(() => {
        setRotation(Math.random() * 50 - 25);
    }, []);
    return rotation;
}

const PileCard = ({card, index}: {card: any, index: number}) => {
    const rotation = useRandomRotation();
    return (
        <motion.div
          key={card.id}
          className="absolute top-0 left-0"
          style={{ zIndex: index }}
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: rotation, transition: { delay: 0.1 } }}
        >
          <CardComponent card={card} isFaceUp={true} />
        </motion.div>
    )
}

export default function DiscardPile() {
  const { discardPile, drawFromDiscard, player, drawnCard } = useGameStore();
  const canDraw = true;
  
  return (
    <div className="relative w-20 h-28 md:w-24 md:h-32" onClick={canDraw ? drawFromDiscard : undefined}>
      <p className="text-center text-sm font-bold text-primary-foreground/70 mb-2">Discard</p>
        <div className="w-full h-full">
          {discardPile.map((card, index) => (
            <PileCard card={card} index={index} key={card.id}/>
          ))}
        </div>
    </div>
  );
}
