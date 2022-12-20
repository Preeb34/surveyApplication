import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-all-surveys',
  templateUrl: './list-all-surveys.component.html',
  styleUrls: ['./list-all-surveys.component.css']
})
export class ListAllSurveysComponent implements OnInit {

  nameStudents:any = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  } 
//below function is used to fetch all the data from the database
  getData() {
    let obs = this.http.get("http://localhost:8080/Survey");
    obs.subscribe((response) => this.viewData(response))
  }

//Below function is used to fetch all the names from the database
  viewData(students:any) {
    try {
      this.nameStudents= students;
      // for(var i=0;i<students.length;i++){
      //   // let obj = {id: "", name: "",city: ""};
      //   // obj.id=students[i].id;
      //   // obj.name=students[i].firstName;
      //   // obj.city = students[i].city;
      //   // this.nameStudents[i]= students[i];
      // }
    } catch (error) {
      console.log(error)
    }
  }

}
