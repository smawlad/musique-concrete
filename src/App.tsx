import React from 'react';
import './App.css';
import PageLayout from './components/PageLayout';
import FmSynth from './components/synthesis/FmSynth';

function App() {
  return (
    <div className="App">
      <PageLayout>
        <h1>Musique Concrète</h1>
        <FmSynth />
      </PageLayout>
    </div>
  );
}

export default App;
