import React, { useState } from 'react';
import { generateDeck, generateLayout } from './controllers/controllers';
import { StyledSolitare } from './StyledSolitaire';

import { Card } from './Components/Card';

function Solitaire() {
  const deck = generateDeck();
  const [layout, setLayout] = useState(generateLayout(deck));

  console.log(layout);

  return (
    <StyledSolitare>
      <div className={'solitaire'}>
        <div className={'container'}>
          <div className={'foundation'}>
            <div className={'stack'}>1</div>
            <div className={'stack'}>2</div>
            <div className={'stack'}>3</div>
            <div className={'stack'}>4</div>
          </div>
          <div className={'stock'}>
            <div className={'open'}>1</div>
            <div className={'closed'}>
              { layout.stock.closed.map((card) => <Card key={`${card.type} ${card.value}`} card={card} />) }
            </div>
          </div>
        </div>
      </div>
    </StyledSolitare>
  );
}

export { Solitaire };
