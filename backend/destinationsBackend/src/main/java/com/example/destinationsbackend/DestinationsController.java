package com.example.destinationsbackend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DestinationsController {

    @RequestMapping
    public String helloWolrd() {
        return "Hello";
    }

    @RequestMapping("/goodbye")
    public String goodbye() {
        return "Goodbye";
    }
}
