package com.example.destinationsbackend.UserAccount;

import com.example.destinationsbackend.Country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountJpaRepository extends JpaRepository<UserAccount, Long> {
}
