"use client";

import { create } from 'zustand';
import type { Player, Card, OtherPlayer } from '@/lib/types';
import { mockPlayer, mockOtherPlayers, mockDeck, mockDiscardPile } from '@/lib/mock-data';

type GamePhase = 'loading' | 'initial-deal' | 'show-initial-card' | 'dealing-cards' | 'playing' | 'waiting';

interface GameState {
  player: Player | null;
  otherPlayers: OtherPlayer[];
  deck: Card[];
  discardPile: Card[];
  gamePhase: GamePhase;
  turn: number; // playerNumber of the current turn
  drawnCard: boolean;

  // Actions
  initGame: () => void;
  finishInitialCardAnimation: () => void;
  finishDealingAnimation: () => void;
  drawFromDeck: () => void;
  drawFromDiscard: () => void;
  discardCard: (card: Card) => void;
  setPlayerCards: (cards: Card[]) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  player: null,
  otherPlayers: [],
  deck: [],
  discardPile: [],
  gamePhase: 'loading',
  turn: 1, // Dealer (player 1) starts
  drawnCard: false,

  initGame: () => {
    set({
      player: mockPlayer,
      otherPlayers: mockOtherPlayers,
      deck: mockDeck,
      discardPile: mockDiscardPile,
      gamePhase: 'initial-deal',
      turn: 1,
      drawnCard: false,
    });
  },
  
  finishInitialCardAnimation: () => {
    set({ gamePhase: 'dealing-cards' });
  },

  finishDealingAnimation: () => {
    set({ gamePhase: 'playing' });
  },

  drawFromDeck: () => {
    const { deck, player, turn, drawnCard } = get();
    if (player?.playerNumber !== turn || drawnCard) return;

    const newDeck = [...deck];
    const drawnCardFromDeck = newDeck.pop();
    if (drawnCardFromDeck && player) {
      const newPlayerCards = [...player.cards, drawnCardFromDeck];
      set({
        deck: newDeck,
        player: { ...player, cards: newPlayerCards },
        drawnCard: true,
      });
    }
  },

  drawFromDiscard: () => {
    const { discardPile, player, turn, drawnCard } = get();
    if (player?.playerNumber !== turn || drawnCard || discardPile.length === 0) return;

    const newDiscardPile = [...discardPile];
    const drawnCardFromPile = newDiscardPile.pop();
    if (drawnCardFromPile && player) {
      const newPlayerCards = [...player.cards, drawnCardFromPile];
      set({
        discardPile: newDiscardPile,
        player: { ...player, cards: newPlayerCards },
        drawnCard: true,
      });
    }
  },

  discardCard: (cardToDiscard: Card) => {
    const { player, turn, drawnCard } = get();
    if (player?.playerNumber !== turn || !drawnCard) return;

    const newPlayerCards = player.cards.filter(c => c.id !== cardToDiscard.id);
    if (newPlayerCards.length === player.cards.length) return; // card not found

    set(state => ({
      discardPile: [...state.discardPile, cardToDiscard],
      player: { ...player, cards: newPlayerCards },
      drawnCard: false,
      turn: (state.turn % 3) + 1, // Cycle through 1, 2, 3
      otherPlayers: state.otherPlayers.map(p => ({...p, isCurrentTurn: (p.playerNumber === ((state.turn % 3) + 1)) })),
    }));
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
