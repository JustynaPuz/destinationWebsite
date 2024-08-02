import React, { Component } from 'react';
import CountryDataService from '../API/CountryDataService';
import '../css/CountriesComponent.css';
import LeftColumnComponent from './LeftColumnComponent';
import ListOfPlacesComponent from './ListOfPlacesComponent';
import RightCountryColumn from './RightCountryColumn';

class CountryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: {},
            loading: true,
            error: null,
        };
    }

    fetchCountryData = (countryName) => {
        console.log("Fetching countryName:", countryName);
        this.setState({ loading: true });
        CountryDataService.retriveCountry(countryName)
            .then(response => {
                console.log("Fetching response:", response.data);
                this.setState({ country: response.data, loading: false });
            })
            .catch(error => {
                console.error("Error fetching country data: ", error);
                this.setState({ error: error.message, loading: false });
            });
    }

    componentDidMount() {
        const { countryName } = this.props.params;
        if (countryName) {
            this.fetchCountryData(countryName);
        }
    }

    componentDidUpdate(prevProps) {
        const { countryName } = this.props.params;
        if (prevProps.params.countryName !== countryName && countryName) {
            this.fetchCountryData(countryName);
        }
    }

    handleAddPlace = (country) => {
        this.props.navigate(`/countries/${country}/addPlace`);
    }

    render() {
        const { country, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className='countries-container'>
                <div className='left-column'>
                    <LeftColumnComponent />
                </div>
                <div className='right-content'>
                    <div className="country-header">
                        <h1>{country.name}</h1>
                    </div>
                    <div className="country-details">
                        <div className="country-description">
                            <p>Description: {country.description}</p>
                            <div className="list-places-header">
                                <button className="btn btn-success-places" onClick={() => this.handleAddPlace(country.name)}>Add</button>
                                <h2>List of places</h2>
                            </div>
                            <ListOfPlacesComponent countryName={country.name} country={country} />
                        </div>
                    </div>
                </div>
                <RightCountryColumn country={country} className='right-country-column' />
            </div>
        );
    }
}

export default CountryComponent;
