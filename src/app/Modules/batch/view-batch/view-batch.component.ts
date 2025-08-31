import { Component, OnInit } from '@angular/core';
import { BatchService } from '../../../Services/batch.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Batch } from 'src/app/Models/batch';
import { MatDialog } from '@angular/material/dialog';
import { AddBatchComponent } from '../add-batch/add-batch.component';
import { GridActionButtonsComponent } from '../grid-action-buttons/grid-action-buttons.component';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css']
})
export class ViewBatchComponent implements OnInit {
  batches: Batch[] = [];
  context = { componentParent: this };

  columnDefs: ColDef[] = [
    { headerName: 'Batch Name', field: 'batch_name', sortable: true, filter: true, width: 180 },
    { headerName: 'Course', field: 'course_name', sortable: true, filter: true, width: 120 },
    { headerName: 'Start Date', field: 'start_date', sortable: true, filter: true, width: 150 },
    { headerName: 'End Date', field: 'batch_completed_date', sortable: true, filter: true, width: 150 },
    { headerName: 'Expected End Date', field: 'bat_tnr_share_paid', sortable: true, filter: true, width: 150 },
    { headerName: 'Status', field: 'whatsapp', sortable: true, filter: true, width: 100 },
    {
      headerName: 'Completed', field: 'is_batch_completed', sortable: true, filter: true, width: 100, 
      valueFormatter: (params) => {
        return params.value === 1 ? 'Yes' : 'No';
      }
    },
    {
      headerName: 'Actions',
      cellRenderer: GridActionButtonsComponent,
      width: 100
    }
  ];

  defaultColDef: ColDef = {
    resizable: true
  };

  constructor(
    private batchService: BatchService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches(): void {
    this.batchService.getBatches().subscribe({
      next: (data: Batch[]) => this.batches = data,
      error: () => alert('Failed to load batches')
    });
  }

  openAddBatch(): void {
    const dialogRef = this.dialog.open(AddBatchComponent, {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadBatches();
      }
    });
  }

  editBatch(id: number): void {
    const batch = this.batches.find(b => b.batch_id === id);
    if (batch) {
      const dialogRef = this.dialog.open(AddBatchComponent, {
        width: '800px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        disableClose: true,
        data: { batch }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updated') {
          this.loadBatches();
        }
      });
    }
  }

  deleteBatch(id: number): void {
    if (confirm('Are you sure you want to delete this batch?')) {
      this.batchService.deleteBatch(id).subscribe({
        next: () => {
          alert('Batch deleted');
          this.loadBatches();
        },
        error: () => alert('Failed to delete batch')
      });
    }
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }
}
