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

// #TODO: We don't actually need the cards on stock pile to be droppable.
// Maybe we can add some code to differentiate.

export function Card(props: Props) {
  const {
    card, pile, location, moveCard, clickEvent,
  } = props;

  // In the tableau, cards are stacked with some spaces
  // that allows players to see the cards below them.
  const index = pile.indexOf(card);
  const top = location.pile === 'tableau' ?
    `${index * 2}em` : undefined;

  // React-DND
  // eslint-disable-next-line arrow-body-style
  const [{ isDragging }, drag, preview] = useDrag(() => {
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

  if (isDragging) {
    console.log('dragging');
  }

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
      {/*
        An empty div is required to designate drop target.
        Making all cards both draggable, and droppable.
      */}
      <div ref={drop}>
        <div
          id={card.id}
          className={'card-image'}
          ref={drag}
          style={{
            backgroundImage: card.open ? `url("./cards/${card.src}.png")` : 'url("./cards/closed.png")',
          }}
        />
      </div>
    </StyledCard>
  );
}
