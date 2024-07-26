// LeftColumnComponent.js
import React from 'react';
import CountriesAddingComponent from './CountriesAddingComponent';
import CountriesListComponent from './CountriesListComponent';
import '../css/CountriesComponent.css'; // Adjust the path as necessary

const LeftColumnComponent = () => {
  return (
    <div className="left-column">
      <CountriesAddingComponent />
      <CountriesListComponent />
    </div>
  );
};

export default LeftColumnComponent;