package com.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

/**
 * Portfolio Application - Java 21 with Spring Boot 3.4.8
 * Backend API for portfolio management system
 *
 * @author Debojit Chakraborty
 */
@SpringBootApplication
@Slf4j
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        log.info("🚀 Portfolio Backend Started Successfully!");
        log.info("📍 API Base URL: http://localhost:8080/api");
        log.info("🔍 Health Check: http://localhost:8080/api/actuator/health");
    }
}
