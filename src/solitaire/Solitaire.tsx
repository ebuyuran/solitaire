import React, { useReducer, useCallback } from 'react';
import { generateDeck, generateLayout } from './controllers/generateDeck';
import { Action, updateLayout } from './controllers/updateLayout';
import { Layout, CardMovementParams } from './types/types';
import { StyledSolitare } from './StyledSolitaire';
import { Stack } from './Components/Stack/Stack';
import { BaseSlot } from './Components/BaseSlot/BaseSlot';

function reducer(layout: Layout, action: Action) {
  return updateLayout(layout, action);
}

function Solitaire() {
  const [layout, dispatch] = useReducer(reducer, generateLayout(generateDeck()));

  // console.log(layout);
  console.count('Layout Change');

  const getNextCardOnStockPile = useCallback(() => {
    dispatch({ type: 'getNextCardOnStockPile' });
  }, []);

  const resetStockPile = useCallback(() => {
    dispatch({ type: 'resetStockPile' });
  }, []);

  const moveCard =
    useCallback((draggedCard: CardMovementParams, targetCard: CardMovementParams) => {
      dispatch({
        type: 'moveCard',
        payload: {
          draggedCard, targetCard,
        },
      });
    }, []);

  return (
    <StyledSolitare>
      <div className={'solitaire'}>
        <div className={'container'}>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={0} slotType={'foundation'} />
            <Stack
              stack={layout.foundation[0]}
              location={{ pile: 'foundation', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={1} slotType={'foundation'} />
            <Stack
              stack={layout.foundation[1]}
              location={{ pile: 'foundation', value: 1 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={2} slotType={'foundation'} />
            <Stack
              stack={layout.foundation[2]}
              location={{ pile: 'foundation', value: 2 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={3} slotType={'foundation'} />
            <Stack
              stack={layout.foundation[3]}
              location={{ pile: 'foundation', value: 3 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'} />
          <div className={'stack'}>
            <Stack
              stack={layout.stock[0]}
              location={{ pile: 'stock', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <Stack
              stack={layout.stock[1]}
              location={{ pile: 'stock', value: 1 }}
              moveCard={moveCard}
              clickEvent={getNextCardOnStockPile}
            />
            <button className={'closed-stock-base'} onClick={resetStockPile} type={'button'}>Reset</button>
          </div>
        </div>
        <div className={'container tableaus'}>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={0} slotType={'tableau'} />
            <Stack
              stack={layout.tableau[0]}
              location={{ pile: 'tableau', value: 0 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={1} slotType={'tableau'} />
            <Stack
              stack={layout.tableau[1]}
              location={{ pile: 'tableau', value: 1 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={2} slotType={'tableau'} />
            <Stack
              stack={layout.tableau[2]}
              location={{ pile: 'tableau', value: 2 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={3} slotType={'tableau'} />
            <Stack
              stack={layout.tableau[3]}
              location={{ pile: 'tableau', value: 3 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={4} slotType={'tableau'} />
            <Stack
              stack={layout.tableau[4]}
              location={{ pile: 'tableau', value: 4 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={5} slotType={'tableau'} />
            <Stack
              stack={layout.tableau[5]}
              location={{ pile: 'tableau', value: 5 }}
              moveCard={moveCard}
            />
          </div>
          <div className={'stack'}>
            <BaseSlot moveCard={moveCard} stackID={6} slotType={'tableau'} />
            <Stack
              stack={layout.tableau[6]}
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
