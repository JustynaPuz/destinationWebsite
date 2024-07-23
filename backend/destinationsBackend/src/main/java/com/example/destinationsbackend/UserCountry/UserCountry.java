package com.example.destinationsbackend.UserCountry;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
@Entity
public class UserCountry {

    @EmbeddedId
    private UserCountryId id;

    // Other fields and methods if necessary

    // Default constructor
    public UserCountry() {}

    // Constructor with parameters
    public UserCountry(UserCountryId id) {
        this.id = id;
    }

    // Getters and Setters
    public UserCountryId getId() {
        return id;
    }

    public void setId(UserCountryId id) {
        this.id = id;
    }
}

