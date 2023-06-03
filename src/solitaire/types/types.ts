export type CardType = 'club' | 'diamond' | 'heart' | 'spade';
export type CardColour = 'red' | 'black';
export type CardValue = 'king' | 'queen' | 'jack' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | 'ace';

export interface CardLocation {
  pile: 'stock' | 'tableau' | 'foundation',
  order: number;
}

export interface CardInterface {
  colour: CardColour;
  type: CardType;
  value: CardValue;
  location: CardLocation;
  open: boolean;
  src: string;
}

export interface Layout {
  foundation: [
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
  ];
  stock: {
    open: CardInterface[],
    closed: CardInterface[],
  };
  tableaus: [
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
    CardInterface[],
  ]
}
