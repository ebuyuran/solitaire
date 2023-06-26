import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/constants';
import { Layout, CardMovementParams } from '../../types/types';
import { moveCard } from '../../controllers/moveCard';

import { StyledFoundationBase } from './StyledFoundationBase';

interface FoundationStackProps {
  stackID: number;
  layout: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
}

export function FoundationBase(props: FoundationStackProps) {
  const { stackID, layout, setLayout } = props;

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: CardMovementParams) => {
      moveCard(
        layout,
        setLayout,
        item,
        {
          id: 'base',
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
