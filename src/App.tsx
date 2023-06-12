import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Solitaire } from './solitaire/Solitaire';

function App() {
  return (
    <div className={'app'}>
      <DndProvider backend={HTML5Backend}>
        <Solitaire />
      </DndProvider>
    </div>
  );
}

export { App };
