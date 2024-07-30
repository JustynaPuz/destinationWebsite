package com.example.destinationsbackend.Country;

import com.example.destinationsbackend.Country.Country;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CountryService {

    private static List<Country> countries = new ArrayList();
    private static int idCounter = 0;


    public List<Country> findAll() {
        return countries;

    }


}
