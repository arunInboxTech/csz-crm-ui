import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {



  trainerList: any = [];
  courseList: any = [];
  branchList: any = []
  trainingMode: any = [];
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    const trainerDataURL = '/assets/dummy-data/trainer.json';

    this.http.get(trainerDataURL).subscribe((dt) => {
      this.trainerList = dt;
    })

    const courseDataURL = '/assets/dummy-data/course.json';

    this.http.get(courseDataURL).subscribe((dt) => {
      this.courseList = dt;
    })

    const branchDataURL = '/assets/dummy-data/branch.json';

    this.http.get(branchDataURL).subscribe((dt) => {
      this.branchList = dt;
    })

    const trngMdeDataURL = '/assets/dummy-data/trainingMode.json';

    this.http.get(trngMdeDataURL).subscribe((dt) => {
      this.trainingMode = dt;
    })
  }


}
