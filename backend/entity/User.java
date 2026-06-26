package com.nexnid.erp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Department department;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "reporting_manager_id")
    private User reportingManager;

    private boolean active = true;

    public User() {
    }

    public User(Long id,
                String name,
                String email,
                String password,
                Department department,
                Role role,
                User reportingManager,
                boolean active) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
        this.role = role;
        this.reportingManager = reportingManager;
        this.active = active;
    }

    public Long getId() {
        return id;
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

    public User getReportingManager() {
        return reportingManager;
    }

    public boolean isActive() {
        return active;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setReportingManager(User reportingManager) {
        this.reportingManager = reportingManager;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}