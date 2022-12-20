import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  survey:any = null
  isDataAvailable = false
  constructor(private http: HttpClient) { }

  likes = [
    { name: "Students", selected: false },
    { name: "Location", selected: false },
    { name: "Dormrooms", selected: false },
    { name: "Sports", selected: false },
    { name: "Campus", selected: false },
    { name: "Atmosphere", selected: false },
  ]

  recommendations = [
    {name: "Very Likely" ,value: "verylikely"},
    {name: "Likely", value:"likely"},
    {name: "Unlikely", value:'unlikely'}
  ]
  ngOnInit(): void {
    this.fetchStudent()
  }
//Below function extracts id from the url and uses "http get" call to fetch information from the database of the corresponding id

  fetchStudent() {
    const query = window.location.search;
    const paramOfURL = new URLSearchParams(query);
    const id = paramOfURL.get('id')
    // const dburl = "http://ec2-3-90-1-112.compute-1.amazonaws.com/k8s/clusters/c-sbtks/api/v1/namespaces/default/services/http:backenddeployment:8080/proxy/SWE645_hw3/students/"
    const dburl = "http://localhost:8080/Survey" 
    let observble = this.http.get(dburl + id);    
    observble.subscribe((res) => this.loadStudent(res),
    (error) => {
      console.log('oops, error occurred.', console.log(error.status))
      if(error.status==404){
      alert("The Students data doesn't exist!!");
      }
    })
  }

//this function is used to load data from database
  loadStudent(studentData: any){
    if(studentData.liked !== null){
      let likeArray = studentData.liked.split(',')
      this.likes.forEach(individualLike => {
        if(likeArray.includes(individualLike.name)){
          individualLike.selected = true
        }
      });
    }

    this.survey = studentData
    this.isDataAvailable = true

    let arrayOfDate = studentData.dateOfSurvey.split('T')
    arrayOfDate[0]= arrayOfDate[0].replaceAll('-','/')
    studentData.dateOfSurvey= arrayOfDate[0]
  }
  return(){
    window.history.back();
  }

}
