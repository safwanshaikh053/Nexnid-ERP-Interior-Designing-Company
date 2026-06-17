package com.nexnid.erp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.nexnid.erp.entity.Lead;
import com.nexnid.erp.service.LeadService;

@RestController
@RequestMapping("/leads")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    private final LeadService leadService;

    public LeadController(
            LeadService leadService
    ) {

        this.leadService = leadService;
    }

    /* CREATE LEAD */

    @PostMapping
    public Lead createLead(
            @RequestBody Lead lead
    ) {

        return leadService.createLead(lead);
    }

    /* GET ALL LEADS */

    @GetMapping
    public List<Lead> getAllLeads() {

        return leadService.getAllLeads();
    }

    /* DELETE LEAD */

    @DeleteMapping("/{id}")
    public void deleteLead(
            @PathVariable Long id
    ) {

        leadService.deleteLead(id);
    }

    /* UPDATE STATUS */
    
    @PutMapping("/{id}/status")

    public Lead updateStatus(

            @PathVariable Long id,

            @RequestBody Map<String, String> request
    ) {

        String status =
                request.get("status");

        String workStatus =
                request.get("workStatus");

        return leadService.updateStatus(

                id,

                status,

                workStatus
        );
    }
   
}