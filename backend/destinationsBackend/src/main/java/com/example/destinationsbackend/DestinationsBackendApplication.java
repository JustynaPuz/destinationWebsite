package com.example.destinationsbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.example.destinationsbackend"})
public class DestinationsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(DestinationsBackendApplication.class, args);
    }

}
