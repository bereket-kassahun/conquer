'use client';

import { useGameStore } from '@/hooks/use-game-store';
import { socket } from '@/lib/socket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Player } from '@/lib/types';

export default function Lobby() {
  const { roomCode, players, setRoom, setPlayers, setGamePhase, setPlayer, initGame, player, deck, setJoker } = useGameStore();
  const [joiningRoomCode, setJoiningRoomCode] = useState('');

  useEffect(() => {
    socket.on('room-created', ({ roomCode, players, }) => {
      setRoom(roomCode, players);
      const currentPlayer = players.find((p: Player) => p.id === socket.id);
      if (currentPlayer) {
        setPlayer(currentPlayer.playerNumber);
      }
    });

    socket.on('player-joined', (players) => {
      setPlayers(players);
      const currentPlayer = players.find((p: Player) => p.id === socket.id);
      if (currentPlayer) {
        setPlayer(currentPlayer.playerNumber);
      }
      console.log('players', players)
    });

    socket.on('player1', ({ player, remainingCards, joker }) => {
      if(player && remainingCards){
        initGame(player, remainingCards);
        setJoker(joker);
        setGamePhase('dealing-cards');
      }
    });
    socket.on('player2', ({ player, remainingCards, joker }) => {
      if(player && remainingCards){
        initGame(player, remainingCards);
        setJoker(joker);
        setGamePhase('dealing-cards');
      }
    });
    socket.on('player3', ({ player, remainingCards, joker }) => {
      if(player && remainingCards){
        initGame(player, remainingCards);
        setJoker(joker);
        setGamePhase('dealing-cards');
      }
    });
    
    // socket.on('game-started', () => {
    //   setGamePhase('dealing-cards');
    // });

    socket.on('player-left', (players) => {
      setPlayers(players);
    });

    return () => {
      socket.off('room-created');
      socket.off('player-joined');
      socket.off('game-started');
      socket.off('player-left');
      socket.off('player1');
      socket.off('player2');
      socket.off('player3');
    };
  }, [setRoom, setPlayers, setGamePhase, setPlayer]);

  
  const createRoom = () => {
    socket.emit('create-room');
  };

  const joinRoom = () => {
    socket.emit('join-room', joiningRoomCode);
    setRoom(joiningRoomCode, players);
  };

  const startGame = () => {
    socket.emit('start-game', roomCode);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-background">
      <h1 className="text-3xl font-bold text-primary-foreground">Lobby</h1>
      {roomCode ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl">Room Code: {roomCode}</p>
          <p className="text-lg">Players:</p>
          <ul>
            {players.map((player) => (
              <li key={player.id}>Player {player.playerNumber}</li>
            ))}
          </ul>
          {players.length >= 2 && players.find(p => p.id === socket.id)?.playerNumber === 1 && (
            <Button onClick={startGame} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Start Game
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <Button onClick={createRoom} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Create Room
          </Button>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter room code"
              value={joiningRoomCode}
              onChange={(e) => setJoiningRoomCode(e.target.value)}
            />
            <Button onClick={joinRoom} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Join Room
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
