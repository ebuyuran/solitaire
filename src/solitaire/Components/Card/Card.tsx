import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  CardInterface, CardLocation, CardMovementParams,
} from '../../types/types';
import { StyledCard } from './StyledCard';

interface Props {
  pile: CardInterface[];
  card: CardInterface;
  location: CardLocation;
  moveCard: (draggedCard: CardMovementParams, targetCard: CardMovementParams) => void;
  clickEvent?: () => void;
}

export function Card(props: Props) {
  const {
    card, pile, location, moveCard, clickEvent,
  } = props;

  const index = pile.indexOf(card);

  const top = location.pile === 'tableau' ?
    `${index * 2}em` : undefined;

  // React-DND

  // eslint-disable-next-line arrow-body-style
  const [{ isDragging }, drag] = useDrag(() => {
    // console.log('useDrag', card.open);
    return {
      type: 'card',
      item: {
        id: card.id,
        location,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    };
  });

  // eslint-disable-next-line arrow-body-style
  const [, drop] = useDrop(() => {
    // console.log('useDrop', card.open);
    return {
      accept: 'card',
      drop: (item: CardMovementParams) => {
        moveCard(
          item,
          {
            id: card.id,
            location,
          },
        );
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    };
  }, []);

  return (
    <StyledCard
      className={'card'}
      style={{
        zIndex: index + 1,
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
