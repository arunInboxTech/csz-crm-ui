import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';


@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css']
})
export class BatchDetailsComponent {
  // Row Data: The data to be displayed.
  rowData = [
    { batchName: "P62024201", branch: "Velachery", trainingMode: 'Online', course: 'Primavera', trainer: 'Karthik', startDate: '03-04-2023', endDate: '03-07-2023', batchStatus: 'Yet to Start',action:'View' },
    { batchName: "FSD2024202", branch: "OMR", trainingMode: 'Classroom', course: 'Angular', trainer: 'Arun', startDate: '03-04-2023', endDate: '03-07-2023', batchStatus: 'In-progress',action:'View' },
    { batchName: "ANG202403", branch: "Velachery", trainingMode: 'Hybrid', course: 'Full Stack', trainer: 'Karthik', startDate: '03-04-2023', endDate: '03-07-2023', batchStatus: 'In-progress',action:'View' },
  ];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    { field: "batchName" },
    { field: "branch" },
    { field: "trainingMode" },
    { field: "course" },
    { field: "trainer" },
    { field: "startDate" },
    { field: "endDate" },
    { field: "batchStatus" },
    {
      fied: 'action', cellRenderer: (params: ICellRendererParams) => {
        console.log(params.data)
        return `<button (click)="asd('hi)">${params.data.action}</button>`;
      }
    }
  ];


  redirectBatch(){
    console.log('clicked')
  }
  asd(){
    console.log('clicked')
  }

}
