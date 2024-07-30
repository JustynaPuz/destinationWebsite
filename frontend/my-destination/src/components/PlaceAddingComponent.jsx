import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';
import '../css/PlaceAdding.css';
import '../css/CountriesComponent.css';
import UserDataService from '../API/UserDataService';
import LeftColumnComponent from './LeftColumnComponent';
import PlaceDataService from '../API/PlaceDataService';

class PlaceAddingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfPlace: '',
      countryName: this.props.params.countryName, // Get countryName from params
      description: '',
      latitude: '',
      longitude: '',
      userId: '',
      imageURL: '',
      showSuccessMessage: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.confirmClicked = this.confirmClicked.bind(this);
  }

  fetchPlaceData = async () => {
    const username = AuthenticationService.getLoggedInUsername();
    const user = await UserDataService.retriveUserByUsername(username);
    const userId = user.data.id;

    this.setState({ userId: userId });
    console.log("CountryName:", this.props.params.countryName);
  }

  componentDidMount() {
    this.fetchPlaceData();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  validateForm = () => {
    const { nameOfPlace, description, latitude, longitude, imageURL } = this.state;
    const errors = {};
    if (!nameOfPlace) errors.nameOfPlace = "Name of place is required";
    if (!description) errors.description = "Description is required";
    if (!latitude || isNaN(latitude)) errors.latitude = "Valid latitude is required";
    if (!longitude || isNaN(longitude)) errors.longitude = "Valid longitude is required";
    if (!imageURL) errors.imageURL = "Image URL is required";
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  confirmClicked = async () => {
    if (!this.validateForm()) return;

    const { nameOfPlace, countryName, description, latitude, longitude, userId, imageURL } = this.state;

    const place = {
      name: nameOfPlace,
      countryName: countryName,
      userId: userId,
      description: description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      imageUrl: imageURL
    };

    try {
      await PlaceDataService.savePlace(place);
      this.setState({ showSuccessMessage: true });
    } catch (error) {
      console.error("Error saving place", error);
      this.setState({ showSuccessMessage: false });
    }
  }

  render() {
    const { errors, showSuccessMessage } = this.state;

    return (
      <div className='countries-container'>
        <div className="left-column">
          <LeftColumnComponent />
        </div>

        <div className="right-content">
          {showSuccessMessage && <div className="alert alert-success">Place added successfully!</div>}
          <h1>Add your place!</h1>
          <div>
            Name of place: 
            <input type="text" name="nameOfPlace" value={this.state.nameOfPlace} onChange={this.handleChange} />
            {errors.nameOfPlace && <div className="error">{errors.nameOfPlace}</div>}
          </div>
          <div>
            Description: 
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
          <div>
            Longitude: 
            <input type="text" name="longitude" value={this.state.longitude} onChange={this.handleChange} />
            {errors.longitude && <div className="error">{errors.longitude}</div>}
          </div>
          <div>
            Latitude: 
            <input type="text" name="latitude" value={this.state.latitude} onChange={this.handleChange} />
            {errors.latitude && <div className="error">{errors.latitude}</div>}
          </div>
          <div>
            Image(URL): 
            <input type="text" name="imageURL" value={this.state.imageURL} onChange={this.handleChange} />
            {errors.imageURL && <div className="error">{errors.imageURL}</div>}
          </div>
          <button className="btn btn-success" onClick={this.confirmClicked}>Confirm</button>
        </div>
      </div>
    );
  }
}

export default PlaceAddingComponent; 
