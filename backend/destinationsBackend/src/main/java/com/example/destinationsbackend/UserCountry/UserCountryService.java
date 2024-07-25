package com.example.destinationsbackend.UserCountry;

import com.example.destinationsbackend.Country.Country;
import com.example.destinationsbackend.Country.CountryJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserCountryService {

    @Autowired
    UserCountryJpaRepository userCountryJpaRepository;
    @Autowired
    CountryJpaRepository countryJpaRepository;

    public UserCountry createUserCountry(UserCountry userCountry) {
       return userCountryJpaRepository.save(userCountry);

    }
    public List<Long> getCountriesId(Long userId) {
        return userCountryJpaRepository.findCountryIdsByUserId(userId);
    }

    public List<Country> getUserCountries(Long userId) {
        List<Long> ids = this.getCountriesId(userId);

        return countryJpaRepository.findAllById(ids);
    }
}
