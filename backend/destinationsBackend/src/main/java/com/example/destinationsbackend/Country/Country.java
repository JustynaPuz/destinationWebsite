package com.example.destinationsbackend.Country;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String continent;
    private String description;
    private Double latitude;
    private Double longitude;
    private String imageUrl;

    public Country(Long id, String name, String continent, String description, Double latitude, Double longitude, String imageUrl) {
        this.id = id;
        this.name = name;
        this.continent = continent;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageUrl = imageUrl;  // Inicjalizacja nowego pola
    }

    public Country() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
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
        Country country = (Country) o;
        return Objects.equals(id, country.id) &&
                Objects.equals(name, country.name) &&
                Objects.equals(continent, country.continent) &&
                Objects.equals(description, country.description) &&
                Objects.equals(latitude, country.latitude) &&
                Objects.equals(longitude, country.longitude) &&
                Objects.equals(imageUrl, country.imageUrl);  // Uwzględnij imageUrl w equals
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, continent, description, latitude, longitude, imageUrl);
    }
}
