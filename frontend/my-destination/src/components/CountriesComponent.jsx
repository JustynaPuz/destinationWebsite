import React, { Component } from 'react';
import '../css/CountriesComponent.css';
import CountriesAddingComponent from './CountriesAddingComponent';
import CountriesListComponent from './CountriesListComponent';
import LeftColumnComponent from './LeftColumnComponent';

class MainComponent extends Component {
    render() {
        return (
            <div className='countries-container'>  
                <div className="left-column">
                    <LeftColumnComponent/>
                </div>

                <div className="right-content">
                    {/* Right content can go here */}
                </div>
            </div>
        );
    }
}

export default MainComponent;
