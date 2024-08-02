import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';
import '../css/PlaceAdding.css';
import UserDataService from '../API/UserDataService';
import LeftColumnComponent from './LeftColumnComponent';
import PlaceDataService from '../API/PlaceDataService';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CountryDataService from '../API/CountryDataService';

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
      country: {},
      showSuccessMessage: false,
      errors: {},
      selectedFile: null
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.confirmClicked = this.confirmClicked.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  fetchPlaceData = async () => {
    const username = AuthenticationService.getLoggedInUsername();
    const user = await UserDataService.retriveUserByUsername(username);
    const userId = user.data.id;

    this.setState({ userId: userId });
    console.log("CountryName:", this.props.params.countryName);
  }

  fetchCountry = async () => {
    try {
      const response = await CountryDataService.retriveCountry(this.state.countryName);
      console.log("Country response", response.data); // Log the response before setting the state
      this.setState({ country: response.data });
    } catch (error) {
      console.error("Error fetching country data", error);
    }
  }
  handleFileChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    try {
      const response = await fetch('URL_TO_YOUR_UPLOAD_API', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      this.setState({ imageURL: data.url });
    } catch (error) {
      console.error("Error uploading file", error);
    }
  }
  

  componentDidMount() {
    this.fetchPlaceData();
    this.fetchCountry();
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
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  confirmClicked = async () => {
    if (!this.validateForm()) return;
    await this.uploadFile();

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

  handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    this.setState({
      latitude: lat,
      longitude: lng
    });
  }

  render() {
    const { errors, showSuccessMessage, latitude, longitude, country } = this.state;
    const position = [country.latitude, country.longitude]; 
    console.log("Position", position)

    const MapClickHandler = () => {
      useMapEvents({
        click: this.handleMapClick,
      });
      return null;
    };

    return (
      <div className='countries-container'>
        <div className="left-column">
          <LeftColumnComponent />
        </div>
        <div className="right-content">
          {showSuccessMessage && <div className="alert alert-success">Place added successfully!</div>}
          <div className='place-adding-header'>Add your place!</div>
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
            <input type="text" name="longitude" value={longitude} onChange={this.handleChange} />
            {errors.longitude && <div className="error">{errors.longitude}</div>}
          </div>
          <div>
            Latitude:
            <input type="text" name="latitude" value={latitude} onChange={this.handleChange} />
            {errors.latitude && <div className="error">{errors.latitude}</div>}
          </div>
          <div>
            Upload Image:
            <input type="file" onChange={this.handleFileChange} />
            <button onClick={this.uploadFile}>Upload</button>
          </div>
          <button className="btn btn-success" onClick={this.confirmClicked}>Confirm</button>
          
        </div>
        <div className='right-place-adding-column'>
            <div style={{ height: '400px', marginTop: '20px' }}>
              {country.latitude && country.longitude && (
                <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {latitude && longitude && (
                    <Marker position={[latitude, longitude]}>
                      <Popup>
                        {this.state.nameOfPlace}
                      </Popup>
                    </Marker>
                  )}
                  <MapClickHandler />
                </MapContainer>
              )}
            </div>
          </div>
      </div>
    );
  }
}

export default PlaceAddingComponent;