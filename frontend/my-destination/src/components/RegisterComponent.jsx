import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService'
import '../css/LoginComponent.css';
import UserDataService from '../API/UserDataService';

class RegisterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            mail: '',
            phoneNumber: '',
            hasRegisterFailed: false,
            showSuccessMessage: false,
            mailError: '',
            phoneNumberError: '',
            passwordError: '',
            userError: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let mailError = '';
        let phoneNumberError = '';
        let passwordError = '';
        let userError = '';

        if (name === 'mail') {
            const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!mailRegex.test(value)) {
                mailError = 'Invalid email address';
            }        
        }
    
        if (name === 'phoneNumber') {
            const phoneRegex = /^[0-9]{9}$/; 
            if (!phoneRegex.test(value)) {
                phoneNumberError = 'Invalid phone number';
            }
        }
    
        if (name === 'confirmPassword' || name === 'password') {
            if (this.state.password !== value && name === 'confirmPassword') {
                passwordError = 'Passwords do not match';
            } else if (this.state.confirmPassword !== value && name === 'password') {
                passwordError = 'Passwords do not match';
            }
        }
    
        this.setState({
            [name]: value,
            mailError,
            phoneNumberError,
            passwordError,
            userError
        });
    }
    

    registerClicked() {
        const { username, password, confirmPassword, mail, phoneNumber, mailError, phoneNumberError, passwordError } = this.state;

        if (mailError || phoneNumberError || passwordError) {
            this.setState({ hasRegisterFailed: true });
            return;
        }

        if (!username || !password || !confirmPassword || !mail || !phoneNumber) {
            this.setState({ hasRegisterFailed: true, userError: 'All fields are required' });
            return;
        }

        if (password !== confirmPassword) {
            this.setState({ hasRegisterFailed: true, passwordError: 'Passwords do not match' });
            return;
        }

        UserDataService.retriveUserByUsername(this.state.username)
        .then(() => {
            this.setState({ userError: 'Username is already used', hasRegisterFailed: true });
        })
        .catch(() => {
            this.setState({userError: ''})   
            const userAccount = { username, password, mail , phoneNumber };

            UserDataService.createUserAccount(userAccount)
                    .then(() => {
                        this.setState({ showSuccessMessage: true, hasRegisterFailed: false });
                    })
                    .catch(() => {
                        this.setState({ showSuccessMessage: false, hasRegisterFailed: true });
                    });
            });
    }

    render() {
        return (
            <div className="welcome-container">
                <div className="container">
                    {this.state.hasRegisterFailed && <div>Invalid Credentials</div>} 
                    {this.state.showSuccessMessage && <div className="alert alert-warning">Login Successful</div>}
                    <div>
                        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div>
                        Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        Confirm Password: <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
                        {this.state.passwordError && <div style={{ color: 'red',  }}>{this.state.passwordError}</div>}
                    </div>
                    <div>
                        E-mail: <input type="text" name="mail" value={this.state.mail} onChange={this.handleChange} />
                        {this.state.mailError && <div style={{color: 'red'}}>{this.state.mailError}</div>}
                    </div>
                    <div>
                        Phone Number: <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                        {this.state.phoneNumberError && <div style={{color: 'red'}}>{this.state.phoneNumberError}</div>}
                    </div>
                    <button className="btn btn-success" onClick={this.registerClicked}>Confirm</button>
                </div>
            </div>
        );
    }
    

    
}

export default RegisterComponent