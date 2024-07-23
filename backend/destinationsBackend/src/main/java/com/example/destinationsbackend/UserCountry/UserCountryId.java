package com.example.destinationsbackend.UserCountry;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserCountryId implements Serializable {

    private Long countryId;
    private Long userId;

    // Default constructor
    public UserCountryId() {}

    // Constructor with parameters
    public UserCountryId(Long countryId, Long userId) {
        this.countryId = countryId;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return Objects.hash(countryId, userId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        UserCountryId that = (UserCountryId) obj;
        return Objects.equals(countryId, that.countryId) &&
                Objects.equals(userId, that.userId);
    }
}

