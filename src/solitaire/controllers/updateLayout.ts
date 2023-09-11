import { Layout, CardMovementParams, CardInterface } from '../types/types';
import { validateMoveCardAction } from './validateMoveCardAction';

type ValidActions =
  'getNextCardOnStockPile' |
  'resetStockPile' |
  'moveCard';

export interface Action {
  type: ValidActions,
  payload?: {
    draggedCard: CardMovementParams,
    targetCard: CardMovementParams,
  }
}

type UpdateLayout = (
  layout: Layout,
  action: Action,
) => Layout;

const openLastCardsOnTableaus = (newLayout: Layout): Layout => {
  newLayout.tableau.forEach((pile) => {
    if (pile.length !== 0) {
      const lastCard = pile[pile.length - 1];
      if (!lastCard.open) lastCard.open = true;
    }
  });

  return newLayout;
};

const getNextCardOnStockPile = (newLayout: Layout): Layout => {
  const openStockPile = newLayout.stock[0];
  const closedStockPile = newLayout.stock[1];
  const cardToBeMoved = closedStockPile[closedStockPile.length - 1];
  cardToBeMoved.open = true;

  openStockPile.push(cardToBeMoved);
  closedStockPile.pop();

  return newLayout;
};

const resetStockPile = (newLayout: Layout): Layout => {
  newLayout.stock[1] = newLayout.stock[0].reverse();

  newLayout.stock[1].forEach((card) => {
    card.open = false;
  });

  newLayout.stock[0] = [];

  return newLayout;
};

const moveCard = (
  newLayout: Layout,
  draggedCard: CardMovementParams,
  targetCard: CardMovementParams,
): Layout => {
  const isValidMoveAction = validateMoveCardAction(newLayout, draggedCard, targetCard);

  if (isValidMoveAction) {
    // Since the validation is successful, dragged card object has returned from validation.
    const draggedCardObject = isValidMoveAction;

    const draggedPile = newLayout[draggedCard.location.pile][draggedCard.location.value];

    // Check if we are removing the last card of the dragged pile.
    const cardPileIndex = draggedPile.indexOf(draggedCardObject);

    const movingASingleCard = draggedPile.length === cardPileIndex + 1;

    let numberOfCardsToBeMoved: number;
    let cardsToBeMoved: CardInterface[];
    let updatedDraggedPile: CardInterface[];

    if (movingASingleCard) {
      cardsToBeMoved = [draggedCardObject];
      numberOfCardsToBeMoved = 1;
      updatedDraggedPile = draggedPile.slice(0, draggedPile.length - 1);
    } else {
      cardsToBeMoved = draggedPile.slice(cardPileIndex);
      numberOfCardsToBeMoved = cardsToBeMoved.length;
      updatedDraggedPile = draggedPile.slice(0, numberOfCardsToBeMoved);
    }

    // Add the card to the target pile.
    const targetPile = newLayout[targetCard.location.pile][targetCard.location.value];
    const updatedTargetPile = [...targetPile, ...cardsToBeMoved];

    newLayout[draggedCard.location.pile][draggedCard.location.value] = updatedDraggedPile;
    newLayout[targetCard.location.pile][targetCard.location.value] = updatedTargetPile;

    // Open any last cards on tableaus if one of them moved to another pile
    // and new card is closed.
    return openLastCardsOnTableaus(newLayout);
  } else {
    return newLayout;
  }
};

export const updateLayout: UpdateLayout = (layout, action): Layout => {
  // Create a new layout object.
  const newLayout: Layout = {
    foundation: [
      [...layout.foundation[0]],
      [...layout.foundation[1]],
      [...layout.foundation[2]],
      [...layout.foundation[3]],
    ],
    stock: [
      [...layout.stock[0]],
      [...layout.stock[1]],
    ],
    tableau: [
      [...layout.tableau[0]],
      [...layout.tableau[1]],
      [...layout.tableau[2]],
      [...layout.tableau[3]],
      [...layout.tableau[4]],
      [...layout.tableau[5]],
      [...layout.tableau[6]],
    ],
  };

  switch (action.type) {
    case 'getNextCardOnStockPile':
      return getNextCardOnStockPile(newLayout);

    case 'resetStockPile':
      return resetStockPile(newLayout);

    case 'moveCard':
      if (!(action.payload)) {
        throw new Error('Missing card details in moveCard function');
      }
      return moveCard(newLayout, action.payload.draggedCard, action.payload.targetCard);

    default:
      console.warn('Unexpected action type from reducer:', action);
      return newLayout;
  }
};
