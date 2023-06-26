import React, { useState, useEffect } from 'react';
import { generateDeck, generateLayout } from './controllers/generateDeck';
import { CardInterface, CardLocation } from './types/types';
import { StyledSolitare } from './StyledSolitaire';

import { Card } from './Components/Card/Card';
import { FoundationBase } from './Components/FoundationBase/FoundationBase';

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
    location: CardLocation,
    clickEvent?: (() => void) | undefined,
  ) => (
    stack.map((card) => (
      <Card
        key={`${card.type}_${card.value}`}
        card={card}
        pile={stack}
        location={location}
        clickEvent={clickEvent}
        layout={layout}
        setLayout={setLayout}
      />
    ))
  );

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
            <FoundationBase layout={layout} setLayout={setLayout} stackID={0} />
            { stackGenerator(layout.foundation[0], { pile: 'foundation', value: 0 }) }
          </div>
          <div className={'stack'}>
            <FoundationBase layout={layout} setLayout={setLayout} stackID={1} />
            { stackGenerator(layout.foundation[1], { pile: 'foundation', value: 1 }) }
          </div>
          <div className={'stack'}>
            <FoundationBase layout={layout} setLayout={setLayout} stackID={2} />
            { stackGenerator(layout.foundation[2], { pile: 'foundation', value: 2 }) }
          </div>
          <div className={'stack'}>
            <FoundationBase layout={layout} setLayout={setLayout} stackID={3} />
            { stackGenerator(layout.foundation[3], { pile: 'foundation', value: 3 }) }
          </div>
          <div className={'stack'} />
          <div className={'stack'}>
            { stackGenerator(layout.stock[0], { pile: 'stock', value: 0 }) }
          </div>
          <div className={'stack'}>
            {
              stackGenerator(
                layout.stock[1],
                { pile: 'stock', value: 1 },
                getNextCardOnStockPile,
              )
            }
          </div>
        </div>
        <div className={'container tableaus'}>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[0], { pile: 'tableau', value: 0 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[1], { pile: 'tableau', value: 1 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[2], { pile: 'tableau', value: 2 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[3], { pile: 'tableau', value: 3 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[4], { pile: 'tableau', value: 4 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[5], { pile: 'tableau', value: 5 }) }
          </div>
          <div className={'stack'}>
            { stackGenerator(layout.tableau[6], { pile: 'tableau', value: 6 }) }
          </div>
        </div>
      </div>
    </StyledSolitare>
  );
}

export { Solitaire };
