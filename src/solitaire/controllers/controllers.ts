import {
  CardType, CardColour, CardValue, CardLocation, CardInterface, Layout,
} from '../types/types';

export const cardTypes: CardType[] = ['club', 'diamond', 'heart', 'spade'];
export const cardValues: CardValue[] = ['king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'ace'];

export class Card implements CardInterface {
  type;
  value;
  colour: CardColour;
  location: CardLocation = { pile: 'stock', order: -1 };
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

  function allocateCardLocations() {
    function forTableau(tableau: CardInterface[]) {
      // Register the locations of each card object.
      tableau.forEach((card, i) => {
        card.location = {
          pile: 'tableau',
          order: tableau.indexOf(card),
        };

        // Start layout with each last card on tableau as open.
        if (i === tableau.length - 1) {
          card.open = true;
        }
      });
    }

    forTableau(tableau0);
    forTableau(tableau1);
    forTableau(tableau2);
    forTableau(tableau3);
    forTableau(tableau4);
    forTableau(tableau5);
    forTableau(tableau6);

    stockPile.forEach((card) => {
      card.location = {
        pile: 'stock',
        order: stockPile.indexOf(card),
      };
    });
  }

  allocateCardLocations();

  return {
    tableaus: [tableau0, tableau1, tableau2, tableau3, tableau4, tableau5, tableau6],
    // Foundation starts empty.
    foundation: [[], [], [], []],
    // Remaining 24 cards goes to stock pile.
    stock: {
      open: [],
      closed: stockPile,
    },
  };
};
