import React, { Component } from 'react';
import '../css/CountriesListComponent.css'; 
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import PublicIcon from '@mui/icons-material/Public';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CountryDataService from '../API/CountryDataService';
import UserDataService from '../API/UserDataService';
import AuthenticationService from './AuthenticationService';
import withNavigation from './WithNavigation';

class CountriesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: {}, // Use an object to track which continent is open
      continents: [
        "Africa",
        "Asia",
        "Europe",
        "North America",
        "South America",
        "Australia"
      ],
      countries: {} 
    };
  }

  handleCountryClick = (country) => {
    this.props.navigate(`/countries/${country}`)
  }

  handleClick = async (continent) => {
    this.setState((prevState) => ({
      open: {
        ...prevState.open,
        [continent]: !prevState.open[continent]
      }
    }));

    // Fetch countries for the continent if not already fetched
    if (!this.state.countries[continent]) {
    //  const response = await CountryDataService.retriveAllCountriesFromContinent(continent);

    const username = AuthenticationService.getLoggedInUsername();
    
    const user = await UserDataService.retriveUserByUsername(username);
    const userId = user.data.id;

    const response = await CountryDataService.getUserCountries(userId)
    console.log("response:", response);

      // Filter countries by the clicked continent and map to names
    const countryNames = response.data
    .filter(country => country.continent === continent) // Ensure filtering by continent
    .map(country => country.name);
  console.log("names:", countryNames);

  // Update the state with the new countries for the continent
  this.setState(prevState => ({
    countries: {
      ...prevState.countries,
      [continent]: countryNames
    }
  }));
}
};

  render() {
    const { open, continents, countries } = this.state;
    return (
      <div className="countries-list-container">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Continents
            </ListSubheader>
          }
        >
          {continents.map((continent) => (
            <div key={continent}>
              <ListItemButton onClick={() => this.handleClick(continent)}>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText primary={continent} />
                {open[continent] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open[continent]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                  {countries[continent] && countries[continent].map((country) => (
                    <ListItemButton key={country} sx={{ pl: 4 }} onClick={() => this.handleCountryClick(country)}>
                      <ListItemText primary={country} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default withNavigation(CountriesListComponent);
