import React, { Component } from 'react';
import '../css/CountriesComponent.css';
import CountriesAddingComponent from './CountriesAddingComponent';
import CountriesListComponent from './CountriesListComponent';

class MainComponent extends Component {
    render() {
        return (
            <div className='countries-container'>  
                <div className="left-column">
                    <CountriesAddingComponent />

                    <CountriesListComponent />
                </div>

                <div className="right-content">
                    {/* Right content can go here */}
                </div>
            </div>
        );
    }
}

export default MainComponent;
