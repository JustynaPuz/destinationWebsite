import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'
import '../css/LoginComponent.css';

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'Justyna',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({
           [event.target.name]:
            event.target.value
        })
        
    }

    loginClicked() {
        console.log('Login clicked with username:', this.state.username);
    
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                console.log('Authentication successful for user:', this.state.username);
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.props.navigate(`/welcome/${this.state.username}`);
                this.setState({ showSuccessMessage: true, hasLoginFailed: false });
            })
            .catch(error => {
                console.error('Authentication failed:', error);
                this.setState({ showSuccessMessage: false, hasLoginFailed: true });
            });
    }
    

    render() {
        return (
            <div className="welcome-container">
                <h1>Login</h1>
                <div className = "container">
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div className="alter aler-warning">Login Succesfull</div>}
                 User Name: <input type="text" name = "username" value = {this.state.username} onChange={this.handleChange}/>
            Password: <input type = "password" name = "password" value = {this.state.password} onChange={this.handleChange}/>
            <button className="btn btn-success" onClick = {this.loginClicked }>Login</button>
            </div>

            </div>
           
        )
    }

    
}

export default LoginComponent