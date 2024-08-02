import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import withNavigation from './WithNavigation';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import WelcomeComponent from './WelcomeComponent';
import withParams from './withParams';
import AuthenticatedRoute from './AuthenticatedRoute';
import CountriesComponent from './CountriesComponent';
import RegisterComponent from './RegisterComponent';
import CountriesListComponent from './CountriesListComponent';
import CountryComponent from './CountryComponent';
import PlaceAddingComponent from './PlaceAddingComponent';
import PlaceComponent from './PlaceComponent';
import { CssBaseline } from '@material-ui/core';
import MapComponent from './MapComponent';

class DestinationApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const CountriesComponentWithNavigation = withNavigation(CountriesComponent);
        const RegisterComponentWithNavigation = withNavigation(RegisterComponent);
        const CountryComponentWithParamsAndNavigation = withNavigation(withParams(CountryComponent));
        const PlaceAddingComponentWithParamsAndNavigation = withNavigation(withParams(PlaceAddingComponent));
        const PlaceComponentWithParamsAndNavigation = withNavigation(withParams(PlaceComponent));
        const MapComponentWithNavigation = withNavigation(MapComponent);

        return (
            <div className="DestinationApp">
                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/register" element={<RegisterComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                        <Route path="/countries" element={<AuthenticatedRoute><CountriesComponentWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/countries/:countryName" element={<AuthenticatedRoute><CountryComponentWithParamsAndNavigation /></AuthenticatedRoute>} />
                        <Route path="/countries/:countryName/addPlace" element={<AuthenticatedRoute><PlaceAddingComponentWithParamsAndNavigation /></AuthenticatedRoute>} />
                        <Route path="/countries/places/:placeName" element={<AuthenticatedRoute><PlaceComponentWithParamsAndNavigation /></AuthenticatedRoute>} />
                        <Route path="/map" element={<AuthenticatedRoute><MapComponentWithNavigation /></AuthenticatedRoute>} />
                        <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
                    </Routes>
                    <FooterComponent />
                </Router>
            </div>
        );
    }
}
export default DestinationApp;
