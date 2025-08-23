package com.portfolio.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC Configuration for Portfolio Application
 * Handles additional CORS, static resources, and view controllers
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${cors.allowed-origins:http://localhost:3000,http://localhost:5173}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        log.info("Adding additional CORS mappings for allowed origins: {}", (Object) allowedOrigins);

        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);

        log.debug("CORS mappings configured successfully");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("Configuring static resource handlers");

        // Serve static files (profile images, resumes, project images)
        registry.addResourceHandler("/files/**")
                .addResourceLocations("classpath:/static/files/")
                .setCachePeriod(3600);

        // Serve uploaded files (if any)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/")
                .setCachePeriod(3600);

        log.debug("Static resource handlers configured");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        log.info("Configuring view controllers for SPA routing");

        // Support for single page application routing
        registry.addViewController("/")
                .setViewName("forward:/index.html");

        // Health check endpoint view
        registry.addViewController("/health")
                .setViewName("forward:/actuator/health");

        log.debug("View controllers configured");
    }
}
