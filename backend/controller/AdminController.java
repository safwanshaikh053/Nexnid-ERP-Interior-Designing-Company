package com.nexnid.erp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.nexnid.erp.dto.RegisterRequest;
import com.nexnid.erp.entity.User;
import com.nexnid.erp.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/create-user")
    public String createUser(
            @RequestBody RegisterRequest request
    ) {

        return adminService.createUser(request);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {

        return adminService.getAllUsers();
    }
}