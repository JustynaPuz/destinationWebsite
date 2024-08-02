package com.example.destinationsbackend.Place;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {

    @Autowired
    private PlaceJpaRepository placeJpaRepository;

    public Optional<Place> getPlaceById(Long id) {
        return placeJpaRepository.findById(id);
    }

    public List<Place> getAllPlacesByUserId(Long userId) {
        return placeJpaRepository.findAllByUserId(userId);
    }

    public List<Place> getAllByUserIdAndCountryName(Long userId, String countryName) {
        return placeJpaRepository.findAllByUserIdAndCountryName(userId, countryName);
    }

    public Place savePlace(Place place) {
        return placeJpaRepository.save(place);
    }

    public void deletePlace(Long id) {
        Optional<Place> place = placeJpaRepository.findById(id);
        if (place.isPresent()) {
            placeJpaRepository.deleteById(id);
        }

    }
}
