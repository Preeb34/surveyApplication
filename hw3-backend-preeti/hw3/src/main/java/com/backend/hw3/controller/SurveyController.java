package com.backend.hw3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.hw3.model.Survey;
import com.backend.hw3.repository.SurveyRepo;

@RestController
public class SurveyController {
    @Autowired
    public SurveyRepo surveyRepo;


    @GetMapping("/Survey")
    @CrossOrigin
    private List<Survey> getAllSurveys(){

        return surveyRepo.findAll();
    }

    @PostMapping("/Survey")
    @CrossOrigin
    private String saveSurvey(@RequestBody Survey survey){
        System.out.println(" This is from the survey");
        System.out.println(" Name :" + survey.getLikelihood() );
        surveyRepo.save(survey);
        System.out.println(" Name 1 :" + survey.getFirstName() );
        return "Success";
        
    }
    
    
}
