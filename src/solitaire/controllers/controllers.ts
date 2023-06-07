import {
  CardType, CardColour, CardValue, CardInterface, Layout,
} from '../types/types';

export const cardTypes: CardType[] = ['club', 'diamond', 'heart', 'spade'];
export const cardValues: CardValue[] = ['king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'ace'];

export class Card implements CardInterface {
  type;
  value;
  colour: CardColour;
  open = false;
  src;

  constructor(type: CardType, value: CardValue) {
    this.type = type;
    this.value = value;
    this.colour = this.type === 'club' || this.type === 'spade' ? 'black' : 'red';
    this.src = `${this.type}_${this.value}`;
  }
}

export const generateDeck = () => {
  const deck: CardInterface[] = [];

  cardTypes.forEach((type) => {
    cardValues.forEach((value) => {
      deck.push(new Card(type, value));
    });
  });

  return deck;
};

export const generateLayout = (deck: CardInterface[]): Layout => {
  const shuffledDeck = deck.sort(() => Math.random() - 0.5);

  // Generate tableaus and show the last card.

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

  const stockPile = shuffledDeck.slice(-24);

  // Allocate location data for each card.
  function openLastCardInTableau(tableau: CardInterface[]) {
    tableau.forEach((card, i) => {
      // Start the game with each last card on tableau as open.
      if (i === tableau.length - 1) {
        card.open = true;
      }
    });
  }

  openLastCardInTableau(tableau0);
  openLastCardInTableau(tableau1);
  openLastCardInTableau(tableau2);
  openLastCardInTableau(tableau3);
  openLastCardInTableau(tableau4);
  openLastCardInTableau(tableau5);
  openLastCardInTableau(tableau6);

  return {
    tableau: [tableau0, tableau1, tableau2, tableau3, tableau4, tableau5, tableau6],
    // Foundation starts empty.
    foundation: [[], [], [], []],
    // Remaining 24 cards goes to stock pile.
    stock: [
      [],
      stockPile,
    ],
  };
};
