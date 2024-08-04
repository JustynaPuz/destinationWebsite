import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
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
    const file = event.target.files[0];
    this.setState({ selectedFile: file });
  }

  uploadFile = async () => {
    const { selectedFile, countryName, nameOfPlace } = this.state;
    const uniqueId = uuidv4(); // Generate a unique ID
    const timestamp = Date.now(); // Get current timestamp

    const fileName = `${countryName}_${nameOfPlace}_${timestamp}_${uniqueId}.jpg`; // Generate unique file name

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("fileName", fileName);

    console.log("Uploading file with the following details:");
    console.log("File Name:", fileName);
    console.log("Form Data:", formData);

    try {
      const response = await fetch('http://localhost:8080/filePlaceUpload', { // Adjust this URL to your backend endpoint
        method: 'POST',
        body: formData,
      });

      console.log("Server response:", response);
      if (!response.ok) throw new Error("File upload failed");

      const data = await response.json();
      console.log("Response data:", data);

      if (data && data.fileName) {
        const imageUrl = `/uploads/${data.fileName}`; // Construct the full URL
        return imageUrl;
      } else {
        console.error("Response data does not contain 'fileName' field");
        return null;
      }
    } catch (error) {
      console.error("Error uploading file", error);
      return null;
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
    const { nameOfPlace, description, latitude, longitude } = this.state;
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

    const imageURL = await this.uploadFile();
    if (!imageURL) {
      console.error("Failed to upload image, aborting place creation");
      return;
    }

    const { nameOfPlace, countryName, description, latitude, longitude, userId } = this.state;
    console.log("url", imageURL)

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
