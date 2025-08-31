package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Server {
    public void start(String[] args) {
        SpringApplication.run(Server.class, args);
    }
}
