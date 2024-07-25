package com.example.destinationsbackend.UserCountry;

import com.example.destinationsbackend.Country.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserCountryJpaRepository extends JpaRepository<UserCountry, UserCountryId> {
    @Query("SELECT uc.id.countryId FROM UserCountry uc WHERE uc.id.userId = :userId")
    List<Long> findCountryIdsByUserId(Long userId);
}
