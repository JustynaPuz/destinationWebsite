import React, { Component } from "react"
import PlaceDataService from "../API/PlaceDataService"
import AuthenticationService from "./AuthenticationService"
import UserDataService from "../API/UserDataService"
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../css/MapComponent.css';

// Configure Leaflet's default icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


class MapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            places: []
        }
        this.fetchPlaces = this.fetchPlaces.bind(this)
    }

    fetchPlaces= async () =>  {
       try{ const username = AuthenticationService.getLoggedInUsername();
    
        const user = await UserDataService.retriveUserByUsername(username);
        const userId = user.data.id;
        const response = await PlaceDataService.retrivePlacesByUserId(userId)
        console.log("Places", response.data)

        this.setState({places: response.data})
        }catch (error) {
            console.error(error);
        }

    }

    componentDidMount() {
        this.fetchPlaces()
    }


    render() {
        const { places } = this.state;

        const bounds = [
            [-85, -180], // Southwest coordinates
            [85, 180]    // Northeast coordinates
        ];

        return (
            <div className="map-container">
                <MapContainer 
                    center={[0, 0]} 
                    zoom={3} 
                    minZoom={2}
                    style={{ height: "90vh", width: "100%" }} 

                    maxBounds={bounds} // Set the bounds to restrict panning
                    maxBoundsViscosity={1.0} 
                    
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            noWrap={true}
                            
                        />
                        {places.map(place => (
                            <Marker key={place.id} position={[place.latitude, place.longitude]}>
                                <Popup>
                                    {place.name}
                                    <br />
                                    {place.description}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    </div>
            
        )
    }
}
export default MapComponent