import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent implements OnInit {
  likes = [
    { name: 'Students', selected: false },
    { name: 'Location', selected: false },
    { name: 'Campus', selected: false },
    { name: 'Atmosphere', selected: false },
    { name: 'Dorm rooms', selected: false },
    { name: 'Sports', selected: false },
  ];

  recommendations = [
    { name: 'Very Likely', value: 'verylikely' },
    { name: 'Likely', value: 'likely' },
    { name: 'Unlikely', value: 'unlikely' },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  submitSurvey(values: any) {
    var processedlike = this.likes
      .filter((opt) => opt.selected)
      .map((opt) => opt.name);

      
      var checkedUsers = '';

    this.likes.forEach(function(user) {
  
        if (user.selected) {
          if(checkedUsers != ''){
            checkedUsers += ",";
          }
          checkedUsers += user.name;
        }
      });   


		  
      
    //created an array list name body to store all the data.
    var body = {
      firstName: values.firstName,
      lastName: values.lastName,
      streetAddress: values.streetAddress,
      city: values.city,
      state: values.state,
      zip: values.zip,
      phone: values.phone,
      email: values.email,
      dateOfSurvey: new Date(values.dateOfSurvey),
      likelihood: values.interested,
      comment: values.comment,
      sourceOfUni: checkedUsers,
      liking:  values.recommend,
    };

    console.log(body);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'X-Api-Cattle-Auth': 'true',
    });
    //Content from the body array has been sent through the http post method
    let obs = this.http.post('http://localhost:8080/Survey', body, {
      headers: httpHeaders,
    });

    obs.subscribe(
      (response) => {
        this.pageReload();
      },
      (error) => {
        alert(error.status);
      }
    );
  }
  clearSurvey() {
    window.location.reload();
  }

  pageReload() {
    alert('The form has been successfully submitted!');
    this.router.navigate(['']);
  }

  
}
