package com.example.destinationsbackend.Place;

import com.example.destinationsbackend.Country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceJpaRepository extends JpaRepository<Place, Long> {
}
