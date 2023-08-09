import { Layout, CardInterface, CardMovementParams } from '../types/types';
import { cardValues } from './cardProperties';

type MoveCardFunction = (
  layout: Layout,
  draggedCard: CardMovementParams,
  targetCard: CardMovementParams,
) => CardInterface | false;

const getCardData = (layout: Layout, movedCardData: CardMovementParams) => {
  const { id, location } = movedCardData;

  const cardData =
    layout[location.pile][location.value].find((card: CardInterface) => card.id === id);

  if (cardData === undefined) {
    console.warn(layout);
    console.warn(movedCardData);
    throw new Error('Card data was not found!');
  } else {
    return cardData;
  }
};

const isValidMoveToTableauAction = (
  draggedCard: CardInterface,
  targetCard: CardInterface,
) => {
  // Can't move the cards of same two colours next to each other on tableau pile.
  if (draggedCard.colour === targetCard.colour) return false;

  // The value of cards must follow the card order.
  const draggedCardValue = cardValues.indexOf(draggedCard.value);
  const expectedCardValue = cardValues[draggedCardValue - 1];

  if (targetCard.value !== expectedCardValue) return false;

  return true;
};

const isValidMoveToFoundationAction = (
  draggedCard: CardInterface,
  targetCard: CardInterface,
) => {
  // Cards must be of the same type in foundation slot.
  if (draggedCard.type !== targetCard.type) return false;

  // Cards must follow the order in foundation slot.
  const draggedCardValue = cardValues.indexOf(draggedCard.value);
  const expectedCardValue = cardValues[draggedCardValue + 1];

  if (targetCard.value !== expectedCardValue) return false;

  return true;
};

export const validateMoveCardAction: MoveCardFunction = (layout, draggedCard, targetCard) => {
  const draggedCardObject = getCardData(layout, draggedCard);

  // If the dragged card is not yet open, refuse validation.
  if (!draggedCardObject.open) return false;

  // Checking the target card, we behave depending on which pile the card is moving to.
  switch (targetCard.location.pile) {
    case 'tableau':
    {
      // Extracting the card objects to get the values needed for validation.
      const targetCardObject = getCardData(layout, targetCard);

      return isValidMoveToTableauAction(draggedCardObject, targetCardObject) ?
        draggedCardObject : false;
    }

    case 'foundation':
    {
      // Checking if a card is moving to a base foundation slot.
      if (targetCard.id === 'foundation-base') {
        // Only aces can be moved to a base foundation slot.
        if (draggedCardObject.value === 'ace') {
          // Validation to move a card to base foundation slot is successful.
          return draggedCardObject;
        } else {
          return false;
        }
      }

      // If we are moving to an existing card in a foundation, we need targetCardObject.
      const targetCardObject = getCardData(layout, targetCard);

      return isValidMoveToFoundationAction(draggedCardObject, targetCardObject) ?
        draggedCardObject : false;
    }

    case 'stock':
      // You can't move a card to a stock pile.
      return false;

    default:
      throw new Error('Code error: Wrong type of argument for validateMoveCardAction function.');
  }
};
