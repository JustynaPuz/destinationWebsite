package com.example.destinationsbackend.UserAccount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
////    @Autowired
////    private UserAccountJpaRepository userAccountRepository;
////
////    @Override
////    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
////        UserAccount userAccount = userAccountRepository.findUserByUsername(username);
////        if (userAccount == null) {
////            throw new UsernameNotFoundException("User not found with username: " + username);
////        }
////        return User.builder()
////                .username(userAccount.getUsername())
////                .password(userAccount.getPassword()) // Assume the password is already encoded
////                .authorities("USER") // Specify the roles/authorities
////                .build();
////    }
//}
