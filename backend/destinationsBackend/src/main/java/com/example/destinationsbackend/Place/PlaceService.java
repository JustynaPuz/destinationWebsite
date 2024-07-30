package com.example.destinationsbackend.Place;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;
@Service
public class PlaceService {

    @Autowired
    private PlaceJpaRepository placeJpaRepository;

    public Optional<Place> getPlaceById(Long id) {
        return placeJpaRepository.findById(id);
    }
    public List<Place> getAllPlacesByUserId(Long id) {
        return placeJpaRepository.findAllByUserId(id);
    }
    public List<Place> getAllByUserIdAndCountryName(Long userId, String countryName) {
        return placeJpaRepository.findAllByUserIdAndCountryName(userId, countryName);
    }

    public Place savePlace (Place place) {
        return placeJpaRepository.save(place);
    }
    public void deletePlace(Long id) {
        placeJpaRepository.deleteById(id);
    }
}
