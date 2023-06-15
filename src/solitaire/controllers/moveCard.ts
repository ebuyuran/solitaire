import { Layout, CardInterface, CardMovementParams } from '../types/types';
import { cardValues } from './cardProperties';

type MoveCardFunction = (
  layout: Layout,
  setLayout: React.Dispatch<React.SetStateAction<Layout>>,
  movedCard: CardMovementParams,
  movedOn: CardMovementParams,
) => void;

const isValidMoveToTableauAction = (
  draggedCard: CardInterface,
  targetCard: CardInterface,
) => {
  let isValid = true;

  // Can't move the cards of same two colours next to each other on tableau pile.
  if (draggedCard.colour === targetCard.colour) {
    isValid = false;
    console.warn('Invalid action: Matching colours on tableau pile.');
  }

  // The value of cards must follow the card order.
  const draggedCardValue = cardValues.indexOf(draggedCard.value);
  const targetCardValue = cardValues.indexOf(targetCard.value);

  if (draggedCardValue - targetCardValue !== 1) {
    isValid = false;
    console.warn('Invalid action: Incorrect order on tableau pile.');
  }

  if (isValid) console.log('Valid Action!');

  return isValid;
};

export const moveCard: MoveCardFunction = (layout, setLayout, draggedCard, targetCard) => {
  const getCardData = (movedCardData: CardMovementParams) => {
    const { id, location } = movedCardData;
    return layout[location.pile][location.value].find((card: CardInterface) => card.id === id);
  };

  const draggedCardData = getCardData(draggedCard);
  const targetCardData = getCardData(targetCard);

  // If any of the card objects are not found, throw an error.
  if (draggedCardData === undefined || targetCardData === undefined) {
    throw new Error('Code error: Card data not found');
  }

  // Checking the target card, we behave depending on which pile the card is moving to.
  switch (targetCard.location.pile) {
    case 'tableau':
      if (!isValidMoveToTableauAction(draggedCardData, targetCardData)) {
        // Invalid card action.
        return;
      }
      break;

    case 'foundation':
      break;

    case 'stock':
      throw new Error('Invalid action: Trying to move a card to the stock pile.');

    default:
      throw new Error('Code error: Wrong type of argument for moveCard function.');
  }

  // If no issues are found, move the card.
  // THIS ONLY WORKS FOR SINGLE CARD MOVEMENTS FOR NOW!

  // Remove the card from dragged pile.
  const draggedPile = [...layout[draggedCard.location.pile][draggedCard.location.value]];
  const updatedDraggedPile = draggedPile.slice(0, draggedPile.length - 1);

  // Add the card to the target pile.
  const targetPile = [...layout[targetCard.location.pile][targetCard.location.value]];
  targetPile.push(draggedCardData);

  // Create a new layout object and update the layout.
  const newLayout = { ...layout };
  newLayout[draggedCard.location.pile][draggedCard.location.value] = updatedDraggedPile;
  newLayout[targetCard.location.pile][targetCard.location.value] = targetPile;

  setLayout(newLayout);
};
