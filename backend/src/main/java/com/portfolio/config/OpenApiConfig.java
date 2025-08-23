package com.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI/Swagger Configuration for Portfolio Application
 * Configures API documentation with Swagger UI
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Configuration
public class OpenApiConfig {

    @Value("${server.servlet.context-path:/api}")
    private String contextPath;

    @Value("${server.port:8080}")
    private String serverPort;

    // Use properties from application.yml
    @Value("${api.title:Portfolio Backend API}")
    private String apiTitle;

    @Value("${api.description:Backend API for portfolio management system}")
    private String apiDescription;

    @Value("${api.version:1.0.0}")
    private String apiVersion;

    @Value("${api.author:Debojit Chakraborty}")
    private String apiAuthor;

    @Bean
    public OpenAPI portfolioOpenAPI() {
        log.info("Configuring OpenAPI documentation");

        Server localServer = new Server()
                .url("http://localhost:" + serverPort + contextPath)
                .description("Local Development Server");

        Server productionServer = new Server()
                .url("https://api.debojit-portfolio.com" + contextPath)
                .description("Production Server");

        Contact contact = new Contact()
                .name(apiAuthor)
                .email("devchakraborty9914@gmail.com")
                .url("https://linkedin.com/in/debojit-chakraborty-5b309a132");

        License license = new License()
                .name("MIT License")
                .url("https://opensource.org/licenses/MIT");

        Info info = new Info()
                .title(apiTitle)
                .version(apiVersion)
                .description(apiDescription + """
                    
                    **Technical Stack:**
                    - Java 21 with Virtual Threads
                    - Spring Boot 3.4.8
                    - Spring Security 6.4.8
                    - MySQL 8.0
                    - Docker Ready
                    
                    **Features:**
                    - RESTful API design
                    - Comprehensive validation
                    - Global exception handling
                    - Structured logging
                    - Health monitoring
                    """)
                .contact(contact)
                .license(license);

        OpenAPI openAPI = new OpenAPI()
                .info(info)
                .servers(List.of(localServer, productionServer));

        log.debug("OpenAPI documentation configured successfully");
        return openAPI;
    }
}
