package com.nexnid.erp.dto;

public class LoginResponse {

    private String token;

    private String role;

    private String department;

    private String name;

    public LoginResponse(
            String token,
            String role,
            String department,
            String name
    ) {

        this.token = token;

        this.role = role;

        this.department = department;

        this.name = name;
    }

    public String getToken() {

        return token;
    }

    public void setToken(String token) {

        this.token = token;
    }

    public String getRole() {

        return role;
    }

    public void setRole(String role) {

        this.role = role;
    }

    public String getDepartment() {

        return department;
    }

    public void setDepartment(String department) {

        this.department = department;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }
}