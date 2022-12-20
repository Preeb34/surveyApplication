package com.backend.hw3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.hw3.model.Survey;

@Repository
public interface SurveyRepo extends JpaRepository<Survey, Long>{
    
}
