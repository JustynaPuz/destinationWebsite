package com.example.destinationsbackend.Country;

import com.example.destinationsbackend.Country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryJpaRepository extends JpaRepository<Country, Long> {

    List<Country> findCountriesByContinent( String continent);
    Country findCountryByName( String continent);

    List<Country> findAllById(Long countryId);
}
