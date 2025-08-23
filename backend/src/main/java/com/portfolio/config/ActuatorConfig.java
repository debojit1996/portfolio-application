package com.portfolio.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Spring Boot Actuator Configuration
 * Custom health and info endpoints
 * Updated for Spring Boot 3.4.8 with correct InfoContributor interface
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Component
public class ActuatorConfig {

    /**
     * Custom health indicator for portfolio application
     */
    @Component
    public static class PortfolioHealthIndicator implements HealthIndicator {

        @Override
        public Health health() {
            log.debug("Checking portfolio application health");

            try {
                // Add custom health checks here
                boolean databaseHealthy = checkDatabaseHealth();
                boolean apiHealthy = checkApiHealth();

                if (databaseHealthy && apiHealthy) {
                    return Health.up()
                            .withDetail("database", "UP")
                            .withDetail("api", "UP")
                            .withDetail("timestamp", LocalDateTime.now())
                            .withDetail("status", "Portfolio API is running smoothly")
                            .build();
                } else {
                    return Health.down()
                            .withDetail("database", databaseHealthy ? "UP" : "DOWN")
                            .withDetail("api", apiHealthy ? "UP" : "DOWN")
                            .withDetail("timestamp", LocalDateTime.now())
                            .build();
                }
            } catch (Exception e) {
                log.error("Health check failed", e);
                return Health.down()
                        .withDetail("error", e.getMessage())
                        .withDetail("timestamp", LocalDateTime.now())
                        .build();
            }
        }

        private boolean checkDatabaseHealth() {
            // Add actual database health check logic
            return true;
        }

        private boolean checkApiHealth() {
            // Add actual API health check logic
            return true;
        }
    }

    /**
     * Custom info contributor for application details
     * Fixed for Spring Boot 3.4.8 - using correct Info.Builder interface
     */
    @Component
    public static class PortfolioInfoContributor implements InfoContributor {

        @Override
        public void contribute(Info.Builder builder) {
            log.debug("Contributing portfolio application info");

            builder.withDetail("application", Map.of(
                    "name", "Portfolio Backend API",
                    "version", "1.0.0",
                    "author", "Debojit Chakraborty",
                    "description", "Backend API for portfolio management system",
                    "built-with", "Java 21 + Spring Boot 3.4.8",
                    "features", java.util.List.of(
                            "User Management",
                            "Experience Tracking",
                            "Project Showcase",
                            "Skills Matrix",
                            "Education Timeline",
                            "Contact Management"
                    )
            ));

            builder.withDetail("system", Map.of(
                    "java-version", System.getProperty("java.version"),
                    "os-name", System.getProperty("os.name"),
                    "os-version", System.getProperty("os.version"),
                    "start-time", LocalDateTime.now().toString(),
                    "spring-version", "6.4.8",
                    "spring-boot-version", "3.4.8"
            ));

            builder.withDetail("contact", Map.of(
                    "email", "devchakraborty9914@gmail.com",
                    "linkedin", "https://linkedin.com/in/debojit-chakraborty-5b309a132",
                    "location", "Dibrugarh, Assam, India"
            ));
        }
    }
}
