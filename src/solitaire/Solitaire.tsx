import React from 'react';
import { generateDeck, generateLayout } from './controllers/controllers';

function Solitaire() {
  const deck = generateDeck();
  const layout = generateLayout(deck);

  console.log(layout);

  return (
    <div className={'solitaire'} />
  );
}

export { Solitaire };
