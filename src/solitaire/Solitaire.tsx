import React, { useState } from 'react';
import { generateDeck, generateLayout } from './controllers/controllers';
import { CardInterface, CardPiles } from './types/types';
import { StyledSolitare } from './StyledSolitaire';

import { Card } from './Components/Card';

function Solitaire() {
  const deck = generateDeck();
  const [layout, setLayout] = useState(generateLayout(deck));

  console.log(layout);

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

  const stackGenerator = (
    stack: CardInterface[],
    location: { stack: CardPiles, value: number },
    clickEvent?: (() => void) | undefined,
  ) => (
    stack.map((card) => (
      <Card
        key={`${card.type}_${card.value}`}
        card={card}
        pile={stack}
        location={location}
        clickEvent={clickEvent}
      />
    ))
  );

  return (
    <StyledSolitare>
      <div className={'solitaire'}>
        <div className={'container'}>
          <div className={'stack'}>1</div>
          <div className={'stack'}>2</div>
          <div className={'stack'}>3</div>
          <div className={'stack'}>4</div>
          <div className={'stack'}>0</div>
          <div className={'stack'}>
            { stackGenerator(layout.stock[0], { stack: 'stock', value: 0 }) }
          </div>
          <div className={'stack'}>
            {
              stackGenerator(
                layout.stock[1],
                { stack: 'stock', value: 1 },
                getNextCardOnStockPile,
              )
            }
          </div>
        </div>
        <div className={'container tableaus'}>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[0], { stack: 'stock', value: 0 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[1], { stack: 'stock', value: 1 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[2], { stack: 'stock', value: 2 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[3], { stack: 'stock', value: 3 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[4], { stack: 'stock', value: 4 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[5], { stack: 'stock', value: 5 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[6], { stack: 'stock', value: 6 }) }
          </div>
        </div>
      </div>
    </StyledSolitare>
  );
}

export { Solitaire };
