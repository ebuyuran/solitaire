import {
  CardType, CardColour, CardValue, CardInterface, Layout,
} from '../types/types';

export const cardTypes: CardType[] = ['club', 'diamond', 'heart', 'spade'];
export const cardValues: CardValue[] = ['king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'ace'];

export class Card implements CardInterface {
  id;
  type;
  value;
  colour: CardColour;
  open = false;
  src;

  constructor(type: CardType, value: CardValue) {
    this.type = type;
    this.value = value;
    this.id = `${this.type}_${this.value}`;
    this.colour = this.type === 'club' || this.type === 'spade' ? 'black' : 'red';
    this.src = `${this.type}_${this.value}`;
  }
}

export const generateDeck = () => {
  const deck: CardInterface[] = [];

  // Generating 52 poker cards
  // 13 cards for each type (club, spade, heart and diamond).
  cardTypes.forEach((type) => {
    cardValues.forEach((value) => {
      deck.push(new Card(type, value)); // Pushing each card on our deck.
    });
  });

  return deck;
};

export const generateLayout = (deck: CardInterface[]): Layout => {
  // Start by shuffling to randomize our deck.
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);

  /*
    Generate tableaus and show the last card.
    In a solitare game, there are 7 tableaus with
    each one containing 1, 2, 3, 4, 5, 6 and 7 cards
    respectively.
  */

  const tableau0 = [
    shuffledDeck[0],
  ];

  const tableau1 = [
    shuffledDeck[1],
    shuffledDeck[2],
  ];

  const tableau2 = [
    shuffledDeck[3],
    shuffledDeck[4],
    shuffledDeck[5],
  ];

  const tableau3 = [
    shuffledDeck[6],
    shuffledDeck[7],
    shuffledDeck[8],
    shuffledDeck[9],
  ];

  const tableau4 = [
    shuffledDeck[10],
    shuffledDeck[11],
    shuffledDeck[12],
    shuffledDeck[13],
    shuffledDeck[14],
  ];

  const tableau5 = [
    shuffledDeck[15],
    shuffledDeck[16],
    shuffledDeck[17],
    shuffledDeck[18],
    shuffledDeck[19],
    shuffledDeck[20],
  ];

  const tableau6 = [
    shuffledDeck[21],
    shuffledDeck[22],
    shuffledDeck[23],
    shuffledDeck[24],
    shuffledDeck[25],
    shuffledDeck[26],
    shuffledDeck[27],
  ];

  // All the cards that didn't go to tableaus, goes to stock pile.
  // There are 24 cards left so remaining cards from deck array.
  const stockPile = shuffledDeck.slice(-24);

  // Start the game with each last card on tableau as open.
  tableau0[tableau0.length - 1].open = true;
  tableau1[tableau1.length - 1].open = true;
  tableau2[tableau2.length - 1].open = true;
  tableau3[tableau3.length - 1].open = true;
  tableau4[tableau4.length - 1].open = true;
  tableau5[tableau5.length - 1].open = true;
  tableau6[tableau6.length - 1].open = true;

  return {
    tableau: [tableau0, tableau1, tableau2, tableau3, tableau4, tableau5, tableau6],
    // Foundation stacks starts empty.
    foundation: [[], [], [], []],
    // Remaining 24 cards goes to stock pile.
    stock: [
      [], // Opened stock pile.
      stockPile, // Closed stock pile.
    ],
  };
};
