package com.example.destinationsbackend.UserCountry;

import com.example.destinationsbackend.Country.Country;
import com.example.destinationsbackend.UserAccount.UserAccount;
import com.example.destinationsbackend.UserAccount.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserCountryController {

    @Autowired
    UserCountryJpaRepository userCountryJpaRepository;
    @Autowired
    UserCountryService userCountryService;
    @PostMapping("/jpa/userCountry")
    public ResponseEntity<Void> createUserCountry(@RequestBody UserCountry userCountry) {
        userCountryService.createUserCountry(userCountry);
        return ResponseEntity.ok().build();
    }

    @GetMapping ("/jpa/userCountry/{userId}")
    public List<Country> getUserCountries(@PathVariable Long userId) {
        return userCountryService.getUserCountries(userId);
    }


}
