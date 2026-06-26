package com.nexnid.erp.entity;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String contact;

    private String pincode;

    private String leadType;

    private String status;
    
    private String workStatus;
    
    private Boolean meetingScheduled = false;
    
    private LocalDateTime assignedDateTime;

    
    @Column(length = 1000)
    private String remarks;

    public Lead() {
    }

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    public String getContact() {

        return contact;
    }

    public void setContact(String contact) {

        this.contact = contact;
    }

    public String getPincode() {

        return pincode;
    }

    public void setPincode(String pincode) {

        this.pincode = pincode;
    }

    public String getLeadType() {

        return leadType;
    }

    public void setLeadType(String leadType) {

        this.leadType = leadType;
    }

    public String getStatus() {

        return status;
    }

    public void setStatus(String status) {

        this.status = status;
    }
    
    public LocalDateTime getAssignedDateTime() {

        return assignedDateTime;
    }

    public void setAssignedDateTime(
            LocalDateTime assignedDateTime
    ) {

        this.assignedDateTime =
                assignedDateTime;
    }

    public String getRemarks() {

        return remarks;
    }

    public void setRemarks(String remarks) {

        this.remarks = remarks;
    }
    
    public String getWorkStatus() {

        return workStatus;
    }

    public void setWorkStatus(
            String workStatus
    ) {

        this.workStatus = workStatus;
    }
    
    public Boolean getMeetingScheduled() {

        return meetingScheduled;
    }
    
    public void setMeetingScheduled(
            Boolean meetingScheduled
    ) {

        this.meetingScheduled =
                meetingScheduled;
    }
}