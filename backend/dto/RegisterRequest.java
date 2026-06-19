package com.nexnid.erp.dto;

import com.nexnid.erp.entity.Department;
import com.nexnid.erp.entity.Role;

public class RegisterRequest {

    private String name;
    private String email;
    private String password;

    private Department department;

    private Role role;

    private Long reportingManagerId;

    public RegisterRequest() {
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Department getDepartment() {
        return department;
    }

    public Role getRole() {
        return role;
    }

    public Long getReportingManagerId() {
        return reportingManagerId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setReportingManagerId(Long reportingManagerId) {
        this.reportingManagerId = reportingManagerId;
    }
}