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
          <div className={'stack'}>1</div>
          <div className={'stack'}>2</div>
          <div className={'stack'}>3</div>
          <div className={'stack'}>4</div>
          <div className={'stack'}>0</div>
          <div className={'stack'}>
            { layout.stock[0].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.stock[0]}
              />
            )) }
          </div>
          <div className={'stack'}>
            { layout.stock[1].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.stock[1]}
              />
            )) }
          </div>
        </div>
        <div className={'container tableaus'}>
          <div className={'stack'}>
            { layout.tableau[0].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.tableau[0]}
                location={{ stack: 'tableau', value: 0 }}
              />
            )) }
          </div>
          <div className={'stack'}>
            { layout.tableau[1].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.tableau[1]}
                location={{ stack: 'tableau', value: 1 }}
              />
            )) }
          </div>
          <div className={'stack'}>
            { layout.tableau[2].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.tableau[2]}
                location={{ stack: 'tableau', value: 2 }}
              />
            )) }
          </div>
          <div className={'stack'}>
            { layout.tableau[3].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.tableau[3]}
                location={{ stack: 'tableau', value: 3 }}
              />
            )) }
          </div>
          <div className={'stack'}>
            { layout.tableau[4].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.tableau[4]}
                location={{ stack: 'tableau', value: 4 }}
              />
            )) }
          </div>
          <div className={'stack'}>
            { layout.tableau[5].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.tableau[5]}
                location={{ stack: 'tableau', value: 5 }}
              />
            )) }
          </div>
          <div className={'stack'}>
            { layout.tableau[6].map((card) => (
              <Card
                key={`${card.type} ${card.value}`}
                card={card}
                pile={layout.tableau[6]}
                location={{ stack: 'tableau', value: 6 }}
              />
            )) }
          </div>
        </div>
      </div>
    </StyledSolitare>
  );
}

export { Solitaire };
