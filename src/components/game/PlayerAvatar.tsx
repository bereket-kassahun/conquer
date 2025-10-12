import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  player: { fullName: string; playerNumber: number };
  isTurn?: boolean;
}

export default function PlayerAvatar({ player, isTurn }: PlayerAvatarProps) {
  const avatarImage = PlaceHolderImages.find(img => img.id === `player-avatar-${player.playerNumber}`);

  return (
    <div className={cn("relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-transparent shadow-lg", isTurn && 'border-accent animate-pulse')}>
      {avatarImage && (
        <Image
          src={avatarImage.imageUrl}
          alt={player.fullName}
          data-ai-hint={avatarImage.imageHint}
          fill
          className="object-cover"
        />
      )}
       <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
}
