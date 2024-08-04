import React, { Component } from 'react';
import '../css/CountriesComponent.css';
import '../css/CountryRightComponent.css';
import '../css/LeftColumnComponent.css';
import LeftColumnComponent from './LeftColumnComponent';
import withLocation from './withLocation';
import RightPlaceColumn from './RightPlaceColumn';

class PlaceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.props.location.state?.place || {},
    };
  }

  render() {
    const { place } = this.state;
    return (
      <div className="countries-container">
        <div className="left-column">
          <LeftColumnComponent />
        </div>
        <div className="right-content">
          <div className="place-header">
            <h1>{place.name}</h1>
          </div>
          <div className="place-description">
            <h2>Description</h2>
            <p>{place.description}</p>
          </div>
          <div className="place-details">
            <h2>Details</h2>
            <ul>
              <li><strong>Country Name:</strong> {place.countryName}</li>
              <li><strong>Latitude:</strong> {place.latitude}</li>
              <li><strong>Longitude:</strong> {place.longitude}</li>
            </ul>
          </div>
        </div>
        <RightPlaceColumn place={place} className='right-country-column' />
      </div>
    );
  }
}

export default withLocation(PlaceComponent);
