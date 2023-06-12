import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CardInterface, CardPiles } from '../types/types';
import { ItemTypes } from '../constants/constants';
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

  // React-DND
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: {
      id: card.id,
      location: {
        ...location,
      },
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => {
      console.log(item, 0);
      console.log(`Moved On: ${card.value} of ${card.type}s`);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), []);

  return (
    <StyledCard
      className={'card'}
      style={{
        zIndex: index,
        top,
        opacity: `${isDragging ? '0' : '1'}`,
      }}
      onClick={clickEvent || undefined}
    >
      {/* An empty div is required to designate drop target. */}
      <div ref={drop}>
        <img
          ref={drag}
          src={card.open ? `./cards/${card.src}.png` : './cards/closed.png'}
          alt={`${card.value} of ${card.type}`}
        />
      </div>
    </StyledCard>
  );
}
