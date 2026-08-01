package com.nexnid.erp.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nexnid.erp.dto.RegisterRequest;
import com.nexnid.erp.entity.User;
import com.nexnid.erp.repository.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AdminService(UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String createUser(RegisterRequest request) {

        if(userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User reportingManager = null;

        if(request.getReportingManagerId() != null) {

            reportingManager = userRepository
                    .findById(request.getReportingManagerId())
                    .orElse(null);
        }

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setDepartment(request.getDepartment());

        user.setRole(request.getRole());

        user.setReportingManager(reportingManager);

        user.setActive(true);

        userRepository.save(user);

        return "User Created Successfully";
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
}