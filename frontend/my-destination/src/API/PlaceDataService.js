import axios from "axios"
import {JPA_API_URL} from '../Constants'

class PlaceDataService {

    savePlace(place) {
        return axios.post(`${JPA_API_URL}/places`, place);
     }

    retrivePlacesByUserIdAndCountryName(userId, countryName) {
        return  axios.get(`${JPA_API_URL}/places/${userId}/${countryName}`);
 
     }

   deletePlaceById(id) {
      return  axios.delete(`${JPA_API_URL}/places/${id}`);
   }

}
export default new PlaceDataService()