import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  Layout, CardInterface, CardLocation, CardMovementParams,
} from '../types/types';
import { moveCard } from '../controllers/moveCard';
import { ItemTypes } from '../constants/constants';
import { StyledCard } from './StyledCard';

interface Props {
  pile: CardInterface[];
  card: CardInterface;
  location: CardLocation;
  layout: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
  clickEvent?: () => void;
}

export function Card(props: Props) {
  const {
    card, pile, location, clickEvent, layout, setLayout,
  } = props;

  const index = pile.indexOf(card);

  const top = location.pile === 'tableau' ?
    `${index * 2}em` : undefined;

  // React-DND
  const [{ isDragging }, drag] = useDrag(() => ({
    // Only allow cards which are open to be draggable.
    type: card.open ? ItemTypes.CARD : 'undraggable',
    item: {
      id: card.id,
      location,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: CardMovementParams) => {
      moveCard(
        layout,
        setLayout,
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
