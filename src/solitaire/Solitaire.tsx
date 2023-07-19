import React, { useReducer, useEffect } from 'react';
import { generateDeck, generateLayout } from './controllers/generateDeck';
import { Action, updateLayout } from './controllers/updateLayout';
import { Layout, CardMovementParams } from './types/types';
import { StyledSolitare } from './StyledSolitaire';
import { Stack } from './Components/Stack/Stack';
import { FoundationBase } from './Components/FoundationBase/FoundationBase';

function reducer(state: Layout, action: Action) {
  return updateLayout(state, action);
}

function Solitaire() {
  const deck = generateDeck();
  const [state, dispatch] = useReducer(reducer, generateLayout(deck));

  // console.log(layout);
  console.count('Layout Change');

  const getNextCardOnStockPile = () => {
    dispatch({ type: 'getNextCardOnStockPile' });
  };

  const resetStockPile = () => {
    dispatch({ type: 'resetStockPile' });
  };

  const moveCard = (draggedCard: CardMovementParams, targetCard: CardMovementParams) => {
    dispatch({
      type: 'moveCard',
      payload: {
        draggedCard, targetCard,
      },
    });
  };

  useEffect(() => {
    // Open the closed last cards on tableau Stacks.
    dispatch({ type: 'openLastCardsOnTableaus' });
  }, [state]);

  return (
    <StyledSolitare>
      <div className={'solitaire'}>
        <div className={'container'}>
          <div className={'stack'}>
            { /* Foundation Stack: 1 */ }
            <FoundationBase moveCard={moveCard} stackID={0} />
            <Stack
              stack={state.foundation[0]}
              location={{ pile: 'foundation', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Foundation Stack: 2 */ }
            <FoundationBase moveCard={moveCard} stackID={1} />
            <Stack
              stack={state.foundation[1]}
              location={{ pile: 'foundation', value: 1 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Foundation Stack: 3 */ }
            <FoundationBase moveCard={moveCard} stackID={2} />
            <Stack
              stack={state.foundation[2]}
              location={{ pile: 'foundation', value: 2 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Foundation Stack: 4 */ }
            <FoundationBase moveCard={moveCard} stackID={3} />
            <Stack
              stack={state.foundation[3]}
              location={{ pile: 'foundation', value: 3 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'} />
          <div className={'stack'}>
            { /* Stock Stack: Open */ }
            <Stack
              stack={state.stock[0]}
              location={{ pile: 'stock', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Stock Stack: Closed */ }
            <Stack
              stack={state.stock[1]}
              location={{ pile: 'stock', value: 1 }}
              moveCard={moveCard}
              clickEvent={getNextCardOnStockPile}
            />
            <button className={'closed-stock-base'} onClick={resetStockPile} type={'button'}>Reset</button>
          </div>
        </div>
        <div className={'container tableaus'}>
          <div className={'stack'}>
            { /* Tableau Stack: 1 */ }
            <Stack
              stack={state.tableau[0]}
              location={{ pile: 'tableau', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Tableau Stack: 2 */ }
            <Stack
              stack={state.tableau[1]}
              location={{ pile: 'tableau', value: 1 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Tableau Stack: 3 */ }
            <Stack
              stack={state.tableau[2]}
              location={{ pile: 'tableau', value: 2 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Tableau Stack: 4 */ }
            <Stack
              stack={state.tableau[3]}
              location={{ pile: 'tableau', value: 3 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Tableau Stack: 5 */ }
            <Stack
              stack={state.tableau[4]}
              location={{ pile: 'tableau', value: 4 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Tableau Stack: 6 */ }
            <Stack
              stack={state.tableau[5]}
              location={{ pile: 'tableau', value: 5 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            { /* Tableau Stack: 7 */ }
            <Stack
              stack={state.tableau[6]}
              location={{ pile: 'tableau', value: 6 }}
              moveCard={moveCard}
            />
          </div>
        </div>
      </div>
    </StyledSolitare>
  );
}

export { Solitaire };
