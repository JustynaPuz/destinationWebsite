package com.example.destinationsbackend.Place;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long countryId;
    private Long usernameId;
    private String description;
    private Double latitude;
    private Double longitude;
    private String imageUrl;

    public Place(Long id, Long countryId, Long usernameId, String description, Double latitude, Double longitude, String imageUrl) {
        this.id = id;
        this.countryId = countryId;
        this.usernameId = usernameId;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageUrl = imageUrl;
    }

    public Place() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public Long getUsernameId() {
        return usernameId;
    }

    public void setUsernameId(Long usernameId) {
        this.usernameId = usernameId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Place place = (Place) o;
        return Objects.equals(id, place.id) && Objects.equals(countryId, place.countryId) && Objects.equals(usernameId, place.usernameId) && Objects.equals(description, place.description) && Objects.equals(latitude, place.latitude) && Objects.equals(longitude, place.longitude) && Objects.equals(imageUrl, place.imageUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, countryId, usernameId, description, latitude, longitude, imageUrl);
    }
}
