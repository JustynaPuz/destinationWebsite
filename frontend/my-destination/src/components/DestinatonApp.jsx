import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import withNavigation from './WithNavigation';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import WelcomeComponent from './WelcomeComponent';
import withParams from './withParams';
import AuthenticatedRoute from './AuthenticatedRoute'
import CountriesComponent from './CountriesComponent'

class DestinationApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const CountriesComponentWithNavigation = withNavigation(CountriesComponent)

            return (
                <div className="DestinationApp">
            <Router>
                <HeaderComponentWithNavigation/>
                <Routes>
                    <Route path="/" element={<LoginComponentWithNavigation />} />
                    <Route path="/login" element={<LoginComponentWithNavigation />} />
                    <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                    <Route path="/countries" element={<AuthenticatedRoute><CountriesComponentWithNavigation /></AuthenticatedRoute>} />
                    <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
                </Routes>
                <FooterComponent/>
            </Router>
        </div>
            )
    }
}
export default DestinationApp;