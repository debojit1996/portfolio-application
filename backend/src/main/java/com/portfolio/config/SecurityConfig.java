package com.portfolio.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * Security Configuration for Portfolio Application
 * Uses Spring Boot 3.4.8 security features with Java 21
 * Updated for Spring Security 6.4.8 (non-deprecated methods)
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${cors.allowed-origins:http://localhost:3000,http://localhost:5173}")
    private String[] allowedOrigins;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("Configuring Spring Security with latest features");

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> {
                    log.debug("Configuring stateless session management");
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .authorizeHttpRequests(auth -> {
                    log.debug("Configuring authorization rules");
                    auth
                            // Public endpoints - no authentication required
                            .requestMatchers("/portfolio/**").permitAll()
                            .requestMatchers("/auth/login", "/auth/register", "/auth/check-email").permitAll()
                            .requestMatchers("/actuator/health", "/actuator/info").permitAll()

                            // Swagger/OpenAPI endpoints
                            .requestMatchers("/v3/api-docs", "/v3/api-docs/**").permitAll()
                            .requestMatchers("/swagger-ui.html", "/swagger-ui/**").permitAll()
                            .requestMatchers("/swagger-resources", "/swagger-resources/**").permitAll()
                            .requestMatchers("/webjars/**").permitAll()

                            // Static resources
                            .requestMatchers("/css/**", "/js/**", "/images/**", "/favicon.ico").permitAll()

                            // Admin endpoints - require authentication
                            .requestMatchers("/portfolio/contact/messages").hasRole("ADMIN")
                            .requestMatchers("/auth/profile/**").authenticated()

                            // Allow all other requests (for development)
                            .anyRequest().permitAll();
                })
                .headers(headers -> {
                    log.debug("Configuring security headers");
                    headers
                            // Updated for Spring Security 6.4.8 - non-deprecated methods
                            .frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
                            .contentTypeOptions(contentTypeConfig -> {})
                            .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                                    .maxAgeInSeconds(31536000)
                                    .includeSubDomains(true)
                            )
                            .referrerPolicy(referrerPolicyConfig ->
                                    referrerPolicyConfig.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                            );
                });

        log.info("Spring Security configuration completed successfully");
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        log.info("Configuring CORS with allowed origins: {}", Arrays.toString(allowedOrigins));

        CorsConfiguration configuration = new CorsConfiguration();

        // Allow specific origins (configurable via properties)
        configuration.setAllowedOriginPatterns(Arrays.asList(allowedOrigins));

        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "X-Requested-With",
                "Accept",
                "Origin",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers"
        ));

        configuration.setExposedHeaders(List.of(
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"
        ));

        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        log.debug("CORS configuration completed with max age: {} seconds", configuration.getMaxAge());
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        log.info("Configuring BCrypt password encoder with strength 12");
        return new BCryptPasswordEncoder(12);
    }
}
