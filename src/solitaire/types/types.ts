export type CardType = 'club' | 'diamond' | 'heart' | 'spade';
export type CardColour = 'red' | 'black';
export type CardValue = 'king' | 'queen' | 'jack' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | 'ace';
export type CardPiles = 'tableau' | 'foundation' | 'stock';

export interface CardInterface {
  colour: CardColour;
  type: CardType;
  value: CardValue;
  open: boolean;
  src: string;
  id: string;
}

export interface Layout {
  foundation: [
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
  ];
  stock: [
    // Closed stock cards
    CardInterface[],
    // Open stock cards
    CardInterface[],
  ];
  tableau: [
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
  ]
}
