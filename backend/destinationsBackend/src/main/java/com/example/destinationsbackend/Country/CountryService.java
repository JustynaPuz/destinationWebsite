package com.example.destinationsbackend.Country;

import com.example.destinationsbackend.Country.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CountryService {

    @Autowired
    private CountryJpaRepository countryJpaRepository;

    public Country getCountryByName(String countryName) {
        return countryJpaRepository.findCountryByName(countryName);
        }
        public List<Country> getAll() {
         return countryJpaRepository.findAll();
        }
}
