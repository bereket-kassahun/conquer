'use client';

import type { OtherPlayer } from '@/lib/types';
import PlayerAvatar from './PlayerAvatar';
import { CardIcon, User } from 'lucide-react';

interface OtherPlayerProps {
  player: OtherPlayer;
  position: 'left' | 'right';
}

export default function OtherPlayerComponent({ player, position }: OtherPlayerProps) {
    const isTurn = player.isCurrentTurn;
  return (
    <div className="flex flex-col items-center space-y-2">
      <PlayerAvatar player={player} isTurn={isTurn}/>
      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        {player.fullName}
      </div>
      <div className="flex items-center space-x-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
        <CardIcon className="w-4 h-4" />
        <span>{player.cardCount}</span>
      </div>
    </div>
  );
}
