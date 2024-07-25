import axios from "axios";
import UserDataService from "../API/UserDataService";

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        const loginRequest = { username, password };

    console.log('Login request:', loginRequest);

    return UserDataService.checkLogin(loginRequest)
        .then(isValid => {
            console.log('Login check response:', isValid);
            if (isValid) {
                const authToken = this.createbasicAuthToken(username, password);
                console.log('Auth token:', authToken);

                return axios.get('http://localhost:8080/basicauth', {
                    headers: { Authorization: authToken }
                });
            } else {
                console.error('Invalid login credentials');
                throw new Error('Invalid login credentials');
            }
        })
        .then(response => {
            console.log('Authentication successful, response:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Authentication failed:', error);
            throw error;
        });
    }


    createbasicAuthToken(username, password) {
        return 'Basic ' + window.btoa( username + ":" + password)
    }

    // executeJwtAuthenticationService(username, password) {
    //     return axios.post('http://localhost:8080/authenticate',{username, password})

    // }

    // registerSuccessfulLoginForJwt(username, token) {
    //     sessionStorage.setItem('authenticatedUser', username);
    //     this.setupAxiosInterceptors(this.createJWTToken(token))

    // }

    // createJWTToken(token) {
    //     return 'Bearer ' + token
    // }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(this.createbasicAuthToken(username, password))
    }
    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }
    
    isUserLoggedIn() {
       let user= sessionStorage.getItem('authenticatedUser')
        if(user == null) return false
        return true
    }

    getLoggedInUsername() {
        let user= sessionStorage.getItem('authenticatedUser')
        if(user == null) return ''
        return user

    }

    setupAxiosInterceptors(token) {

        
        axios.interceptors.request.use(
        (config) => {
            if(this.isUserLoggedIn()) {
                config.headers.authorization = token

            }
            return config

        }

        )
    }

}
export default new AuthenticationService()