import React from 'react';
import { useDrop } from 'react-dnd';
import { CardMovementParams } from '../../types/types';

import { StyledFoundationBase } from './StyledFoundationBase';

interface FoundationStackProps {
  stackID: number;
  moveCard: (draggedCard: CardMovementParams, targetCard: CardMovementParams) => void
}

export function FoundationBase(props: FoundationStackProps) {
  const { stackID, moveCard } = props;

  const [, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: CardMovementParams) => {
      moveCard(
        item,
        {
          id: 'foundation-base',
          location: {
            pile: 'foundation',
            value: stackID,
          },
        },
      );
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), []);

  return (
    <StyledFoundationBase ref={drop} />
  );
}
