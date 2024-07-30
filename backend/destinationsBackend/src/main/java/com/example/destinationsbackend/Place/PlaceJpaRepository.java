package com.example.destinationsbackend.Place;

import com.example.destinationsbackend.Country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceJpaRepository extends JpaRepository<Place, Long> {
    List<Place> findAllByUserId(Long userId);
    List<Place> findAllByUserIdAndCountryName(Long userId, String countryName);
}
