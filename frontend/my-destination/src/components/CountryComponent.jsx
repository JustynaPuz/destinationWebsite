import React, { Component } from 'react';
import CountryDataService from '../API/CountryDataService';
import '../css/CountriesComponent.css';
import LeftColumnComponent from './LeftColumnComponent';
import ListOfPlacesComponent from './ListOfPlacesComponent';
import { Button } from '@material-ui/core';

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

  handleAddPlace(country) {
    this.props.navigate(`/countries/${country}/addPlace`);
  }

  render() {
    const { country } = this.state;
    return (
      <div className='countries-container' >
        <div className='left-column'>
          <LeftColumnComponent />
        </div>
        <div className='right-content'>
          <div className="country-header">
            <h1>{country.name}</h1>
            <img src={`/images/${country.name}.jpg`} alt={`${country.name}`} className="country-image" />
          </div>
          <div className="country-description">Description: {country.description}</div>
          <div className="list-places-header">
            <Button className="btn btn-success-places" onClick={() => this.handleAddPlace(country.name)}>Add</Button>
            <h2>List of places</h2>
          </div>
          <ListOfPlacesComponent countryName={country.name} country={country} />
        </div>
      </div>
    );
  }
}

export default CountryComponent; 
