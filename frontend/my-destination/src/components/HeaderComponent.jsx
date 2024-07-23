import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';
import { Link } from 'react-router-dom';
import '../css/HeaderComponent.css'; // Correct path to the CSS file

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li className="nav-item"><Link className="nav-link" to={`/welcome/${AuthenticationService.getLoggedInUsername()}`}>Home</Link></li>}
                        {isUserLoggedIn && <li className="nav-item"><Link className="nav-link" to="/countries">Countries</Link></li>}
                        {isUserLoggedIn && <li className="nav-item"><Link className="nav-link" to="/map">Map</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isUserLoggedIn && <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
                        {isUserLoggedIn &&  <li className="nav-item"><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default HeaderComponent;
