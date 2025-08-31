import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../../../Services/trainer.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Trainer } from 'src/app/Models/trainer';
import { MatDialog } from '@angular/material/dialog';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';
import { GridActionButtonsComponent } from '../grid-action-buttons/grid-action-buttons.component';

@Component({
  selector: 'app-view-trainer-list',
  templateUrl: './view-trainer-list.component.html',
  styleUrls: ['./view-trainer-list.component.css']
})
export class ViewTrainerListComponent implements OnInit {
  trainers: Trainer[] = [];
  context = { componentParent: this };

  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'trainer_name', sortable: true, filter: true },
    { headerName: 'Phone', field: 'trainer_phone', sortable: true, filter: true },
    { headerName: 'Email', field: 'trainer_email', sortable: true, filter: true },
    {
      headerName: 'Status',
      field: 'trainer_status',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return params.value === '1' ? 'Active' : 'Inactive';
      },
      cellClass: (params) => {
        return params.value === '1' ? 'text-success' : 'text-danger';
      }
    },
    {
      headerName: 'Actions',
      cellRenderer: GridActionButtonsComponent,
      width: 150
    }
  ];

  defaultColDef: ColDef = {
    resizable: true
  };

  constructor(
    private trainerService: TrainerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers(): void {
    this.trainerService.getTrainers().subscribe({
      next: (data: Trainer[]) => this.trainers = data,
      error: () => alert('Failed to load trainers')
    });
  }

  openAddTrainer(): void {
    const dialogRef = this.dialog.open(AddTrainerComponent, {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadTrainers();
      }
    });
  }

  editTrainer(id: number): void {
    const trainer = this.trainers.find(t => t.trainer_id === id);
    if (trainer) {
      const dialogRef = this.dialog.open(AddTrainerComponent, {
        width: '800px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        disableClose: true,
        data: { trainer }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updated') {
          this.loadTrainers();
        }
      });
    }
  }

  deleteTrainer(id: number): void {
    if (confirm('Are you sure you want to delete this trainer?')) {
      this.trainerService.deleteTrainer(id).subscribe({
        next: () => {
          alert('Trainer deleted');
          this.loadTrainers();
        },
        error: () => alert('Failed to delete trainer')
      });
    }
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }
}
