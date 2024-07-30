package com.example.destinationsbackend.Place;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

    @Autowired
    PlaceService placeService;
    @PostMapping("/jpa/places")
    public ResponseEntity<Void> createPlace(@RequestBody Place place) {
        placeService.savePlace(place);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/jpa/places/{userId}/{countryName}")
    public List<Place> getPlacesByUserIdAndCountry(@PathVariable Long userId, @PathVariable String countryName ) {
        return placeService.getAllByUserIdAndCountryName(userId, countryName);
    }

    @DeleteMapping("/jpa/places/{placeId}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long placeId) {
        placeService.deletePlace(placeId);
        return null;
    }

}
