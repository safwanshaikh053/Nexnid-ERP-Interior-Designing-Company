package com.nexnid.erp.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nexnid.erp.dto.LoginRequest;
import com.nexnid.erp.dto.LoginResponse;
import com.nexnid.erp.dto.RegisterRequest;
import com.nexnid.erp.entity.User;
import com.nexnid.erp.jwt.JwtService;
import com.nexnid.erp.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthService(

            UserRepository userRepository,

            PasswordEncoder passwordEncoder,

            JwtService jwtService
    ) {

        this.userRepository = userRepository;

        this.passwordEncoder = passwordEncoder;

        this.jwtService = jwtService;
    }

    public String register(
            RegisterRequest request
    ) {

        if(userRepository.existsByEmail(
                request.getEmail()
        )) {

            return "Email already exists";
        }

        User reportingManager = null;

        if(request.getReportingManagerId() != null) {

            reportingManager = userRepository

                    .findById(
                            request.getReportingManagerId()
                    )

                    .orElse(null);
        }

        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(

                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setDepartment(
                request.getDepartment()
        );

        user.setRole(
                request.getRole()
        );

        user.setReportingManager(
                reportingManager
        );

        user.setActive(true);

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public LoginResponse login(
            LoginRequest request
    ) {

        User user = userRepository

                .findByEmail(
                        request.getEmail()
                )

                .orElse(null);

        if(user == null) {

            return new LoginResponse(

                    null,

                    "INVALID_EMAIL",

                    null,

                    null
            );
        }

        boolean matches = passwordEncoder.matches(

                request.getPassword(),

                user.getPassword()
        );

        if(!matches) {

            return new LoginResponse(

                    null,

                    "INVALID_PASSWORD",

                    null,

                    null
            );
        }

        String token = jwtService.generateToken(

                user.getEmail(),

                user.getRole().name()
        );

        return new LoginResponse(

                token,

                user.getRole().name(),

                user.getDepartment().name(),

                user.getName()
        );
    }
}