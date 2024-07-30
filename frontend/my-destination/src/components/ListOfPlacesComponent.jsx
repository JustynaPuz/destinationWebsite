import React, { Component } from 'react';
import '../css/CountriesComponent.css';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaceIcon from '@mui/icons-material/Place';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceDataService from '../API/PlaceDataService';
import UserDataService from '../API/UserDataService';
import AuthenticationService from './AuthenticationService';
import withNavigation from './WithNavigation';

class ListOfPlacesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [] 
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }

      fetchPlacesData = async () => {
        try {const username = AuthenticationService.getLoggedInUsername();
    
        const user = await UserDataService.retriveUserByUsername(username);
        const userId = user.data.id;

        const { countryName } = this.props;


        const response = await   PlaceDataService.retrivePlacesByUserIdAndCountryName(userId,countryName );


        this.setState({places:response.data});
      }catch(error){
        console.error('Error fetching places data', error);
      }
      }
    
      componentDidMount() {
        this.fetchPlacesData();
      }

      componentDidUpdate() {
        this.fetchPlacesData();
      }


      handleClick = (place) => {
        this.props.navigate(`/countries/places/${place.name}`, { state: { place } })
      }

      handleDelete = async (placeId) => {
        console.log("Id", placeId);
      
        try {
          await PlaceDataService.deletePlaceById(placeId);
          this.setState(prevState => ({
            places: prevState.places.filter(place => place.id !== placeId)
          }));
        } catch (error) {
          console.error('Error deleting place', error);
        }
      }


      render() {

        return (
            <div className="places-list-container">
              <div className="places-list">
                <List component="nav" aria-labelledby="nested-list-subheader">
                {this.state.places.map((place) => (
                  
                    <div key={place.id}>
                    <ListItemButton onClick={() => this.handleClick(place)} sx={{ fontSize: '1.25rem' }} >
                        <ListItemIcon>
                        <PlaceIcon />
                        </ListItemIcon>
                        <ListItemText primary={place.name} />
                        <IconButton 
                            edge="end" 
                            aria-label="delete" 
                            onClick={() => this.handleDelete(place.id)}>
                         <DeleteIcon />
                        </IconButton>
                    </ListItemButton>
                    </div>
                ))}
                </List>
               </div>
            </div>
            
        );
      }

      
}
export default withNavigation(ListOfPlacesComponent);