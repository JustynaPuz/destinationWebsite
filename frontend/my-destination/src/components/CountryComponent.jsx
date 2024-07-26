import React, { Component } from 'react';
import CountryDataService from '../API/CountryDataService';
import '../css/CountriesComponent.css';
import CountriesAddingComponent from './CountriesAddingComponent';
import CountriesListComponent from './CountriesListComponent';

class CountryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {}
    };
  }

  fetchCountryData = async () => {
    const response = await CountryDataService.retriveCountry(this.props.params.countryName);
    this.setState({ country: response.data });
  }

  componentDidMount() {
    this.fetchCountryData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.countryName !== this.props.params.countryName) {
      this.fetchCountryData();
    }
  }

  render() {
    const { country } = this.state;
    return (
      <div className="countries-container">
        <div className="left-column">
          <CountriesAddingComponent />
          <CountriesListComponent />
        </div>
        <div className="right-content">
          <div className="country-header">
            <img src="/images/Egypt.jpg" alt={`${country.name}`} className="country-image" />
            <h1>{country.name}</h1>
          </div>
          <p className="country-description">Description: {country.description}</p>
          <h2>List of places</h2>
          <div className="places-list">
            {/* Add list of places here */}
            <ul>
              <li>Place 1</li>
              <li>Place 2</li>
              <li>Place 3</li>
              {/* Add more places as needed */}
            </ul>
          </div>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
        </div>
      </div>
    );
  }
}

export default CountryComponent;
