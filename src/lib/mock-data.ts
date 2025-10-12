import type { Player, Card, OtherPlayer, Suit, Rank } from './types';

const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let cardIdCounter = 0;

const createDeck = (): Card[] => {
  const deck: Card[] = [];
  suits.forEach(suit => {
    ranks.forEach((rank, index) => {
      deck.push({ id: `card-${cardIdCounter++}`, suit, rank, value: index + 2 });
    });
  });
  // Add two jokers
  deck.push({ id: `card-${cardIdCounter++}`, suit: 'Joker', rank: 'Joker', value: 50 });
  deck.push({ id: `card-${cardIdCounter++}`, suit: 'Joker', rank: 'Joker', value: 50 });
  return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const fullDeck = shuffleDeck(createDeck());

export const mockPlayer: Player = {
  walletAmount: 1000,
  phoneNumber: '123-456-7890',
  fullName: 'You',
  playerNumber: 1,
  isPlaying: true,
  isDealer: true,
  isCurrentTurn: true,
  cards: fullDeck.slice(0, 14),
  initialCard: fullDeck[52], // Use a card from the deck as initial
};

export const mockOtherPlayers: OtherPlayer[] = [
  {
    fullName: 'Player 2',
    playerNumber: 2,
    cardCount: 13,
    isCurrentTurn: false,
  },
  {
    fullName: 'Player 3',
    playerNumber: 3,
    cardCount: 13,
    isCurrentTurn: false,
  },
];

// Cards for P2 (13), P3 (13)
const p2Cards = fullDeck.slice(14, 27);
const p3Cards = fullDeck.slice(27, 40);

export const mockDiscardPile: Card[] = [fullDeck[40]];

export const mockDeck: Card[] = fullDeck.slice(41, 52);
