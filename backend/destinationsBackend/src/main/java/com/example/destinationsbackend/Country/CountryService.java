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

    public Country save(Country todo) {
        if(todo.getId() == -1 || todo.getId() == 0 ) {
            todo.setId((long) ++idCounter);
            countries.add(todo);
        }else {
            deleteById(todo.getId());
            countries.add(todo);
        }
        return todo;
    }

    public Country deleteById(long id) {
        Country todo = findById(id);
        if(todo == null) return null;

        if(countries.remove(todo)) {
            return todo;
        }
        return null;
    }

    public Country findById(long id) {
        for(Country todo: countries) {
            if(todo.getId() == id) {
                return todo;
            }
        }
        return null;
    }

}
