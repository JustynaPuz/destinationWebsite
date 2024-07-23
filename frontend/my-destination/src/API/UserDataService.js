import axios from "axios"
import {JPA_API_URL} from '../Constants'


class UserDataService {

    retriveUserByUsername(name) {
        
        return  axios.get(`${JPA_API_URL}/users/${name}`);
 
     }

     createUserAccount(userAccount) {
        return axios.post(`${JPA_API_URL}/users`, userAccount);
    }



//      retriveAllCountriesFromContinent(continent) {
//       return  axios.get(`${JPA_API_URL}/countries/${continent}`);

//    }

//      deleteCountry(name, id) {
//         return  axios.delete(`${JPA_API_URL}/users/${name}/countries/${id}`);
 
//      }

//      retriveCountry(name, id) {
//         return  axios.get(`${JPA_API_URL}/users/${name}/countries/${id}`);
 
//      }

//      updateCountry(name, id, country) {
//       return  axios.put(`${JPA_API_URL}/users/${name}/countries/${id}`, country);

//    }

//    createCountry(name, country) {
//       return  axios.post(`${JPA_API_URL}/users/${name}/countries/`, country);
//    }
}
export default new UserDataService()