import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import HelloWorldService from '../API/HelloWorldService'
import '../css/WelcomeComponent.css';


class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage= this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse= this.handleSuccessfulResponse.bind(this)
        this.handleError= this.handleError.bind(this)
        this.state = {
            welcomeMasseage: ' '
        }
        
    }
    render() {
        return (
            <div className="welcome-container">
                <h1>Welcome!</h1>

                <div className="container welcome-message">
                    {this.state.welcomeMasseage}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.retrieveWelcomeMessage(); // Wywołaj funkcję przy ładowaniu strony
    }

    retrieveWelcomeMessage() {

       HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch( error => this.handleError(error))

    }

    handleSuccessfulResponse(response) {
        this.setState({welcomeMasseage: response.data.message})

    } 

    handleError(error) {

        let ErrorMessage = ''

        if(error.message) {
            ErrorMessage += error.message
        }

        if(error.data && error.response.data) {
            ErrorMessage += error.response.data.message
        }
        this.setState({welcomeMasseage: ErrorMessage})
    }
}

export default WelcomeComponent