package com.portfolio.config;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * General Application Configuration
 * Contains common beans and configuration
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Configuration
public class ApplicationConfig {

    @Value("${spring.application.name:portfolio-backend}")
    private String applicationName;

    @Value("${server.port:8080}")
    private int serverPort;

    @Bean
    public RestTemplate restTemplate() {
        log.info("Creating RestTemplate bean for external API calls");
        return new RestTemplate();
    }

    @Bean
    @ConfigurationProperties(prefix = "portfolio")
    public PortfolioProperties portfolioProperties() {
        log.info("Loading portfolio properties configuration");
        return new PortfolioProperties();
    }

    /**
     * Portfolio specific properties
     */
    @Setter
    @Getter
    public static class PortfolioProperties {
        // Getters and setters
        private String version = "1.0.0";
        private String author = "Debojit Chakraborty";
        private boolean enableSampleData = true;
        private String supportEmail = "devchakraborty9914@gmail.com";

    }

    // Log application startup info
    @Bean
    public String logApplicationStartup() {
        log.info("=================================================");
        log.info("🚀 {} Starting on Port: {}", applicationName, serverPort);
        log.info("☕ Java Version: {}", System.getProperty("java.version"));
        log.info("🌱 Spring Boot Version: 3.4.8");
        log.info("📍 API Base URL: http://localhost:{}/api", serverPort);
        log.info("=================================================");
        return "startup-logged";
    }
}
