import React, { Component } from 'react';
import '../css/CountriesComponent.css';
import CountriesListComponent from './CountriesListComponent'

class CountriesComponent extends Component {
    


    render() {
        return (
            <div className='countries-container'>  
            <ul className="nav flex-column left-column">
                <CountriesListComponent></CountriesListComponent>
                    
                </ul>

                <div className="right-content">
                </div>
                </div>

            
        );
    }
}

export default CountriesComponent;
