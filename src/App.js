import React from 'react';
import './App.css';
import BMICalculator from './BMICalculator';
import ProteinPrices from './components/ProteinPrices';

function App() {
  return (
    <div className='App'>
      <BMICalculator />
      <ProteinPrices />
    </div>
  );
}

export default App;
