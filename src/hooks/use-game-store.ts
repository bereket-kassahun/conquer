'use client';

import { create } from 'zustand';
import type { Player, Card, OtherPlayer } from '@/lib/types';
import { mockPlayer, mockOtherPlayers, mockDeck, mockDiscardPile } from '@/lib/mock-data';

type GamePhase = 'loading' | 'dealing-cards' | 'playing' | 'waiting';

interface GameState {
  player: Player | null;
  otherPlayers: OtherPlayer[];
  deck: Card[];
  discardPile: Card[];
  gamePhase: GamePhase;

  // Actions
  initGame: () => void;
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

  initGame: () => {
    set({
      player: mockPlayer,
      otherPlayers: mockOtherPlayers,
      deck: mockDeck,
      discardPile: mockDiscardPile,
      gamePhase: 'dealing-cards',
    });
  },

  finishDealingAnimation: () => {
    set({ gamePhase: 'playing' });
  },

  drawFromDeck: () => {
    set(state => {
      if (!state.player) return {};

      const newDeck = [...state.deck];
      const drawnCardFromDeck = newDeck.pop();

      if (drawnCardFromDeck) {
        const newPlayerCards = [...state.player.cards, drawnCardFromDeck];
        return {
          deck: newDeck,
          player: { ...state.player, cards: newPlayerCards },
        };
      }
      return {};
    });
  },

  drawFromDiscard: () => {
    set(state => {
      if (!state.player || state.discardPile.length === 0) return {};

      const newDiscardPile = [...state.discardPile];
      const drawnCardFromPile = newDiscardPile.pop();

      if (drawnCardFromPile) {
        const newPlayerCards = [...state.player.cards, drawnCardFromPile];
        return {
          discardPile: newDiscardPile,
          player: { ...state.player, cards: newPlayerCards },
        };
      }
      return {};
    });
  },

  discardCard: (cardToDiscard: Card) => {
    set(state => {
      if (!state.player) return {};

      const newPlayerCards = state.player.cards.filter(c => c.id !== cardToDiscard.id);
      if (newPlayerCards.length === state.player.cards.length) return {}; // card not found

      return {
        discardPile: [...state.discardPile, cardToDiscard],
        player: { ...state.player, cards: newPlayerCards },
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
