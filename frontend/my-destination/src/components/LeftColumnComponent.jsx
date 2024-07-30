// LeftColumnComponent.js
import React from 'react';
import CountriesAddingComponent from './CountriesAddingComponent';
import CountriesListComponent from './CountriesListComponent';
import '../css/LeftColumnComponent.css'; 

const LeftColumnComponent = () => {
  return (
    <div className='countries-container-left'>  
    <div className="left-column">
      <CountriesAddingComponent />
      <div className="continents-title">Continents</div>
      <CountriesListComponent />
    </div>
    </div>
  );
};

export default LeftColumnComponent;