import React, { Component } from 'react';
import '../css/CountriesComponent.css';
import LeftColumnComponent from './LeftColumnComponent';

class MainComponent extends Component {
    render() {
        return (
            <div className='countries-container'>  
                <div className="left-column">
                    <LeftColumnComponent/>
                </div>

                <div className="right-content">
                    <div className="image-grid">
                        <img src="images/antartica.jpg" alt="Image 1" className="grid-image"/>
                        <img src="images/desert.jpg" alt="Image 2" className="grid-image"/>
                        <img src="images/field.jpg" alt="Image 3" className="grid-image"/>
                        <img src="images/mountains.jpg" alt="Image 4" className="grid-image"/>
                        <img src="images/lake.jpg" alt="Image 5" className="grid-image"/>
                        <img src="images/jungle.jpg" alt="Image 6" className="grid-image"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainComponent;

