export type CardType = 'club' | 'diamond' | 'heart' | 'spade';
export type CardColour = 'red' | 'black';
export type CardValue = 'King' | 'Queen' | 'Joker' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | 'Ace';

export interface CardInterface {
  type: {
    color: CardColour;
    name: CardType;
  },
  value: CardValue;
  location: null | {
    pile: 'stock' | 'tableau' | 'foundation',
  }
}
