package com.example.destinationsbackend.UserAccount;

import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountJpaRepository userAccountJpaRepository;

    public Boolean checkLogin(String username, String password) {
        UserAccount user = userAccountJpaRepository.findUserByUsername(username);
        if(user != null && user.getPassword().equals(password)) {
            return Boolean.TRUE;
        }else {
            return Boolean.FALSE;
        }
    }



    public UserAccount saveUserAccount(UserAccount userAccount) {
        return userAccountJpaRepository.save(userAccount);
    }
}
