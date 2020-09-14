import React from 'react';
import './App.scss';
import PathFindingVisualizer from './PathFindingVisualizer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlagCheckered, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TutorialModal from './components/TutorialModal';

library.add(faFlagCheckered, faPaperPlane);

function App() {
  return (
    <div className="App">
      <TutorialModal />
      <PathFindingVisualizer />
    </div>
  );
}

export default App;
