import { Layout, CardMovementParams } from '../types/types';
import { validateMoveCardAction } from './validateMoveCardAction';

type ValidActions =
  'getNextCardOnStockPile' |
  'resetStockPile' |
  'openLastCardsOnTableaus' |
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

const getNextCardOnStockPile = (newState: Layout): Layout => {
  const openStockPile = newState.stock[0];
  const closedStockPile = newState.stock[1];
  const cardToBeMoved = closedStockPile[closedStockPile.length - 1];
  cardToBeMoved.open = true;

  openStockPile.push(cardToBeMoved);
  closedStockPile.pop();

  return newState;
};

const resetStockPile = (newState: Layout): Layout => {
  newState.stock[1] = newState.stock[0].reverse();

  newState.stock[1].forEach((card) => {
    card.open = false;
  });

  newState.stock[0] = [];

  return newState;
};

const openLastCardsOnTableaus = (newState: Layout): Layout | null => {
  let layoutChanged = false;

  newState.tableau.forEach((pile) => {
    if (pile.length !== 0) {
      const lastCard = pile[pile.length - 1];

      if (!lastCard.open) {
        lastCard.open = true;
        layoutChanged = true;
      }
    }
  });

  return layoutChanged ? newState : null;
};

const moveCard = (
  newState: Layout,
  draggedCard: CardMovementParams,
  targetCard: CardMovementParams,
): Layout => {
  const isValidMoveAction = validateMoveCardAction(newState, draggedCard, targetCard);

  if (isValidMoveAction) {
    // Since the validation is successful, dragged card object has returned from validation.
    const draggedCardObject = isValidMoveAction;

    // THIS ONLY WORKS FOR SINGLE CARD MOVEMENTS FOR NOW!
    // Remove the card from dragged pile.
    const draggedPile = newState[draggedCard.location.pile][draggedCard.location.value];
    // Only removing the last card as of yet,
    // need to update this logic to handle multi-card movements.
    const updatedDraggedPile = draggedPile.slice(0, draggedPile.length - 1);

    // Add the card to the target pile.
    const targetPile = newState[targetCard.location.pile][targetCard.location.value];
    targetPile.push(draggedCardObject);

    newState[draggedCard.location.pile][draggedCard.location.value] = updatedDraggedPile;
    newState[targetCard.location.pile][targetCard.location.value] = targetPile;

    return newState;
  } else {
    return newState;
  }
};

export const updateLayout: UpdateLayout = (state, action): Layout => {
  // Create a new layout object.
  const newState: Layout = {
    foundation: [
      [...state.foundation[0]],
      [...state.foundation[1]],
      [...state.foundation[2]],
      [...state.foundation[3]],
    ],
    stock: [
      [...state.stock[0]],
      [...state.stock[1]],
    ],
    tableau: [
      [...state.tableau[0]],
      [...state.tableau[1]],
      [...state.tableau[2]],
      [...state.tableau[3]],
      [...state.tableau[4]],
      [...state.tableau[5]],
      [...state.tableau[6]],
    ],
  };

  // const newState: Layout = {
  //   ...layout,
  // };

  switch (action.type) {
    case 'getNextCardOnStockPile':
      return getNextCardOnStockPile(newState);

    case 'resetStockPile':
      return resetStockPile(newState);

    case 'openLastCardsOnTableaus':
    {
      const validatedNewState = openLastCardsOnTableaus(newState);
      return validatedNewState === null ? state : validatedNewState;
    }

    case 'moveCard':
      if (!(action.payload)) {
        throw new Error('Missing card details in moveCard function');
      }
      return moveCard(newState, action.payload.draggedCard, action.payload.targetCard);

    default:
      console.warn('Unexpected action type from reducer:', action);
  }

  return newState;
};
