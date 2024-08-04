package com.example.destinationsbackend.Place;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {

    @Autowired
    private PlaceJpaRepository placeJpaRepository;
    @Value("${upload.dir}")
    private String uploadDir;

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
            String imageUrl = place.get().getImageUrl();

            // Delete the associated image file
            if (imageUrl != null && !imageUrl.isEmpty()) {
                if (imageUrl.startsWith("/uploads/")) {
                    imageUrl = imageUrl.substring("/uploads/".length());
                }

                Path imagePath = Paths.get(uploadDir, imageUrl).toAbsolutePath().normalize();
                System.out.println("Image path" + imagePath);
                try {
                    System.out.println("Attempting to delete file at: " + imagePath);
                    Files.delete(imagePath);
                    System.out.println("File deleted: " + imagePath);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to delete image file: " + imageUrl, e);
                }
            }

            // Delete the place from the database
            placeJpaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Place not found with id " + id);
        }
    }
}
