import React from 'react';
import DnDContext from './DnDContext';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

function App() {
  return (
    <DnDContext>
      <div className="app">
        <Sidebar />
        <Editor />
      </div>
    </DnDContext>
  );
}

export default App;
