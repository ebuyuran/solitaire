import React from 'react';
import { CardInterface } from '../types/types';

import { StyledCard } from './StyledCard';

interface Props {
  card: CardInterface;
}

export function Card(props: Props) {
  const { card } = props;

  return (
    <StyledCard className={'card'} style={{ zIndex: card.location.order }}>
      <img src={card.open ? `./cards/${card.src}.png` : './cards/closed.png'} alt={`${card.value} of ${card.type}`} />
    </StyledCard>
  );
}
