import React, { useState, useEffect } from 'react';
import { generateDeck, generateLayout } from './controllers/generateDeck';
import { validateMoveCardAction } from './controllers/validateMoveCardAction';
import { CardInterface, CardLocation, CardMovementParams } from './types/types';
import { StyledSolitare } from './StyledSolitaire';

import { Card } from './Components/Card/Card';
import { Stack } from './Components/Stack/Stack';
import { FoundationBase } from './Components/FoundationBase/FoundationBase';

function Solitaire() {
  const deck = generateDeck();
  const [layout, setLayout] = useState(generateLayout(deck));

  const getNextCardOnStockPile = () => {
    const openStockPile = layout.stock[0];
    const closedStockPile = layout.stock[1];
    const cardToBeMoved = closedStockPile[closedStockPile.length - 1];
    cardToBeMoved.open = true;

    openStockPile.push(cardToBeMoved);
    closedStockPile.pop();

    setLayout({
      foundation: [...layout.foundation],
      tableau: [...layout.tableau],
      stock: [
        openStockPile, closedStockPile,
      ],
    });
  };

  const moveCard = (draggedCard: CardMovementParams, targetCard: CardMovementParams) => {
    const isValidMoveAction = validateMoveCardAction(layout, draggedCard, targetCard);

    if (isValidMoveAction) {
      // Since the validation is successful, dragged card object has returned.
      const draggedCardObject = isValidMoveAction;

      // THIS ONLY WORKS FOR SINGLE CARD MOVEMENTS FOR NOW!

      // Remove the card from dragged pile.
      const draggedPile = [...layout[draggedCard.location.pile][draggedCard.location.value]];
      const updatedDraggedPile = draggedPile.slice(0, draggedPile.length - 1);

      // Add the card to the target pile.
      const targetPile = [...layout[targetCard.location.pile][targetCard.location.value]];
      targetPile.push(draggedCardObject);

      // Create a new layout object and update the layout.
      const newLayout = { ...layout };
      newLayout[draggedCard.location.pile][draggedCard.location.value] = updatedDraggedPile;
      newLayout[targetCard.location.pile][targetCard.location.value] = targetPile;

      setLayout(newLayout);
    }
  };

  useEffect(() => {
    // Open the closed last cards on tableau piles.
    let layoutChanged = false;
    const newLayout = { ...layout };

    newLayout.tableau.forEach((pile) => {
      const lastCard = pile[pile.length - 1];

      if (lastCard.open === false) {
        lastCard.open = true;
        layoutChanged = true;
      }
    });

    if (layoutChanged) {
      setLayout(newLayout);
    }
  }, [layout, setLayout]);

  return (
    <StyledSolitare>
      <div className={'solitaire'}>
        <div className={'container'}>
          <div className={'stack'}>
            <FoundationBase moveCard={moveCard} stackID={0} />
            <Stack
              stack={layout.foundation[0]}
              location={{ pile: 'foundation', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <FoundationBase moveCard={moveCard} stackID={1} />
            <Stack
              stack={layout.foundation[1]}
              location={{ pile: 'foundation', value: 1 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <FoundationBase moveCard={moveCard} stackID={2} />
            <Stack
              stack={layout.foundation[2]}
              location={{ pile: 'foundation', value: 2 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <FoundationBase moveCard={moveCard} stackID={3} />
            <Stack
              stack={layout.foundation[3]}
              location={{ pile: 'foundation', value: 3 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'} />
          <div className={'stack'}>
            <Stack
              stack={layout.stock[0]}
              location={{ pile: 'stock', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.stock[0]}
              location={{ pile: 'stock', value: 0 }}
              moveCard={moveCard}
              clickEvent={getNextCardOnStockPile}
            />
          </div>
        </div>
        <div className={'container tableaus'}>
          <div className={'stack'}>
            <Stack
              stack={layout.tableau[0]}
              location={{ pile: 'tableau', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.tableau[1]}
              location={{ pile: 'tableau', value: 1 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.tableau[2]}
              location={{ pile: 'tableau', value: 2 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.tableau[3]}
              location={{ pile: 'tableau', value: 3 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.tableau[4]}
              location={{ pile: 'tableau', value: 4 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.tableau[5]}
              location={{ pile: 'tableau', value: 5 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.tableau[6]}
              location={{ pile: 'tableau', value: 6 }}
              moveCard={moveCard}
            />
          </div>
        </div>
      </div>
    </StyledSolitare>
  );
}

export { Solitaire };
