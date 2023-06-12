import React from 'react';
import { CardInterface, CardPiles } from '../types/types';
import { StyledCard } from './StyledCard';

interface Props {
  pile: CardInterface[];
  card: CardInterface;
  location: {
    stack: CardPiles;
    value: number;
  };
  clickEvent?: () => void;
}

export function Card(props: Props) {
  const {
    card, pile, location, clickEvent,
  } = props;

  const index = pile.indexOf(card);

  const top = location && location.stack === 'tableau' ?
    `${index * 2}em` : undefined;

  return (
    <StyledCard
      className={'card'}
      style={{ zIndex: index, top }}
      onClick={clickEvent || undefined}
    >
      <img src={card.open ? `./cards/${card.src}.png` : './cards/closed.png'} alt={`${card.value} of ${card.type}`} />
    </StyledCard>
  );
}
