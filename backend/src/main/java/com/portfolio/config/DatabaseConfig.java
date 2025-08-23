package com.portfolio.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Database Configuration for Portfolio Application
 * Configures JPA repositories and transaction management
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Configuration
@EnableJpaRepositories(basePackages = "com.portfolio.repository")
@EntityScan(basePackages = "com.portfolio.entity")
@EnableTransactionManagement
public class DatabaseConfig {

    public DatabaseConfig() {
        log.info("Initializing Database Configuration");
        log.debug("JPA Repositories enabled for package: com.portfolio.repository");
        log.debug("Entity scan enabled for package: com.portfolio.entity");
        log.debug("Transaction management enabled");
    }
}
