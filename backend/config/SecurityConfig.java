package com.nexnid.erp.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(

                List.of("http://localhost:3000")
        );

        configuration.setAllowedMethods(

                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE"
                )
        );

        configuration.setAllowedHeaders(

                List.of("*")
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(

                "/**",

                configuration
        );

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(

            HttpSecurity http

    ) throws Exception {

        http

            .cors(cors -> {})

            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                    .requestMatchers(

                            "/auth/**",
                            "/leads/**"

                    ).permitAll()

                    .anyRequest()

                    .authenticated()
            )

            .sessionManagement(session ->

                    session.sessionCreationPolicy(

                            SessionCreationPolicy.STATELESS
                    )
            );

        return http.build();
    }
}