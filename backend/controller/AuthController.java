package com.nexnid.erp.controller;

import org.springframework.web.bind.annotation.*;

import com.nexnid.erp.dto.LoginRequest;
import com.nexnid.erp.dto.LoginResponse;
import com.nexnid.erp.dto.RegisterRequest;
import com.nexnid.erp.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {

        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(

            @RequestBody LoginRequest request
    ) {

        return authService.login(request);
    }
    
    @PostMapping("/register")
    public String register(

            @RequestBody RegisterRequest request
    ) {

        return authService.register(request);
    }
}