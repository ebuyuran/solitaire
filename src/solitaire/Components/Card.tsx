import React from 'react';
import { CardInterface } from '../types/types';

import { StyledCard } from './StyledCard';

interface Props {
  pile: CardInterface[];
  card: CardInterface;
  location?: {
    stack: 'tableau';
    value: number;
  };
}

export function Card(props: Props) {
  const { card, pile, location } = props;
  const index = pile.indexOf(card);
  const top = location && location.stack === 'tableau' ?
    `${index * 2}em` : undefined;

  return (
    <StyledCard className={'card'} style={{ zIndex: index, top }}>
      <img src={card.open ? `./cards/${card.src}.png` : './cards/closed.png'} alt={`${card.value} of ${card.type}`} />
    </StyledCard>
  );
}
