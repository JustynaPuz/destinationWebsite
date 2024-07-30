import React, { Component } from 'react';
import '../css/LeftColumnComponent.css';
import CountryDataService from '../API/CountryDataService';
import AuthenticationService from './AuthenticationService';
import UserDataService from '../API/UserDataService';

class CountriesAddingComponent extends Component {
    constructor(props) {
        super(props);

        this.continents = [
            "Africa",
            "Asia",
            "Europe",
            "North America",
            "South America",
            "Australia",
            "Antarctica"
        ];

        this.state = {
            showInputs: false,
            selectedContinent: '',
            selectedCountry: '',
            countries: []
        };
    }

    handleAddCountry = () => {
        this.setState({ showInputs: true });
    };

    handleConfirm = async () => {
        try {
            const username = AuthenticationService.getLoggedInUsername();
    
            const user = await UserDataService.retriveUserByUsername(username);
            const userId = user.data.id; 
    
            const country = await CountryDataService.retriveCountry(this.state.selectedCountry);
            const countryId = country.data.id; 
    
            console.log("User ID:", userId);
            console.log("User:", user);
            console.log("Country ID:", countryId);
            console.log("Country :", country);
    
            
            const userCountry = {
                id: {
                    countryId: countryId,
                    userId: userId
                }
            };
             await CountryDataService.saveCountry(userCountry);
    
            // Update the component's state
            this.setState({ showInputs: false, selectedContinent:'', selectedCountry: '' });
        } catch (error) {
            console.error("Error in handleConfirm:", error);
            // Handle errors appropriately, maybe set an error state
        }
    };
    
    

    handleContinentChange = (event) => {
        const continent = event.target.value;
       // const countries = this.continents[continent] || [];
       CountryDataService.retriveAllCountriesFromContinent(continent)
       .then(response => {
        const countryNames = response.data.map(country => country.name);
        this.setState({countries: countryNames})
       });
        this.setState({
            selectedContinent: continent,
            selectedCountry: '' 
        });
    };

    handleCountryChange = (event) => {
        this.setState({ selectedCountry: event.target.value });
    };

    render() {
        const { selectedContinent, countries, selectedCountry, showInputs } = this.state;
        return (
            <div className='countries-adding'>  
        
                <button  className="btn btn-success-country"  onClick={this.handleAddCountry} >Add country</button>
                
                {showInputs && (
                    <div>
                       <select value={this.state.selectedContinent} onChange={this.handleContinentChange} className="input-field-countries">
                        <option value="" disabled={!this.state.selectedContinent}>
                            {this.state.selectedContinent ? 'Select a continent' : 'Continent'}
                        </option>
                        {this.continents.map(continent => (
                            <option key={continent} value={continent}>{continent}</option>
                        ))}
                    </select>


                           {this.state.selectedContinent != '' && (
                             <select value={selectedCountry} onChange={this.handleCountryChange} className="input-field-countries" >
                                <option value="">Country</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>)}
                            <button className="btn btn-success-country" onClick={this.handleConfirm}>Confirm </button>
                    </div>
                )
                }
                    
            

                </div>

            
        );
    }
}

export default CountriesAddingComponent;
