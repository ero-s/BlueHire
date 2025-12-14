package com.appdevf2.bluehire.config; 

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS Configuration for the Spring Boot Application.
 * Allows the React frontend running on port 5173 to access the API on port 8080.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS configuration to all API paths
                // Explicitly allow both development origins (frontend and backend port for safety)
                .allowedOrigins("http://localhost:5173", "http://localhost:8080")
                // Allow the standard REST methods plus OPTIONS for preflight requests
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(false) // Set to true if cookies/sessions were required
                .maxAge(3600); // Cache the preflight response for 1 hour
    }
}