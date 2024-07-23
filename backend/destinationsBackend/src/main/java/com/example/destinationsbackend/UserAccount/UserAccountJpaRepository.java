package com.example.destinationsbackend.UserAccount;

import com.example.destinationsbackend.Country.Country;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAccountJpaRepository extends JpaRepository<UserAccount, Long> {
    UserAccount findUserByUsername(String username);
}
