package com.example.destinationsbackend.UserCountry;

import com.example.destinationsbackend.Country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCountryJpaRepository extends JpaRepository<UserCountry, UserCountryId> {
}
