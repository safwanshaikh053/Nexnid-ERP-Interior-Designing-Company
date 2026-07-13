package com.nexnid.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexnid.erp.entity.Lead;

public interface LeadRepository
        extends JpaRepository<Lead, Long> {

}