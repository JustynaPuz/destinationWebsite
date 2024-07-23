package com.example.destinationsbackend.UserAccount;


import com.example.destinationsbackend.Country.Country;
import com.example.destinationsbackend.Country.CountryJpaRepository;
import com.example.destinationsbackend.Country.CountryService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserAccountController {

    @Autowired
    private UserAccountJpaRepository userAccountJpaRepository;

    @GetMapping("/jpa/users/{username}")
    public ResponseEntity<UserAccount> retrieveUserByUsername(@PathVariable String username) {
        UserAccount userAccount = userAccountJpaRepository.findUserByUsername(username);
        if (userAccount != null) {
            return ResponseEntity.ok(userAccount);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
//
//    @GetMapping("/jpa/countries/{continent}")
//    public List<Country> getAllCountriesFromContinent( @PathVariable String continent) {
//        return countryJpaRepository.findCountriesByContinent(continent);
//        // return countryService.findAll();
//
//    }
//
//    @GetMapping("/jpa/users/{username}/countries/{id}")
//    public Country getCountry(@PathVariable String username,  @PathVariable long id) {
//        return countryJpaRepository.findById(id).get();
//        // return countryService.findById(id);
//
//    }
//
//    @DeleteMapping("/jpa/users/{username}/countries/{id}")
//    public ResponseEntity<Void> deleteCountry(@PathVariable String username, @PathVariable long id) {
//
//        Country todo = countryService.deleteById(id);
//        if(todo != null) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.notFound().build();
//
//    }
//
//    @PutMapping("/jpa/users/{username}/countries/{id}")
//    public ResponseEntity<Country> updateCountry(@PathVariable String username, @PathVariable long id, @RequestBody Country country) {
//
//        Country todoUpdated = countryService.save(country);
//
//        return new ResponseEntity<Country>(country, HttpStatus.OK );
//
//    }
//
    @PostMapping("/jpa/users")
    public ResponseEntity<Void> createUserAccount( @RequestBody UserAccount userAccount) {
        userAccountJpaRepository.save(userAccount);
        return ResponseEntity.ok().build();
    }
}
