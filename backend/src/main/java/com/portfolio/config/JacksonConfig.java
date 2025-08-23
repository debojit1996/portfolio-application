package com.portfolio.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * Jackson JSON Configuration
 * Configures JSON serialization/deserialization
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Configuration
public class JacksonConfig {

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        log.info("Configuring Jackson ObjectMapper for JSON processing");

        ObjectMapper mapper = new ObjectMapper();

        // Handle Java 8 time types properly
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // Pretty print JSON in development
        mapper.enable(SerializationFeature.INDENT_OUTPUT);

        log.debug("Jackson ObjectMapper configured with JavaTimeModule");
        return mapper;
    }
}
