import React from 'react';
import { Card } from '../Card/Card';
import { CardInterface, CardLocation, CardMovementParams } from '../../types/types';

interface StackProps {
  stack: CardInterface[];
  location: CardLocation;
  clickEvent?: (() => void) | undefined;
  moveCard: (draggedCard: CardMovementParams, targetCard: CardMovementParams) => void;
}

export function Stack(props: StackProps) {
  const {
    stack, location, moveCard, clickEvent,
  } = props;

  return (
    <>
      {stack.map((card) => (
        <Card
          key={`${card.type}_${card.value}`}
          card={card}
          pile={stack}
          location={location}
          clickEvent={clickEvent}
          moveCard={moveCard}
        />
      ))}
    </>
  );
}
