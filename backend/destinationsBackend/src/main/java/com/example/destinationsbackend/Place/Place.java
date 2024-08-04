package com.example.destinationsbackend.Place;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String countryName;
    private Long userId;

    @Column(columnDefinition = "TEXT")
    private String description;
    private Double latitude;
    private Double longitude;
    private String imageUrl;
    public Place() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Place place = (Place) o;
        return Objects.equals(id, place.id) && Objects.equals(countryName, place.countryName) && Objects.equals(userId, place.userId) && Objects.equals(description, place.description) && Objects.equals(latitude, place.latitude) && Objects.equals(longitude, place.longitude) && Objects.equals(imageUrl, place.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, countryName, userId, description, latitude, longitude, imageUrl);
    }
}
