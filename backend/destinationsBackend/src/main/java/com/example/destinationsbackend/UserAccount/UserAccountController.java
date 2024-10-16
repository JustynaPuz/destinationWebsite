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
    @Autowired
    private UserAccountService userAccountService;

    @GetMapping("/jpa/users/{username}")
    public ResponseEntity<UserAccount> retrieveUserByUsername(@PathVariable String username) {
        UserAccount userAccount = userAccountJpaRepository.findUserByUsername(username);
        if (userAccount != null) {
            return ResponseEntity.ok(userAccount);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/jpa/users/checkLogin")
    public ResponseEntity<Boolean> checkLogin(@RequestBody LoginRequest loginRequest) {
        boolean isValid = userAccountService.checkLogin(loginRequest.getUsername(), loginRequest.getPassword());

        if (isValid) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @PostMapping("/jpa/users")
    public ResponseEntity<Void> createUserAccount( @RequestBody UserAccount userAccount) {
       // userAccountJpaRepository.save(userAccount);
        userAccountService.saveUserAccount(userAccount);
        return ResponseEntity.ok().build();
    }
}
