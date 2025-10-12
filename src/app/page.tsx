import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-background to-primary/50 p-4">
      <div className="text-center space-y-6">
        <div className="inline-block p-4 bg-accent/20 rounded-full">
          <Crown className="w-16 h-16 text-accent" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tighter">
          Conquer Online
        </h1>
        <p className="max-w-md mx-auto text-lg text-primary-foreground/80">
          The ultimate online card game experience. Create a room, invite your friends, and conquer the table.
        </p>
        <Link href="/game" passHref>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold py-8 px-12 rounded-full shadow-lg transition-transform hover:scale-105">
            Play Game
          </Button>
        </Link>
      </div>
    </main>
  );
}
