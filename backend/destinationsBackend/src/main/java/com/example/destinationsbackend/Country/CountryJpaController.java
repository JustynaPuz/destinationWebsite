package com.example.destinationsbackend.Country;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CountryJpaController {

    @Autowired
    private CountryService countryService;
    @Autowired
    private CountryJpaRepository countryJpaRepository;

    @GetMapping("/jpa/users/{username}/countries")
    public List<Country> getAllCountries(@PathVariable String username) {
        return countryService.findAll();

    }

    @GetMapping("/jpa/continents/countries/{continent}")
    public ResponseEntity<List<Country>> getAllCountriesFromContinent(@PathVariable String continent) {
        try {
            List<Country> countries = countryJpaRepository.findCountriesByContinent(continent);
            if (countries.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(countries);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/jpa/countries/{country}")
    public Country getCountry( @PathVariable String country) {
        return countryJpaRepository.findCountryByName(country);
        // return countryService.findAll();

    }

}
