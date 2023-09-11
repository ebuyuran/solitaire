import React from 'react';
import { useDrop } from 'react-dnd';
import { CardMovementParams } from '../../types/types';

import { StyledBaseSlot } from './StyledBaseSlot';

interface BaseSlotProps {
  stackID: number;
  moveCard: (draggedCard: CardMovementParams, targetCard: CardMovementParams) => void;
  slotType: 'foundation' | 'tableau';
}

export function BaseSlot(props: BaseSlotProps) {
  const { stackID, moveCard, slotType } = props;

  const [, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: CardMovementParams) => {
      moveCard(
        item,
        {
          id: `${slotType}-base`,
          location: {
            pile: slotType,
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
    <StyledBaseSlot ref={drop} />
  );
}
