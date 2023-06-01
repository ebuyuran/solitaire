import { generateDeck } from './controllers';

test('Generates 52 Cards', () => {
  const deck = generateDeck();
  expect(deck.length).toBe(52);
});

test('Ensure that all suits have 13 cards', () => {
  const deck = generateDeck();

  const diamondDeck = deck.filter((card) => card.type === 'diamond');
  const heartDeck = deck.filter((card) => card.type === 'heart');
  const spadeDeck = deck.filter((card) => card.type === 'spade');
  const clubDeck = deck.filter((card) => card.type === 'club');

  const allSuitsHas13Cards =
    diamondDeck.length === 13 &&
    heartDeck.length === 13 &&
    spadeDeck.length === 13 &&
    clubDeck.length === 13;

  expect(allSuitsHas13Cards).toBe(true);
});

test('Ensure that all cards are unique', () => {
  const deck = generateDeck();

  let duplicateFound = false;

  for (let i = 0; i < deck.length; i++) {
    const remainingCards = deck.slice(i + 1);

    remainingCards.forEach((card) => {
      if (deck[i].type === card.type && deck[i].value === card.value) {
        duplicateFound = true;
      }
    });
  }

  expect(duplicateFound).toBe(false);
});
