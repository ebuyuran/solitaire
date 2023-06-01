import { CardType, CardColour, CardValue } from '../types/types';

export const cardColours: CardColour[] = ['red', 'black'];
export const cardTypes: CardType[] = ['club', 'diamond', 'heart', 'spade'];
export const cardValues: CardValue[] = ['King', 'Queen', 'Joker', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'Ace'];

class Card {
  type: CardType;
  value: CardValue;
  colour: CardColour;
  location = null;
  shown: boolean = false;

  constructor(type: CardType, value: CardValue) {
    this.type = type;
    this.value = value;
    this.colour = this.type === 'club' || this.type === 'spade' ? 'black' : 'red';
  }
}

export const generateDeck = () => {
  const deck: Card[] = [];

  cardTypes.forEach((type) => {
    cardValues.forEach((value) => {
      deck.push(new Card(type, value));
    });
  });

  return deck;
};

export const generateLayout = (deck: Card[]) => {
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);

  // Generate tableaus and show the last card.

  const tableau1 = [
    shuffledDeck[0],
  ];

  shuffledDeck[0].shown = true;

  const tableau2 = [
    shuffledDeck[1],
    shuffledDeck[2],
  ];

  shuffledDeck[2].shown = true;

  const tableau3 = [
    shuffledDeck[3],
    shuffledDeck[4],
    shuffledDeck[5],
  ];

  shuffledDeck[5].shown = true;

  const tableau4 = [
    shuffledDeck[6],
    shuffledDeck[7],
    shuffledDeck[8],
    shuffledDeck[9],
  ];

  shuffledDeck[9].shown = true;

  const tableau5 = [
    shuffledDeck[10],
    shuffledDeck[11],
    shuffledDeck[12],
    shuffledDeck[13],
    shuffledDeck[14],
  ];

  shuffledDeck[14].shown = true;

  const tableau6 = [
    shuffledDeck[15],
    shuffledDeck[16],
    shuffledDeck[17],
    shuffledDeck[18],
    shuffledDeck[19],
    shuffledDeck[20],
  ];

  shuffledDeck[20].shown = true;

  const tableau7 = [
    shuffledDeck[21],
    shuffledDeck[22],
    shuffledDeck[23],
    shuffledDeck[24],
    shuffledDeck[25],
    shuffledDeck[26],
    shuffledDeck[27],
  ];

  shuffledDeck[27].shown = true;

  return {
    tableaus: [tableau1, tableau2, tableau3, tableau4, tableau5, tableau6, tableau7],
    // Foundation starts empty.
    foundation: [],
    // Remaining 24 cards goes to stock pile.
    stock: shuffledDeck.slice(-24),
  };
};
