package com.nexnid.erp.service;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.nexnid.erp.entity.Lead;
import com.nexnid.erp.repository.LeadRepository;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(
            LeadRepository leadRepository
    ) {

        this.leadRepository = leadRepository;
    }

    /* CREATE LEAD */

    public Lead createLead(
            Lead lead
    ) {

        lead.setAssignedDateTime(
                LocalDateTime.now()
        );

        lead.setMeetingScheduled(false);

        return leadRepository.save(lead);
    }

    /* GET ALL LEADS */

    public List<Lead> getAllLeads() {

        return leadRepository.findAll();
    }

    /* DELETE LEAD */

    public void deleteLead(
            Long id
    ) {

        leadRepository.deleteById(id);
    }

    /* UPDATE STATUS */

    public Lead updateStatus(

            Long id,

            String status,

            String workStatus
    ) {

        Lead lead =
                leadRepository.findById(id)
                .orElseThrow();

        lead.setStatus(status);

        lead.setWorkStatus(workStatus);

        return leadRepository.save(lead);
    }

    /* SCHEDULE FIRST MEETING */

    public Lead scheduleMeeting(
            Long id
    ) {

        Lead lead =
                leadRepository.findById(id)
                .orElseThrow();

        lead.setMeetingScheduled(true);

        return leadRepository.save(lead);
    }
}