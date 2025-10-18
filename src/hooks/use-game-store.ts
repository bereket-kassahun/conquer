'use client';

import { create } from 'zustand';
import type { Player, Card, OtherPlayer } from '@/lib/types';
import { mockOtherPlayers } from '@/lib/mock-data';
import { socket } from '@/lib/socket';

type GamePhase = 'lobby' | 'dealing-cards' | 'playing' | 'waiting';

interface GameState {
  player: Player | null;
  otherPlayers: OtherPlayer[];
  deck: Card[];
  discardPile: Card[];
  gamePhase: GamePhase;
  drawnCard: boolean;
  turn: number;
  roomCode: string | null;
  players: { id: string; playerNumber: number }[];
  joker: Card | null,

  // Actions
  setRoom: (roomCode: string, players: { id: string; playerNumber: number }[]) => void;
  setPlayers: (players: { id: string; playerNumber: number }[]) => void;
  setPlayer: (playerNumber: number) => void;
  setGamePhase: (phase: GamePhase) => void;
  initGame: (player: Player, remainingCards: Card[]) => void;
  finishDealingAnimation: () => void;
  drawFromDeck: () => void;
  drawFromDiscard: () => void;
  discardCard: (card: Card) => void;
  setPlayerCards: (cards: Card[]) => void;
  setTurn: (turn: number) => void;
  setDeck: (cards: Card[]) => void;
  setDiscardPile: (cards: Card[]) => void;
  setJoker: (joker: Card) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  player: null,
  otherPlayers: [],
  deck: [],
  discardPile: [],
  gamePhase: 'lobby',
  drawnCard: false,
  turn: 1,
  roomCode: null,
  players: [],
  joker: null,


  setJoker: (joker: Card) => {
    set({ joker })
  },

  setTurn: (turn: number) => {
    set({ turn });
  },

  setRoom: (roomCode, players) => {
    set({ roomCode, players, gamePhase: 'lobby' });
  },

  setPlayers: (players) => {
    set({ players });
  },

  setPlayer: (playerNumber) => {
    set(state => ({ player: { ...state.player, playerNumber } as Player }));
  },

  setGamePhase: (phase) => {
    set({ gamePhase: phase });
  },

  initGame: (player: Player, remainingCards: Card[]) => {
    set({
      player: player,
      otherPlayers: mockOtherPlayers,
      deck: remainingCards,
      discardPile: [],
      gamePhase: 'dealing-cards',
      drawnCard: false,
      turn: 1,
    });
  },

  setDeck: (cards: Card[]) => {
    set({ deck: cards });
  },

  setDiscardPile: (cards: Card[]) => {
    set({ discardPile: cards });
  },

  setOtherPlayers: (players: OtherPlayer[]) => {
    set({ otherPlayers: players });
  },

  finishDealingAnimation: () => {
    set({ gamePhase: 'playing' });
  },

  drawFromDeck: () => {
    set(state => {
      if (!state.player || state.drawnCard || state.turn !== state.player.playerNumber) return {};

      const newDeck = [...state.deck];
      const drawnCardFromDeck = newDeck.pop();

      if (drawnCardFromDeck) {
        const newPlayerCards = [...state.player.cards, drawnCardFromDeck];
        return {
          deck: newDeck,
          player: { ...state.player, cards: newPlayerCards },
          drawnCard: true,
        };
      }
      return {};
    });
  },

  drawFromDiscard: () => {
    set(state => {
      if (!state.player || state.drawnCard || state.discardPile.length === 0 || state.turn !== state.player.playerNumber) return {};

      const newDiscardPile = [...state.discardPile];
      const drawnCardFromPile = newDiscardPile.pop();

      if (drawnCardFromPile) {
        const newPlayerCards = [...state.player.cards, drawnCardFromPile];
        return {
          discardPile: newDiscardPile,
          player: { ...state.player, cards: newPlayerCards },
          drawnCard: true,
        };
      }
      return {};
    });
  },

  discardCard: (cardToDiscard: Card) => {
    set(state => {
      if (!state.player || !state.drawnCard || state.turn !== state.player.playerNumber) return {};

      const newPlayerCards = state.player.cards.filter(c => c.id !== cardToDiscard.id);
      if (newPlayerCards.length === state.player.cards.length) return {}; // card not found


      socket.emit(`player`+ state.player.playerNumber, {deck: state.deck, discardPile: [...state.discardPile, cardToDiscard], roomCode: state.roomCode});
      console.log('emmiting', `player`+ state.player.playerNumber, {deck: state.deck, discardPile: [...state.discardPile, cardToDiscard], roomCode: state.roomCode})
      return {
        discardPile: [...state.discardPile, cardToDiscard],
        player: { ...state.player, cards: newPlayerCards },
        drawnCard: false,
      };
    });
  },
  
  setPlayerCards: (cards: Card[]) => {
      set(state => {
          if (!state.player) return {};
          return {
              player: { ...state.player, cards }
          }
      })
  }
}));
