export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades' | 'Joker';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | 'Joker';

export interface Card {
  id: string; // Unique ID for each card instance
  suit: Suit;
  rank: Rank;
  value: number;
}

export interface Player {
  walletAmount: number;
  phoneNumber: string;
  fullName: string;
  playerNumber: number;
  isPlaying: boolean;
  isDealer: boolean;
  isCurrentTurn: boolean;
  cards: Card[];
  initialCard: Card | null;
}

export interface OtherPlayer {
  fullName: string;
  playerNumber: number;
  cardCount: number;
  isCurrentTurn: boolean;
}
