import axios from "axios"
import {JPA_API_URL} from '../Constants'

class CountryDataService {

    retriveAllCountries(name) {
        return  axios.get(`${JPA_API_URL}/users/${name}/countries`);
     }

     retriveCountry(country) {
      return  axios.get(`${JPA_API_URL}/countries/${country}`);
   }

     retriveAllCountriesFromContinent(continent) {
      return  axios.get(`${JPA_API_URL}/continents/${continent}`);
   }

   saveCountry(country) {
      return axios.post(`${JPA_API_URL}/userCountry`, country);
   }

   getUserCountries(userId) {
      return  axios.get(`${JPA_API_URL}/userCountry/${userId}`);
   }

}
export default new CountryDataService()